# Project Index - Churn Detective MVP

## 📖 Quick Navigation

### For First-Time Users
1. Start here: [QUICKSTART.md](./QUICKSTART.md) (5 min read)
2. Then read: [README.md](./README.md) (overview)
3. Finally: [DELIVERABLES.md](./DELIVERABLES.md) (what you got)

### For Developers
1. Code overview: [ARCHITECTURE.md](./ARCHITECTURE.md)
2. Scoring rules: [CHURN_RULES.md](./CHURN_RULES.md)
3. Testing: [TESTING.md](./TESTING.md)
4. Future work: [INTEGRATIONS.md](./INTEGRATIONS.md)

### For Product Managers
1. Strategy: [STRATEGY.md](./STRATEGY.md)
2. Rules: [CHURN_RULES.md](./CHURN_RULES.md)
3. Go-to-market: [STRATEGY.md](./STRATEGY.md)
4. Product roadmap: [INTEGRATIONS.md](./INTEGRATIONS.md)

### For DevOps / Deployment
1. Deploy guide: [DEPLOYMENT.md](./DEPLOYMENT.md)
2. Setup: [QUICKSTART.md](./QUICKSTART.md)
3. Production checklist: [DEPLOYMENT.md](./DEPLOYMENT.md)

---

## 📚 Complete File Reference

### **Setup & Getting Started**

| File | Purpose | Read Time |
|------|---------|-----------|
| [QUICKSTART.md](./QUICKSTART.md) | 5-minute setup guide | 5 min |
| [README.md](./README.md) | Project overview | 10 min |
| [DELIVERABLES.md](./DELIVERABLES.md) | What's included | 5 min |

### **Understanding the Product**

| File | Purpose | Read Time |
|------|---------|-----------|
| [CHURN_RULES.md](./CHURN_RULES.md) | Scoring rules & CSV format | 15 min |
| [STRATEGY.md](./STRATEGY.md) | Use cases & go-to-market | 20 min |

### **Technical Documentation**

| File | Purpose | Read Time |
|------|---------|-----------|
| [ARCHITECTURE.md](./ARCHITECTURE.md) | Code structure & design | 20 min |
| [TESTING.md](./TESTING.md) | How to test the app | 10 min |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | Production deployment | 15 min |
| [INTEGRATIONS.md](./INTEGRATIONS.md) | Future features roadmap | 20 min |

### **Configuration**

| File | Purpose |
|------|---------|
| `.env.local` | Local environment variables (database, auth) |
| `.env` | Production environment variables |
| `.env.example` | Example environment template |
| `.gitignore` | Git ignore rules |

### **Project Configuration**

| File | Purpose |
|------|---------|
| `package.json` | Dependencies & scripts |
| `tsconfig.json` | TypeScript compiler options |
| `next.config.js` | Next.js configuration |
| `tailwind.config.ts` | Tailwind CSS theme |
| `postcss.config.js` | PostCSS configuration |
| `.eslintrc.json` | ESLint rules |

### **Database & Seed**

| File | Purpose |
|------|---------|
| `prisma/schema.prisma` | Database schema (User, Customer models) |
| `prisma/seed.js` | Sample data seeder |
| `prisma/migrations/` | Database migration history |

### **Sample Data**

| File | Purpose |
|------|---------|
| `sample-customers.csv` | Example CSV for testing |

### **Source Code**

#### Application Routes

| File | Purpose |
|------|---------|
| `app/page.tsx` | Login page |
| `app/dashboard/page.tsx` | Main dashboard page |
| `app/layout.tsx` | Root layout |
| `app/globals.css` | Global styles |

#### API Routes

| File | Purpose |
|------|---------|
| `app/api/auth/login/route.ts` | POST /api/auth/login |
| `app/api/customers/route.ts` | GET /api/customers |
| `app/api/customers/upload/route.ts` | POST /api/customers/upload |
| `app/api/customers/recalculate/route.ts` | POST /api/customers/recalculate |

#### Components

| File | Purpose |
|------|---------|
| `components/CSVUpload.tsx` | CSV file upload UI |
| `components/CustomerTable.tsx` | Customer risk table display |

#### Libraries

| File | Purpose |
|------|---------|
| `lib/prisma.ts` | Prisma client singleton |
| `lib/churnCalculator.ts` | Core churn risk calculation |

#### Configuration Files

| File | Purpose |
|------|---------|
| `.vscode/tasks.json` | VS Code tasks |
| `.vscode/launch.json` | VS Code debug config |
| `.github/copilot-instructions.md` | Developer notes for Copilot |

---

## 🚀 Workflow by Role

### 👨‍💻 Frontend Developer

