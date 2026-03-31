# Churn Risk Calculation Rules

## Overview

Churn Detective uses a **rule-based scoring system** to calculate customer churn risk. The score ranges from **0 to 100**, where higher scores indicate higher churn risk.

## Risk Levels

- **Low**: 0-34 (Green) - Customer is active and engaged
- **Medium**: 35-59 (Orange) - Customer showing some warning signs
- **High**: 60-100 (Red) - Customer at significant risk of churning

## Scoring Rules

### 1. **No Login Activity** (+50 points)

If a customer has **never logged in**:
- **Points**: +50
- **Action**: "Send re-engagement email"
- **Why**: Complete inactivity signals no engagement

### 2. **Recent Inactivity - 7+ days** (+30 points)

If the customer's **last login was more than 7 days ago**:
- **Points**: +30
- **Action**: "Send re-engagement email"
- **Why**: Declining engagement pattern

### 3. **Extended Inactivity - 14+ days** (+15 points)

If the customer's **last login was more than 14 days ago**:
- **Points**: +15 (stacks with rule #2)
- **Action**: "Contact customer personally"
- **Why**: Significant drop in activity

### 4. **Critical Inactivity - 30+ days** (+20 points)

If the customer's **last login was more than 30 days ago**:
- **Points**: +20 (stacks with rule #2)
- **Action**: "Urgent: Schedule customer call"
- **Why**: Very high risk of churn

### 5. **Usage Decline >50%** (+25 points)

If **7-day logins / 30-day logins < 0.5**:
- **Points**: +25
- **Threshold**: Customer logged in less than 50% this week vs. last month
- **Action**: "Check for bugs or friction"
- **Why**: Sharp drop in engagement suggests problems

Example:
- 30-day logins: 20
- 7-day logins: 8
- Ratio: 8/20 = 0.40 (40% of previous activity) ✓ Triggers

### 6. **Usage Decline >75%** (+20 points)

If **7-day logins / 30-day logins < 0.25**:
- **Points**: +20
- **Threshold**: Customer logged in less than 25% this week vs. last month
- **Action**: "Investigate recent changes"
- **Why**: Severe decline indicates major problems

Example:
- 30-day logins: 20
- 7-day logins: 2
- Ratio: 2/20 = 0.10 (10% of previous activity) ✓ Triggers

### 7. **Failed Payment** (+40 points)

If **payment_status == "failed"**:
- **Points**: +40
- **Action**: "Fix payment issue immediately"
- **Why**: Technical or billing issue

### 8. **No Recent Payment** (+20 points)

If **last_payment_date is more than 30 days ago AND payment_status == "pending"**:
- **Points**: +20
- **Action**: "Follow up on payment"
- **Why**: Customer may be uncertain about subscription renewal

### 9. **Canceled Subscription** (+100 points)

If **payment_status == "canceled"**:
- **Points**: +100 (maxes out score immediately)
- **Action**: "Contact for feedback"
- **Why**: Subscription is already canceled; focus on winback

---

## Score Calculation Example

### Customer: Alice

- Last login: 10 days ago
- 7-day logins: 1
- 30-day logins: 15
- Last payment: 5 days ago
- Payment status: paid

**Calculation:**
1. Last login > 7 days: +30
2. Last login > 14 days: 0 (doesn't apply)
3. Usage decline (1/15 = 6.7% < 50%): +25
4. Usage decline (6.7% < 25%): +20
5. Failed payment: 0 (status is "paid")
6. Canceled: 0

**Total Score: 75** (score capped at 100)
**Risk Level: HIGH**
**Actions:**
- "Send re-engagement email"
- "Check for bugs or friction"
- "Investigate recent changes"

---

## CSV Upload Format

```csv
customer_id,email,last_login_date,number_of_logins_last_7_days,number_of_logins_last_30_days,last_payment_date,payment_status
```

### Field Requirements

| Field | Format | Example | Required |
|-------|--------|---------|----------|
| `customer_id` | Any identifier | "123" or "cust_abc" | Yes |
| `email` | Email address | "user@example.com" | Yes |
| `last_login_date` | YYYY-MM-DD | "2025-03-25" | No* |
| `number_of_logins_last_7_days` | Integer | "5" | Yes |
| `number_of_logins_last_30_days` | Integer | "20" | Yes |
| `last_payment_date` | YYYY-MM-DD | "2025-03-20" | No* |
| `payment_status` | One of: paid, failed, canceled, pending | "paid" | Yes |

*Leave empty if no data available (e.g., `,,paid`)

---

## Design Philosophy

The scoring system is:
- **Simple**: Clear, understandable rules
- **Deterministic**: Same input = same score every time
- **Easy to tweak**: Rules can be adjusted by changing point values
- **Action-focused**: Every rule has a suggested next step

## Extending the Rules

To add new rules, edit `lib/churnCalculator.ts`:

```typescript
// Example: Down-weight score for enterprise customers
if (customer.plan === "enterprise") {
  score *= 0.8;
}
```

Changes take effect immediately when you recalculate risks.
