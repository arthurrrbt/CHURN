# Churn Detective MVP

A simple, actionable churn risk detector for early-stage SaaS founders. Help customers identify which users are at risk of churning and why.

**Status**: ✅ MVP Complete & Live

## 🎯 Product Goal

Help SaaS founders answer 3 questions instantly:
1. **Which customers are at risk of churning?**
2. **Why?**
3. **What should I do about it?**

## ✨ Features

- **Simple Authentication**: Email-based login (demo auth for MVP)
- **CSV Data Import**: Upload customer data in seconds
- **Risk Scoring**: Rule-based churn risk calculation (0-100)
- **Risk Levels**: Color-coded (Low/Medium/High)
- **Reasons & Actions**: Human-readable insight and suggested next steps
- **Filtering**: Filter customers by risk level
- **Recalculation**: Recalculate risks based on latest rules

## 🚀 Quick Start (5 minutes)

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
npm install --legacy-peer-deps
```

### Setup Database

```bash
# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Seed with sample data (optional)
npm run seed
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Demo Account

After seeding, use:
- **Email**: `demo@example.com`
- **Password**: (just click "Sign In" - no password required for demo)

## 📋 CSV Format

Upload a CSV file with the following columns:

```
customer_id,email,last_login_date,number_of_logins_last_7_days,number_of_logins_last_30_days,last_payment_date,payment_status
1,customer1@example.com,2025-03-25,5,20,2025-03-20,paid
2,customer2@example.com,2025-03-10,0,3,2025-03-05,failed
3,customer3@example.com,,0,0,,pending
```

**Date format**: `YYYY-MM-DD`  
**Payment status**: `paid`, `failed`, `canceled`, or `pending`

See [CHURN_RULES.md](#documentation) for full details.

## 📊 Churn Risk Rules

The risk scoring is based on these rules:

1. **No login in last 7 days**: +30 risk
2. **Login drop >50% (7d vs 30d)**: +25 risk
3. **Login drop >75% (7d vs 30d)**: +20 risk
4. **Failed payment**: +40 risk
5. **No activity at all**: +50 risk
6. **Extended inactivity (14+ days)**: +15 risk
7. **Critical inactivity (30+ days)**: +20 risk

**Risk Levels**:
- Low: 0-34
- Medium: 35-59
- High: 60-100

## 🏗️ Tech Stack

- **Frontend**: Next.js 16 (React 19, TypeScript)
- **Backend**: Next.js API Routes
- **Database**: SQLite (Prisma ORM)
- **Styling**: Tailwind CSS
- **UI Icons**: Lucide React

## 📁 Project Structure

```
churn-detective/
├── app/                           # Next.js App Router
│   ├── api/
│   │   ├── auth/login/route.ts    # Login endpoint
│   │   └── customers/
│   │       ├── route.ts           # Get customers
│   │       ├── upload/route.ts    # CSV upload
│   │       └── recalculate/route.ts # Recalculate risks
│   ├── dashboard/
│   │   └── page.tsx               # Main dashboard
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                   # Login page
├── components/
│   ├── CSVUpload.tsx              # Upload component
│   └── CustomerTable.tsx          # Risk table
├── lib/
│   ├── prisma.ts                  # Prisma client
│   └── churnCalculator.ts         # Risk logic
├── prisma/
│   ├── schema.prisma              # Database schema
│   └── seed.js                    # Sample data
```

## 📚 Documentation

| File | Purpose |
|------|---------|
| [QUICKSTART.md](./QUICKSTART.md) | 5-minute setup guide |
| [CHURN_RULES.md](./CHURN_RULES.md) | Scoring rules & examples |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | Code overview & design |
| [TESTING.md](./TESTING.md) | How to manually test |
| [INTEGRATIONS.md](./INTEGRATIONS.md) | Future integrations |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | Production deployment |
| [STRATEGY.md](./STRATEGY.md) | Product strategy & GTM |

## 🛠️ Development Commands

```bash
npm run dev              # Start dev server
npm run build            # Build for production
npm start                # Run production server
npm run prisma:generate  # Generate Prisma client
npm run prisma:migrate   # Apply database migrations
npm run seed            # Populate sample data
npm run lint            # Check code quality
```

## 🧪 Testing

See [TESTING.md](./TESTING.md) for manual test workflows.

**Key tests**:
1. Login with demo account
2. View sample customers
3. Filter by risk level
4. Upload custom CSV
5. Verify risk scores
6. Logout and login

## 🚀 Build for Production

```bash
npm run build
npm start
```

Open [http://localhost:3000](http://localhost:3000)

## 📊 Success Metrics

- ✅ Login working
- ✅ Sample data displays
- ✅ Risk scoring accurate
- ✅ CSV upload works
- ✅ Filtering functional
- ✅ Recalculation responsive

## 🔮 Future Enhancements

Phase 2 (1-2 weeks):
- [ ] Stripe integration
- [ ] Email notifications
- [ ] Webhook support

Phase 3 (1-2 months):
- [ ] Real authentication (magic links, OAuth)
- [ ] Advanced analytics
- [ ] API for developers

Phase 4 (3+ months):
- [ ] Multi-tenancy
- [ ] ML predictions
- [ ] White-labeling

See [INTEGRATIONS.md](./INTEGRATIONS.md) for details.

## 🎯 Philosophy

> Prefer SIMPLE over SMART.
> This is a scrappy MVP, not a scale system.

- Clear, understandable rules
- Deterministic scoring
- Easy to tweak and extend
- Focus on speed and clarity

## 📝 License

MIT

## 🙋 Support

- **Documentation**: See files above
- **Quick Help**: Check [QUICKSTART.md](./QUICKSTART.md)
- **Troubleshooting**: See [TESTING.md](./TESTING.md)
- **Code Review**: See [ARCHITECTURE.md](./ARCHITECTURE.md)

---

**Ready to run?** Start with [QUICKSTART.md](./QUICKSTART.md) 🚀
