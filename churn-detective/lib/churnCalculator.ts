export interface ChurnRiskResult {
  score: number;
  level: "Low" | "Medium" | "High";
  reasons: string[];
  actions: string[];
}

export function calculateChurnRisk(customer: {
  lastLoginDate: Date | null;
  loginsLast7Days: number;
  loginsLast30Days: number;
  lastPaymentDate: Date | null;
  paymentStatus: string;
}): ChurnRiskResult {
  let score = 0;
  const reasons: string[] = [];
  const actions: string[] = [];

  // Rule 1: No login in last 7 days
  if (!customer.lastLoginDate) {
    score += 50;
    reasons.push("No login activity recorded");
    actions.push("Send re-engagement email");
  } else {
    const daysSinceLastLogin = Math.floor(
      (Date.now() - customer.lastLoginDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysSinceLastLogin > 7) {
      score += 30;
      reasons.push(`No login for ${daysSinceLastLogin} days`);
      actions.push("Send re-engagement email");
    }

    if (daysSinceLastLogin > 14) {
      score += 15;
      reasons.push("Extended inactivity");
      actions.push("Contact customer personally");
    }

    if (daysSinceLastLogin > 30) {
      score += 20;
      reasons.push("Critical inactivity (30+ days)");
      actions.push("Urgent: Schedule customer call");
    }
  }

  // Rule 2: Login drop >50%
  if (
    customer.loginsLast30Days > 0 &&
    customer.loginsLast7Days / customer.loginsLast30Days < 0.5
  ) {
    score += 25;
    reasons.push("Usage declining (7d vs 30d comparison)");
    actions.push("Check for bugs or friction");
  }

  // Rule 3: Login drop >75%
  if (
    customer.loginsLast30Days > 0 &&
    customer.loginsLast7Days / customer.loginsLast30Days < 0.25
  ) {
    score += 20;
    reasons.push("Sharp usage drop");
    actions.push("Investigate recent changes");
  }

  // Rule 4: Failed payment
  if (customer.paymentStatus === "failed") {
    score += 40;
    reasons.push("Payment failed");
    actions.push("Fix payment issue immediately");
  }

  // Rule 5: Canceled subscription
  if (customer.paymentStatus === "canceled") {
    score += 100;
    reasons.push("Subscription canceled");
    actions.push("Contact for feedback");
  }

  // Rule 6: No payment in last 30 days
  if (customer.lastPaymentDate) {
    const daysSinceLastPayment = Math.floor(
      (Date.now() - customer.lastPaymentDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysSinceLastPayment > 30 && customer.paymentStatus === "pending") {
      score += 20;
      reasons.push("No recent payment");
      actions.push("Follow up on payment");
    }
  }

  // Cap score at 100
  score = Math.min(score, 100);

  // Determine risk level
  let level: "Low" | "Medium" | "High" = "Low";
  if (score >= 60) {
    level = "High";
  } else if (score >= 35) {
    level = "Medium";
  }

  // Deduplicate actions
  const uniqueActions = [...new Set(actions)];

  return {
    score,
    level,
    reasons,
    actions: uniqueActions,
  };
}
