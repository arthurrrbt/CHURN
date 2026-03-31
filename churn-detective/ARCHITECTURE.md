# Architecture & Code Overview

## Project Structure

```
churn-detective/
├── app/                           # Next.js App Router
│   ├── api/                       # API routes
│   │   ├── auth/
│   │   │   └── login/route.ts     # POST /api/auth/login - User login
│   │   └── customers/
│   │       ├── route.ts           # GET /api/customers - Fetch customers
│   │       ├── upload/route.ts    # POST /api/customers/upload - CSV upload
│   │       └── recalculate/route.ts # POST /api/customers/recalculate - Recalc risks
│   ├── dashboard/
│   │   └── page.tsx               # Main dashboard page
│   ├── globals.css                # Global Tailwind CSS
│   ├── layout.tsx                 # Root layout
│   └── page.tsx                   # Login page
│
├── components/                    # React components
│   ├── CSVUpload.tsx              # File upload component
│   └── CustomerTable.tsx          # Risk table display
│
├── lib/                           # Business logic
│   ├── prisma.ts                  # Prisma client singleton
│   └── churnCalculator.ts         # Core risk calculation
│
├── prisma/
│   ├── schema.prisma              # Database schema
│   ├── dev.db                     # SQLite database (generated)
│   ├── migrations/                # Database migrations
│   └── seed.js                    # Sample data seeder
│
└── public/                        # Static assets (if needed)
```

## Data Flow

### 1. Login Flow
```
User → Login Page → /api/auth/login → Create/Get User → Dashboard
```

### 2. CSV Upload Flow
```
User → SelectFile → /api/customers/upload → Parse CSV → Calculate Risk → Store in DB → Fetch & Display
```

### 3. Display Flow
```
Dashboard → Fetch /api/customers → Parse JSON fields → render CustomerTable
```

### 4. Recalculate Flow
```
User clicks Recalculate → /api/customers/recalculate → Recalc all risks → Update DB → Refetch
```

## Key Files Explained

### `lib/churnCalculator.ts`

Core business logic. The `calculateChurnRisk()` function:
- Takes customer data (login dates, payment status)
- Applies scoring rules
- Returns: `{ score, level, reasons, actions }`

**Why it's separate**: Easy to test, extend, and reuse in APIs, CLI tools, etc.

Example:
```typescript
const result = calculateChurnRisk({
  lastLoginDate: new Date("2025-03-15"),
  loginsLast7Days: 2,
  loginsLast30Days: 15,
  lastPaymentDate: new Date("2025-03-20"),
  paymentStatus: "paid"
});
// Returns: { score: 45, level: "Medium", reasons: [...], actions: [...] }
```

### `components/CSVUpload.tsx`

Handles file selection and upload:
- File validation
- Sends to `/api/customers/upload`
- Shows success/error feedback
- Triggers parent refresh

### `components/CustomerTable.tsx`

Displays customer risk data:
- Sorts by risk score (highest first)
- Color-codes risk levels
- Shows reasons and actions
- Filter by risk level

### `app/api/customers/upload/route.ts`

Processes CSV uploads:
1. Validates file format
2. Extracts user from email
3. Parses CSV rows
4. Calls `calculateChurnRisk()` for each customer
5. Stores in database
6. Returns count of imported customers

### `prisma/schema.prisma`

Two main models:

**User**
- Email (unique identifier)
- Relation to customers

**Customer**
- Email, login/payment data (input)
- riskScore, riskLevel (calculated)
- riskReasons, suggestedActions (JSON stored as string)
- Timestamps for audit

## Authentication (MVP)

Currently uses **simple email login** (no password required for demo).

For production, consider:
- Magic links (email token)
- OAuth (GitHub, Google)
- Traditional auth (NextAuth.js)

The `User` model is ready to extend with password hashing, etc.

## Database

Uses **SQLite** via **Prisma ORM**:
- Single file (`dev.db`)
- Perfect for MVP / small scale
- Easy to migrate to PostgreSQL later

Commands:
```bash
npm run prisma:generate  # Generate TypeScript client
npm run prisma:migrate   # Apply schema changes
npm run seed            # Populate sample data
```

## Styling

**Tailwind CSS** with custom utility classes:
- `.btn-primary`, `.btn-secondary`, `.btn-danger` - Button styles
- `.badge-low`, `.badge-medium`, `.badge-high` - Risk level badges
- `.card` - Reusable card container

Available in `app/globals.css`

## API Conventions

All APIs follow REST principles:

| Endpoint | Method | Purpose | Auth |
|----------|--------|---------|------|
| `/api/auth/login` | POST | Create/get user | ❌ |
| `/api/customers` | GET | List customers | `userEmail` query |
| `/api/customers/upload` | POST | Import CSV | Form data |
| `/api/customers/recalculate` | POST | Recompute risks | JSON body |

Request/Response format:
```typescript
// Request
{ userEmail: "user@example.com", riskLevel?: "High" | "Medium" | "Low" }

// Response
{ success: boolean, message?: string, data?: any, error?: string }
```

## Error Handling

Try-catch blocks in all API routes with user-friendly error messages:
```typescript
try {
  // operation
  return NextResponse.json({ success: true, data });
} catch (error) {
  console.error(error);
  return NextResponse.json({ error: "Friendly message" }, { status: 500 });
}
```

## Performance Considerations

- **CSV uploads**: Processes rows sequentially (can be parallelized for large files)
- **Database queries**: Indexes on `userId` and `riskScore` for fast filtering
- **Risk calculation**: O(1) per customer (simple rules, no ML)

For 10K+ customers, consider:
- Batch processing with queues
- Caching calculated scores
- Read replicas for analytics

## Testing

Currently no tests. To add:

```bash
npm install --save-dev jest @testing-library/react
```

Test files:
- `__tests__/lib/churnCalculator.test.ts` - Rule validation
- `__tests__/components/CustomerTable.test.tsx` - UI rendering
- `__tests__/api/customers.test.ts` - API endpoints

## Deployment

Build for production:
```bash
npm run build
npm start
```

Runs on port 3000 by default.

### Environment Variables

Set in production:
- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_SECRET` - Random key for tokens
- `STRIPE_SECRET_KEY` - If adding Stripe integration

### Hosting Options

- **Vercel** (Next.js native) - Free tier available
- **Railway** - PostgreSQL + Node.js in one platform
- **Docker** - Self-hosted with DuckDB or PostgreSQL
- **AWS** - Lambda + RDS + API Gateway

## Next Steps (Future)

1. **Authentication**: Migrate to magic links or OAuth
2. **Stripe Integration**: Import real subscription data
3. **Email Alerts**: Notify admins of high-risk customers
4. **Webhooks**: Real-time updates from payment providers
5. **Advanced Analytics**: Trends, predictions, cohort analysis
6. **API Keys**: Allow programmatic access
7. **Multi-tenancy**: Support multiple companies with SaaS pricing

---

## Dev Tips

- **Debug database**: `npx prisma studio`
- **Check types**: `npx tsc --noEmit`
- **Format code**: Code formatter (IDE plugin recommended)
- **Monitor dev server**: Check terminal for build errors

## Questions?

See [README.md](./README.md) for more info, or [CHURN_RULES.md](./CHURN_RULES.md) for scoring details.
