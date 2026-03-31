# Deployment Guide

## Local Development

```bash
npm install --legacy-peer-deps
npm run prisma:migrate
npm run seed
npm run dev
```

Open http://localhost:3000

---

## Production Deployment

### Option 1: Vercel (Recommended for Next.js)

**Easiest option - free tier available**

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project" → select repository
4. Configure:
   - Framework: Next.js
   - Root Directory: `churn-detective` (if in subdirectory)
5. Environment Variables:
   ```
   DATABASE_URL=file:./prod.db
   NEXTAUTH_SECRET=<generate random string>
   ```
6. Deploy!

**Vercel handles**:
- Auto-scaling
- HTTPS + CDN
- Environment management
- Git integration (auto-deploy on push)

**Limitations**:
- SQLite works but not ideal for high concurrency
- For production, upgrade to PostgreSQL

---

### Option 2: Railway

**Good for full-stack apps with databases**

1. Sign up at [railway.app](https://railway.app)
2. Create new project
3. Add "Postgres database"
4. Connect GitHub → add repository
5. Environment variables auto-linked
6. Deploy

**Benefits**:
- PostgreSQL included
- Clean dashboard
- Good free tier
- Easy auto-deploy

**Setup PostgreSQL**:
```bash
npm install pg
```

Update `.env`:
```
DATABASE_URL=postgresql://user:pass@host:port/db
```

---

### Option 3: Docker (Self-Hosted)

**For full control - deploy to any server**

Create `Dockerfile`:
```dockerfile
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy source
COPY . .

# Build
RUN npm run build

# Create database
RUN npm run prisma:migrate

# Expose port
EXPOSE 3000

# Start
CMD ["npm", "start"]
```

**Build & run**:
```bash
docker build -t churn-detective .
docker run -p 3000:3000 -e DATABASE_URL=... churn-detective
```

**Deployment platforms**:
- AWS ECS
- Google Cloud Run
- DigitalOcean App Platform
- Your own VPS

---

### Option 4: AWS Lambda (Serverless)

**Cost-effective for low traffic**

Requires additional setup with:
- API Gateway (HTTP routes)
- RDS (PostgreSQL)
- Lambda (compute)

Complexity: High

---

## Database Options for Production

| Database | Pros | Cons |
|----------|------|------|
| SQLite | File-based, free, local | Not for concurrent loads |
| PostgreSQL | Production-ready, scalable | Need server |
| MongoDB | Flexible schema, scalable | NoSQL - needs schema rethink |
| DuckDB | Analytical queries | Less proven for production |

**Recommendation**: PostgreSQL for production

---

## Switching to PostgreSQL

1. Install PostgreSQL adapter:
```bash
npm install pg
```

2. Update `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

3. Create connection string:
```
DATABASE_URL="postgresql://user:password@localhost:5432/churn_detective"
```

4. Migrate:
```bash
npm run prisma:migrate
npm run seed
```

---

## Security Checklist

Before going live:

- [ ] Change `NEXTAUTH_SECRET` to random 32+ char string
- [ ] Set `NODE_ENV=production` in server
- [ ] Enable HTTPS (all platforms do this)
- [ ] Use strong database passwords
- [ ] Enable environment variable encryption
- [ ] Set up database backups
- [ ] Add rate limiting to APIs (if public)
- [ ] Monitor error logs (Sentry, DataDog)
- [ ] Review CORS and CSRF protection
- [ ] Regular security updates (`npm audit`)

---

## Performance Optimization

### 1. Database Indexing

Already added in `schema.prisma`:
- `userId` index on Customer table
- `riskScore` index for fast filtering

### 2. API Response Caching

Add to API routes:
```typescript
response.headers.set('Cache-Control', 'public, max-age=60');
```

### 3. Bundle Size

Check production build:
```bash
npm run build
# Check .next/static/chunks/
```

Timeline should be < 500KB (gzipped)

### 4. Database Connection Pooling

For PostgreSQL, use PgBouncer:
```
postgresql://user:pass@pgbouncer:6432/db?pgbouncer=true
```

---

## Monitoring

### Application Logs

Platforms like Vercel/Railway show logs automatically.

### Error Tracking

Add Sentry:
```bash
npm install @sentry/nextjs
```

### Performance Metrics

Use built-in Next.js Web Vitals:
```typescript
// pages/_app.js
import { reportWebVitals } from 'next/web-vitals'

reportWebVitals(console.log)
```

### Database Monitoring

PostgreSQL tools:
- pgAdmin (GUI)
- DataGrip (IDE)
- pg_stat_statements (built-in)

---

## Scaling Considerations

### Phase 1: MVP (< 1K customers)
- Vercel + SQLite
- Works fine
- Cost: Free to ~$20/month

### Phase 2: Growth (1K-50K customers)
- Railway + PostgreSQL
- Auto-scaling
- Cost: ~$50-100/month

### Phase 3: Scale (50K+ customers)
- AWS/GCP + managed PostgreSQL
- Read replicas
- CDN
- Cost: $500+/month

### Phase 4: Enterprise
- Kubernetes
- Data warehouse (BigQuery, Redshift)
- Load balancers
- Custom infrastructure

---

## Backup Strategy

### Auto-Backups

**Railway**: Automatic daily backups

**Vercel**: No database backups (use external service)

### Manual Backups

PostgreSQL:
```bash
pg_dump -h host -U user -d dbname > backup.sql
```

Restore:
```bash
psql -h host -U user -d dbname < backup.sql
```

### Third-Party Backups

- PgBackups (PostgreSQL)
- Backblaze (file storage)
- AWS Backup

---

## Zero-Downtime Deployments

Modern platforms (Vercel, Railway) handle this automatically:
1. New version deployed to staging
2. Health checks run
3. If OK, traffic gradually shifted to new version
4. Old version kept as fallback

---

## Cost Estimates

### Vercel
- Free tier: 1 serverless function
- Pro: $20/month + usage
- Production app: ~$20-50/month

### Railway
- Starter: Free ($5/month free credit)
- Pay-as-you-go after
- Production app: ~$50-100/month

### AWS
- Flexible pricing
- Lambda: $0.20 per 1M requests
- RDS: ~$12-25/month
- Total: ~$50+/month

### DigitalOcean
- App platform: $12+/month
- Database: $25+/month
- Total: ~$37+/month

---

## Final Deployment Steps

1. **Update environment**:
   ```bash
   NODE_ENV=production
   ```

2. **Test build locally**:
   ```bash
   npm run build
   npm start
   ```

3. **Commit & push**:
   ```bash
   git add .
   git commit -m "Deploy to production"
   git push origin main
   ```

4. **Verify on platform**: Check deployment logs

5. **Test live site**: Visit your domain

6. **Monitor**: Watch logs for errors

---

## Rollback Plan

If something breaks:

1. **Immediate**: Revert to previous git commit
2. **Platform-specific**:
   - **Vercel**: Click "Rollback" button
   - **Railway**: Select previous deployment
3. **Database**: Use backup if needed

---

**You're ready to deploy!** 🚀

Start with Vercel for simplicity, migrate to Railway/AWS as you grow.
