const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Inline churn risk calculator
function calculateChurnRisk(customer) {
  let score = 0;
  const reasons = [];
  const actions = [];

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
  let level = "Low";
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

async function main() {
  console.log("Starting seed...");

  // Create a test user
  const user = await prisma.user.upsert({
    where: { email: "demo@example.com" },
    update: {},
    create: {
      email: "demo@example.com",
    },
  });

  console.log(`Created user: ${user.email}`);

  // Sample customers with various risk profiles
  const customersData = [
    {
      email: "alice@company.com",
      lastLoginDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      loginsLast7Days: 4,
      loginsLast30Days: 18,
      lastPaymentDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      paymentStatus: "paid",
    },
    {
      email: "bob@company.com",
      lastLoginDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
      loginsLast7Days: 0,
      loginsLast30Days: 8,
      lastPaymentDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
      paymentStatus: "paid",
    },
    {
      email: "charlie@company.com",
      lastLoginDate: null, // Never logged in
      loginsLast7Days: 0,
      loginsLast30Days: 0,
      lastPaymentDate: null,
      paymentStatus: "pending",
    },
    {
      email: "diana@company.com",
      lastLoginDate: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000), // 35 days ago
      loginsLast7Days: 0,
      loginsLast30Days: 1,
      lastPaymentDate: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000),
      paymentStatus: "failed",
    },
    {
      email: "eva@company.com",
      lastLoginDate: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000), // 8 days ago
      loginsLast7Days: 0,
      loginsLast30Days: 15,
      lastPaymentDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      paymentStatus: "paid",
    },
    {
      email: "frank@company.com",
      lastLoginDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      loginsLast7Days: 6,
      loginsLast30Days: 20,
      lastPaymentDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      paymentStatus: "paid",
    },
    {
      email: "grace@company.com",
      lastLoginDate: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000), // 25 days ago
      loginsLast7Days: 0,
      loginsLast30Days: 5,
      lastPaymentDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      paymentStatus: "canceled",
    },
  ];

  // Delete existing customers for this user
  await prisma.customer.deleteMany({
    where: { userId: user.id },
  });

  // Create customers with calculated risk
  for (const customerData of customersData) {
    const riskResult = calculateChurnRisk(customerData);

    await prisma.customer.create({
      data: {
        ...customerData,
        userId: user.id,
        riskScore: riskResult.score,
        riskLevel: riskResult.level,
        riskReasons: JSON.stringify(riskResult.reasons),
        suggestedActions: JSON.stringify(riskResult.actions),
      },
    });
  }

  console.log(`Created ${customersData.length} sample customers`);
  console.log(`\nDemo account: demo@example.com`);
  console.log("Use this email to login and see the sample data.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
