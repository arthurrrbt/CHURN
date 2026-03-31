# Integration Guide

## Future Integrations

### 1. Stripe Integration

**Goal**: Automatically sync customer subscription data

**Steps**:

1. Install Stripe SDK:
```bash
npm install stripe
```

2. Add environment variables:
```env
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_PUBLISHABLE_KEY="pk_live_..."
```

3. Create API endpoint:
```typescript
// app/api/stripe/sync/route.ts
import Stripe from 'stripe';

export async function POST(request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  
  // Fetch customers from Stripe
  const customers = await stripe.customers.list({ limit: 100 });
  
  // Map Stripe data to Churn Detective schema
  // Update database with last payment date, amount, status
  
  return { synced: customers.length };
}
```

4. Add to dashboard:
```tsx
<button onClick={() => fetch('/api/stripe/sync', { method: 'POST' })}>
  Sync from Stripe
</button>
```

**Benefits**:
- Real customer data
- Automatic updates
- Better churn predictions

---

### 2. Email Integration

**Goal**: Send alerts and re-engagement emails

**Setup** (using Resend or SendGrid):

1. Install email SDK:
```bash
npm install resend
```

2. Add API key:
```env
RESEND_API_KEY="re_..."
```

3. Create email templates:
```typescript
// lib/emails/reEngagementEmail.ts
export const reEngagementTemplate = (customer) => ({
  to: customer.email,
  subject: "We miss you! 👋",
  html: `<p>Hi ${customer.name},</p>
    <p>It's been ${daysSinceLogin} days since we last saw you...</p>`
});
```

4. Trigger from dashboard:
```typescript
// Button to send re-engagement emails
const sendEmails = async (customerIds) => {
  await fetch('/api/emails/send', {
    method: 'POST',
    body: JSON.stringify({ 
      template: 'reEngagement',
      customerIds 
    })
  });
};
```

**Future**: Automate scheduled sends for high-risk customers

---

### 3. Slack Notifications

**Goal**: Alert founders of high-risk customers in real-time

**Setup**:

1. Create Slack app at [api.slack.com](https://api.slack.com)
2. Add incoming webhook:
```env
SLACK_WEBHOOK_URL="https://hooks.slack.com/services/..."
```

3. Create notification function:
```typescript
// lib/slack.ts
import axios from 'axios';

export async function notifyHighRiskCustomer(customer) {
  await axios.post(process.env.SLACK_WEBHOOK_URL, {
    text: `🚨 High-risk customer detected`,
    attachments: [{
      color: 'danger',
      fields: [
        { title: 'Customer', value: customer.email },
        { title: 'Risk Score', value: customer.riskScore },
        { title: 'Reason', value: customer.riskReasons[0] }
      ]
    }]
  });
}
```

4. Trigger on upload or recalculate:
```typescript
const highRiskCustomers = customers.filter(c => c.riskScore >= 70);
highRiskCustomers.forEach(notifyHighRiskCustomer);
```

---

### 4. Webhooks for Real-Time Updates

**Goal**: Receive customer activity updates from your platform

**Setup**:

1. Create webhook endpoint:
```typescript
// app/api/webhooks/customer-activity/route.ts
export async function POST(request) {
  const event = await request.json();
  
  // Handle different event types
  switch(event.type) {
    case 'customer.login':
      await loginOccurred(event.customer_id);
      break;
    case 'payment.failed':
      await paymentFailed(event.customer_id);
      break;
  }
  
  return { received: true };
}