**Start Here**:
1. [QUICKSTART.md](./QUICKSTART.md) - Setup
2. [ARCHITECTURE.md](./ARCHITECTURE.md#styling) - Styling section
3. `components/CSVUpload.tsx` - Study how uploads work
4. `components/CustomerTable.tsx` - Study table rendering
5. `app/dashboard/page.tsx` - Main component logic

**Typical Tasks**: UI improvements, new components, responsive design

---

### 🖥️ Backend Developer

**Start Here**:
1. [QUICKSTART.md](./QUICKSTART.md) - Setup
2. [ARCHITECTURE.md](./ARCHITECTURE.md) - Full overview
3. `lib/churnCalculator.ts` - Core logic
4. `app/api/customers/upload/route.ts` - API implementation
5. `prisma/schema.prisma` - Database schema

**Typical Tasks**: New APIs, integrations, database changes

---

### 📊 Data Engineer

**Start Here**:
1. [CHURN_RULES.md](./CHURN_RULES.md) - Understanding scoring
2. `lib/churnCalculator.ts` - Scoring implementation
3. `prisma/schema.prisma` - Data model
4. `sample-customers.csv` - Data format

**Typical Tasks**: New scoring rules, data validation, analytics

---

### 🚀 DevOps Engineer

**Start Here**:
1. [DEPLOYMENT.md](./DEPLOYMENT.md) - Full guide
2. [QUICKSTART.md](./QUICKSTART.md) - Local setup
3. `.env.example` - Environment variables
4. `package.json` - Build scripts

**Typical Tasks**: Deployment, monitoring, scaling

---

### 🎯 Product Manager

**Start Here**:
1. [README.md](./README.md) - Product overview
2. [STRATEGY.md](./STRATEGY.md) - Use cases & GTM
3. [CHURN_RULES.md](./CHURN_RULES.md) - Scoring rules
4. [INTEGRATIONS.md](./INTEGRATIONS.md) - Roadmap

**Typical Tasks**: Feature requests, pricing, roadmap

---

### 🏗️ Architect / Tech Lead

**Start Here**:
1. [ARCHITECTURE.md](./ARCHITECTURE.md) - Full overview
2. [DEPLOYMENT.md](./DEPLOYMENT.md) - Scalability
3. [INTEGRATIONS.md](./INTEGRATIONS.md) - Future tech
4. Review all source code files

**Typical Tasks**: System design, technology choices, code review

---

## 📋 Common Tasks & Where to Find Help

| Task | File | Section |
|------|------|---------|
| Run the app | [QUICKSTART.md](./QUICKSTART.md) | Quick Start |
| Upload customer data | [TESTING.md](./TESTING.md) | Test 5 |
| Change scoring rules | [CHURN_RULES.md](./CHURN_RULES.md) | Rules section |
| Add new API endpoint | [ARCHITECTURE.md](./ARCHITECTURE.md#api-conventions) | API Conventions |
| Deploy to production | [DEPLOYMENT.md](./DEPLOYMENT.md) | Production Deployment |
| Integrate Stripe | [INTEGRATIONS.md](./INTEGRATIONS.md) | Stripe Integration |
| Troubleshoot issues | [TESTING.md](./TESTING.md) | Troubleshooting |
| Understand code | [ARCHITECTURE.md](./ARCHITECTURE.md#key-files-explained) | Key Files Explained |
| Plan next features | [INTEGRATIONS.md](./INTEGRATIONS.md) | Future Enhancements |

---

## ⏱️ Reading Time Summary

| Document | Time | Audience |
|----------|------|----------|
| QUICKSTART.md | 5 min | Everyone |
| README.md | 10 min | Everyone |
| CHURN_RULES.md | 15 min | Developers, PMs |
| ARCHITECTURE.md | 20 min | Developers, Architects |
| STRATEGY.md | 20 min | PMs, Founders |
| TESTING.md | 10 min | QA, Developers |
| DEPLOYMENT.md | 15 min | DevOps, Founders |
| INTEGRATIONS.md | 20 min | Developers, Architects |
| **Total** | **~115 min** | Full team orientation |

---

## 🔍 Finding Information

### "How do I...?"

**...get started?** → [QUICKSTART.md](./QUICKSTART.md)

**...understand the code?** → [ARCHITECTURE.md](./ARCHITECTURE.md)

**...change churn rules?** → [CHURN_RULES.md](./CHURN_RULES.md)

**...test the app?** → [TESTING.md](./TESTING.md)

**...deploy to production?** → [DEPLOYMENT.md](./DEPLOYMENT.md)

**...add new features?** → [INTEGRATIONS.md](./INTEGRATIONS.md)

**...understand the strategy?** → [STRATEGY.md](./STRATEGY.md)

**...know what I got?** → [DELIVERABLES.md](./DELIVERABLES.md)

---

## 📞 Help & Support

| Issue | Solution |
|-------|----------|
| App won't start | See [QUICKSTART.md](./QUICKSTART.md) Troubleshooting |
| Test failing | See [TESTING.md](./TESTING.md) Test 1-7 |
| Database error | See [TESTING.md](./TESTING.md) Troubleshooting |
| Deployment issue | See [DEPLOYMENT.md](./DEPLOYMENT.md) |
| Feature request | See [INTEGRATIONS.md](./INTEGRATIONS.md) |
| Code question | See [ARCHITECTURE.md](./ARCHITECTURE.md) |

---

## 🎯 Your Next Step

**Choose your path:**

1. **Just want to run it?** → [QUICKSTART.md](./QUICKSTART.md) (5 min)
2. **Want to understand it?** → [ARCHITECTURE.md](./ARCHITECTURE.md) (20 min)
3. **Want to deploy it?** → [DEPLOYMENT.md](./DEPLOYMENT.md) (15 min)
4. **Want to extend it?** → [INTEGRATIONS.md](./INTEGRATIONS.md) (20 min)
5. **Want to sell it?** → [STRATEGY.md](./STRATEGY.md) (20 min)

---

**Happy hacking!** 🚀
