import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { calculateChurnRisk } from "@/lib/churnCalculator";

export async function POST(request: NextRequest) {
  try {
    const { userEmail } = await request.json();

    if (!userEmail) {
      return NextResponse.json(
        { error: "userEmail is required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const customers = await prisma.customer.findMany({
      where: { userId: user.id },
    });

    // Recalculate risk for all customers
    const updated = await Promise.all(
      customers.map((customer) => {
        const riskResult = calculateChurnRisk({
          lastLoginDate: customer.lastLoginDate,
          loginsLast7Days: customer.loginsLast7Days,
          loginsLast30Days: customer.loginsLast30Days,
          lastPaymentDate: customer.lastPaymentDate,
          paymentStatus: customer.paymentStatus,
        });

        return prisma.customer.update({
          where: { id: customer.id },
          data: {
            riskScore: riskResult.score,
            riskLevel: riskResult.level,
            riskReasons: JSON.stringify(riskResult.reasons),
            suggestedActions: JSON.stringify(riskResult.actions),
          },
        });
      })
    );

    return NextResponse.json({
      success: true,
      message: `Recalculated risk for ${updated.length} customers`,
      count: updated.length,
    });
  } catch (error) {
    console.error("Recalculate error:", error);
    return NextResponse.json(
      { error: "Failed to recalculate risks" },
      { status: 500 }
    );
  }
}