async function loginOccurred(customerId) {
  // Update last login date
  await prisma.customer.update({
    where: { id: customerId },
    data: { lastLoginDate: new Date() }
  });
  
  // Recalculate risk
  const customer = await prisma.customer.findUnique(...);
  const risk = calculateChurnRisk(customer);
  
  // Update risk score
  await prisma.customer.update({
    where: { id: customerId },
    data: { 
      riskScore: risk.score,
      riskLevel: risk.level,
      riskReasons: JSON.stringify(risk.reasons),
      suggestedActions: JSON.stringify(risk.actions)
    }
  });
}
```

2. Configure in your app to send webhooks to:
```
https://yourdomain.com/api/webhooks/customer-activity
```

**Benefit**: No need to upload CSV regularly - data updates automatically

---

### 5. OAuth Integration

**Goal**: Let users login with GitHub/Google instead of demo email

**Setup** with NextAuth:

1. Install NextAuth:
```bash
npm install next-auth@beta
```

2. Create auth config:
```typescript
// lib/auth.ts
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // Find or create user in database
      await prisma.user.upsert({
        where: { email: user.email },
        update: {},
        create: { email: user.email }
      });
      return true;
    },
  },
};
```

3. Replace login page with NextAuth session

**Benefit**: Real authentication without password management

---

### 6. Analytics & Metrics

**Goal**: Track churn prediction accuracy and model performance

**Setup**:

1. Create metrics table:
```prisma
model ChurnMetric {
  id String @id @default(cuid())
  userId String
  user User @relation(fields: [userId], references: [id])
  predictedChurn Boolean
  actualChurn Boolean
  predictionDate DateTime
  outcomeDate DateTime?
}
```

2. Track predictions:
```typescript
// After calculating risk
if (customer.riskScore >= 60) {
  await prisma.churnMetric.create({
    data: {
      userId,
      predictedChurn: true,
      predictionDate: new Date(),
    }
  });
}
```

3. Dashboard metrics:
```typescript
const metrics = await prisma.churnMetric.groupBy({
  by: ['predictedChurn', 'actualChurn'],
  _count: true
});
```

**Pages to add**:
- Accuracy dashboard
- Model performance trends
- Rule effectiveness analysis

---

### 7. Multi-Tenancy

**Goal**: Support multiple companies on same platform

**Schema changes**:

```prisma
model Workspace {
  id String @id @default(cuid())
  name String
  owner User @relation(fields: [ownerId], references: [id])
  ownerId String
  users WorkspaceUser[]
  customers Customer[]
}

model WorkspaceUser {
  id String @id @default(cuid())
  user User @relation(fields: [userId], references: [id])
  userId String
  workspace Workspace @relation(fields: [workspaceId], references: [id])
  workspaceId String
  role String // "admin", "member"
}

model Customer {
  // ... existing fields
  workspace Workspace @relation(fields: [workspaceId], references: [id])
  workspaceId String
}
```

**Pricing tiers**:
- Free: 1 workspace, 100 customers
- Pro: 5 workspaces, 10k customers
- Enterprise: unlimited

---

### 8. Advanced Analytics

**Goal**: Predictive models and trend analysis

**Extensions**:

1. **Prediction confidence**: ML model to estimate churn probability
2. **Cohort analysis**: Compare churn rates by signup month
3. **Trend forecasting**: Predict future churn rate
4. **Segment insights**: Which customer types churn most?
5. **Intervention testing**: A/B test re-engagement strategies

**Tools**: TensorFlow.js, Prophet, or simple regression

---

### 9. API for Third-Party Apps

**Goal**: Let users build workflows with Zapier, Make, etc.

**API Keys**:
```prisma
model ApiKey {
  id String @id @default(cuid())
  user User @relation(fields: [userId], references: [id])
  userId String
  key String @unique
  name String
  createdAt DateTime @default(now())
}
```

**Endpoints**:
```typescript
// GET /api/v1/customers (authenticated with API key)
// POST /api/v1/customers/import (batch import)
// GET /api/v1/webhooks
// POST /api/v1/webhooks (create event subscription)
```

---

### 10. White-Label Option

**Goal**: Resell as "Your Brand Churn Detective"

**Required**:
- Custom domain support
- Logo/colors customization
- Branded emails
- Custom documentation

**Example**:
```typescript
const branding = {
  logoUrl: 'https://...',
  primaryColor: '#...',
  companyName: 'Your Company'
};
```

---

## Migration Path

### Phase 1: MVP (Current) ✅
- Email login
- CSV upload
- Rule-based scoring
- Dashboard

### Phase 2: Core Features (1-2 weeks)
- [ ] Stripe integration
- [ ] Email notifications
- [ ] Webhook support

### Phase 3: Growth (1-2 months)
- [ ] OAuth login
- [ ] Analytics dashboard
- [ ] API for developers

### Phase 4: Enterprise (3+ months)
- [ ] Multi-tenancy
- [ ] ML predictions
- [ ] White-labeling

---

## Quick Reference: Dependencies to Add

| Feature | Package | Size |
|---------|---------|------|
| Stripe | `stripe` | 200KB |
| Email (Resend) | `resend` | 80KB |
| OAuth | `next-auth@beta` | 500KB |
| Analytics | `amplitude-js` | 100KB |
| ML | `onnxruntime-web` | 5MB+ |

Total impact on bundle size: manageable

---

Start with Phase 2 integrations (Stripe + Email) to get 80% of value with 20% of effort. Phase 3+ are "nice to have" for differentiation.
