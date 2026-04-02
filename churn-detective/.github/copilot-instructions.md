Churn Detective - Senior SaaS MVP

## Quick Start

### 1. Install & Setup (5 min)
```bash
npm install --legacy-peer-deps
npm run prisma:generate
npm run prisma:migrate
npm run seed
```

### 2. Run Dev Server
```bash
npm run dev
```

Open http://localhost:3000

### 3. Login & Explore
- Email: `demo@example.com`
- Click "Sign In" (no password)
- See 7 sample customers with churn risks

## Key Features

✅ **Rule-based churn scoring** (0-100)
✅ **CSV data import** with automatic risk calculation
✅ **Color-coded dashboard** (Green/Orange/Red risk levels)
✅ **Actionable insights** for each customer
✅ **Filter by risk** (High/Medium/Low)
✅ **Recalculate risks** on demand

## Scoring Rules

- No login in 7 days: +30
- Usage decline >50%: +25
- Failed payment: +40
- No activity: +50
- (See CHURN_RULES.md for full details)

## Project Structure

```
app/api/          # API routes
app/dashboard/    # Main UI
components/       # CSV Upload, Customer Table
lib/             # churnCalculator.ts (core logic)
prisma/          # Database schema & seed
```

## Important Files

- [CHURN_RULES.md](../CHURN_RULES.md) - Scoring rules & CSV format
- [QUICKSTART.md](../QUICKSTART.md) - Setup guide
- [ARCHITECTURE.md](../ARCHITECTURE.md) - Code overview
- [TESTING.md](../TESTING.md) - How to test
- [INTEGRATIONS.md](../INTEGRATIONS.md) - Future features

## Testing

See [TESTING.md](../TESTING.md) for manual test workflow.

## Tech Stack

- **Framework**: Next.js 16 (React 19, TypeScript)
- **Database**: SQLite (Prisma ORM)
- **Styling**: Tailwind CSS
- **UI**: Lucide React icons

## Development Commands

```bash
npm run dev              # Start dev server
npm run build            # Build for production
npm start                # Run production server
npm run prisma:generate  # Generate Prisma client
npm run prisma:migrate   # Apply database migrations
npm run seed            # Populate sample data
npm run lint            # Check code quality
```

## Environment Variables

Copy `.env.example` to `.env` (or `.env.local`):

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-key"
```

## Database

SQLite database at `prisma/dev.db` (auto-created)

### Reset Database
```bash
rm prisma/dev.db
npm run prisma:migrate
npm run seed
```

## MVP Philosophy

✨ **SIMPLE > SMART**
- Clear, understandable rules
- No ML or complex algorithms
- Focus on speed and clarity
- Easy to extend and modify

## Next Steps

1. ✅ Login workflow
2. ✅ CSV upload
3. ✅ Risk scoring
4. ✅ Dashboard display
5. 🔜 Stripe integration (Phase 2)
6. 🔜 Email notifications (Phase 2)
7. 🔜 OAuth login (Phase 3)

## Support

- **Docs**: See README.md, ARCHITECTURE.md, CHURN_RULES.md
- **Issues**: Check TESTING.md troubleshooting section
- **Database**: `npx prisma studio` for admin UI

---

**Ready to use!** 🚀

See [QUICKSTART.md](../QUICKSTART.md) for detailed walkthrough.
