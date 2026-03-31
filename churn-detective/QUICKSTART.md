# Churn Detective - Quick Start Guide

## Prerequisites

- Node.js 18+ 
- npm

## Installation & Setup (5 minutes)

### 1. Install Dependencies

```bash
npm install --legacy-peer-deps
```

### 2. Setup Database

```bash
# Generate Prisma client
npm run prisma:generate

# Create database and tables
npm run prisma:migrate

# Seed with sample data
npm run seed
```

You'll see:
```
Created user: demo@example.com
Created 7 sample customers
Demo account: demo@example.com
```

### 3. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Using the App

### Login

- **Email**: `demo@example.com`
- Click "Sign In" (no password required for demo)

### You'll see:

1. **Upload Section**: Upload a CSV file with customer data
2. **Dashboard**: List of customers sorted by churn risk
3. **Risk Analysis**: Risk score, level, reasons, and actions per customer

### Sample CSV Format

If you want to upload your own data, use this format:

```csv
customer_id,email,last_login_date,number_of_logins_last_7_days,number_of_logins_last_30_days,last_payment_date,payment_status
1,customer@example.com,2025-03-25,5,20,2025-03-20,paid
2,customer2@example.com,2025-03-10,0,3,2025-03-05,failed
3,customer3@example.com,,0,0,,pending
```

File `sample-customers.csv` is included in the project.

### Features to Try

1. **Upload CSV**: Click on the upload area and select a CSV file
2. **Filter by Risk**: Click "High", "Medium", "Low" tabs at the top
3. **Recalculate**: Click "Recalculate Risk" to recompute all scores

## Key Folders

- `app/` - Next.js pages and API routes
- `components/` - React components (CSVUpload, CustomerTable)
- `lib/` - Business logic (churn calculator, Prisma client)
- `prisma/` - Database schema and seed script

## Troubleshooting

### npm install fails

Use `--legacy-peer-deps`:
```bash
npm install --legacy-peer-deps
```

### Database errors

Reset the database:
```bash
rm prisma/dev.db
npm run prisma:migrate
npm run seed
```

### Port 3000 already in use

Change port:
```bash
npm run dev -- -p 3001
```

## Build for Production

```bash
npm run build
npm start
```

Open [http://localhost:3000](http://localhost:3000)

---

That's it! You have a working churn detection app. 🚀
