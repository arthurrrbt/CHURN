import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const userEmail = request.nextUrl.searchParams.get("userEmail");
    const riskLevel = request.nextUrl.searchParams.get("riskLevel");

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

    // Build where clause
    const whereClause: any = {
      userId: user.id,
    };

    if (riskLevel && ["Low", "Medium", "High"].includes(riskLevel)) {
      whereClause.riskLevel = riskLevel;
    }

    const customers = await prisma.customer.findMany({
      where: whereClause,
      orderBy: {
        riskScore: "desc" as const,
      },
    });

    // Parse JSON fields for response
    const parsedCustomers = customers.map((c: any) => ({
      ...c,
      riskReasons: JSON.parse(c.riskReasons),
      suggestedActions: JSON.parse(c.suggestedActions),
    }));

    return NextResponse.json({
      success: true,
      customers: parsedCustomers,
      total: parsedCustomers.length,
    });
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch customers" },
      { status: 500 }
    );
  }
}
