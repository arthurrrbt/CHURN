# Testing Guide

## Manual Testing Workflow

### Test 1: Login

1. Open [http://localhost:3000](http://localhost:3000)
2. Enter email: `demo@example.com`
3. Click "Sign In"
4. **Expected**: Redirects to dashboard with sample customers loaded

### Test 2: View Sample Data

Once logged in:
1. You should see a table with 7 sample customers:
   - alice@company.com (Low risk - engaged customer)
   - bob@company.com (Medium risk - declining usage)
   - charlie@company.com (High risk - never logged in)
   - diana@company.com (High risk - failed payment)
   - eva@company.com (Medium risk - no recent logins)
   - frank@company.com (Low risk - very active)
   - grace@company.com (High risk - subscription canceled)

2. **Expected**: 
   - Table shows 3 high-risk, 2 medium-risk, 2 low-risk customers
   - Each row shows risk score, level (color-coded), reasons, and actions
   - Sorted by risk score (highest first)

### Test 3: Filter by Risk Level

1. Click the "High" button above the table
2. **Expected**: Shows only 3 high-risk customers
3. Click "Medium"
4. **Expected**: Shows only 2 medium-risk customers
5. Click "All"
6. **Expected**: Shows all 7 customers again

### Test 4: Recalculate Risk

1. Click "Recalculate Risk" button (top right)
2. **Expected**: Button shows "Recalculating..." for a moment
3. **Expected**: Table refreshes with same data (no change expected)

### Test 5: Upload Custom CSV

1. Create a CSV file with your own customer data
2. Use this format:
   ```csv
   customer_id,email,last_login_date,number_of_logins_last_7_days,number_of_logins_last_30_days,last_payment_date,payment_status
   1,test@example.com,2025-03-25,5,20,2025-03-20,paid
   2,inactive@example.com,,0,0,,pending
   3,failed@example.com,2025-03-10,2,10,2025-02-10,failed
   ```
3. Click the upload area in the dashboard
4. Select your CSV file
5. **Expected**: 
   - Success message appears
   - Table updates with your 3 customers
   - Risk scores calculated for each

### Test 6: Verify Risk Scoring

For the uploaded customer `inactive@example.com` (no login, pending payment):
- **Expected Risk Score**: 50
- **Expected Level**: Medium
- **Expected Reasons**: "No login activity recorded"
- **Expected Actions**: "Send re-engagement email"

For the uploaded customer `failed@example.com` (11+ days inactive, failed payment):
- **Expected Risk Score**: 70
- **Expected Level**: High
- **Expected Reasons**: 
  - "No login for 21 days"
  - "Payment failed"
  - (and possibly usage decline)
- **Expected Actions**: Multiple actions including payment fix

### Test 7: Logout

1. Click "Logout" button (top right)
2. **Expected**: Redirects to login page
3. Enter `demo@example.com` again
4. **Expected**: Redirects to dashboard (persistence works)

### Test 8: Browser DevTools

Open DevTools (F12) → Network tab:

1. Check login request:
   - POST `/api/auth/login`
   - Response: `{ success: true, userId, email }`

2. Check fetch customers:
   - GET `/api/customers?userEmail=...`
   - Response: `{ success: true, customers: [...], total }`

3. Check upload:
   - POST `/api/customers/upload` (FormData)
   - Response: `{ success: true, count, message }`

---

## Automated Testing (Future)

### Unit Tests (Jest)

Test the risk calculator:
```bash
npm test -- churnCalculator
```

### API Route Tests

Test endpoints with various inputs.

### E2E Tests (Playwright/Cypress)

Test full user workflows.

---

## UI/UX Testing Checklist

- [ ] Login page displays correctly
- [ ] Dashboard loads after login
- [ ] CSV upload area is visible and clickable
- [ ] Table displays all columns correctly
- [ ] Color coding matches risk levels (Green < Orange < Red)
- [ ] Buttons are responsive and clickable
- [ ] Responsive design works on mobile (shrink browser)
- [ ] Error messages display clearly
- [ ] Success messages display after upload
- [ ] Logout works and clears session

---

## Performance Testing

### Check Bundle Size
```bash
npm run build
# Check output size in `.next/static/chunks/`
```

### Monitor API Response Times

DevTools Network tab should show:
- `/api/auth/login`: < 200ms
- `/api/customers`: < 500ms (depends on customer count)
- `/api/customers/upload`: < 2s for 100 customers
- `/api/customers/recalculate`: < 5s for 100 customers

### Load Test (Future)

With tools like `k6` or `Apache JMeter`:
```bash
# Simulate 100 concurrent uploads
```

---

## Debugging Tips

### Check Database State
```bash
npx prisma studio
# Opens admin UI at http://localhost:5555
# Inspect User and Customer records
```

### View API Logs

Terminal running `npm run dev` shows:
```
GET /api/customers?userEmail=... 200 in 45ms
POST /api/customers/upload 200 in 1234ms
```

### React Component Debugging

DevTools Components tab:
- Inspect `<CustomerTable>` props
- Check state with React Profiler

### TypeScript Errors
```bash
npx tsc --noEmit
```

---

## Test Data Scenarios

### Scenario 1: Healthy Customer
- Last login: 2 days ago
- Logins this week: 5
- Logins past month: 22
- Last payment: yesterday (paid)
- **Expected**: Low risk (< 20)

### Scenario 2: At-Risk Customer
- Last login: 10 days ago
- Logins this week: 0
- Logins past month: 5
- Last payment: 15 days ago (paid)
- **Expected**: High risk (60+)

### Scenario 3: Churned Customer
- Last login: Never
- Logins this week: 0
- Logins past month: 0
- Last payment: None
- Payment status: pending
- **Expected**: Very high risk (50+)

---

## Reporting Issues

If something doesn't work:

1. **Check terminal** for error messages
2. **Clear browser cache**: Ctrl+Shift+Delete
3. **Reset database**:
   ```bash
   rm prisma/dev.db
   npm run prisma:migrate
   npm run seed
   ```
4. **Restart dev server**
5. **Check .env file** has DATABASE_URL set

---

## Success Criteria

The MVP is working if:

✅ Can login with demo@example.com  
✅ Can see 7 sample customers  
✅ Dashboard shows correct risk scores  
✅ Can upload custom CSV  
✅ Can filter by risk level  
✅ Can recalculate risks  
✅ Can logout and login again  
✅ No console errors (warnings OK)  

**All criteria met? → MVP is ready! 🚀**
