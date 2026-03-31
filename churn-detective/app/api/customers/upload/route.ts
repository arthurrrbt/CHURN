import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { calculateChurnRisk } from "@/lib/churnCalculator";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const userEmail = formData.get("userEmail") as string;

    if (!file || !userEmail) {
      return NextResponse.json(
        { error: "File and userEmail are required" },
        { status: 400 }
      );
    }

    // Get user ID
    const user = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Read CSV file
    const text = await file.text();
    const lines = text.trim().split("\n");
    
    if (lines.length < 2) {
      return NextResponse.json(
        { error: "CSV file is empty" },
        { status: 400 }
      );
    }

    // Parse header
    const header = lines[0].split(",").map((h) => h.trim());
    const expectedHeaders = [
      "customer_id",
      "email",
      "last_login_date",
      "number_of_logins_last_7_days",
      "number_of_logins_last_30_days",
      "last_payment_date",
      "payment_status",
    ];

    for (const col of expectedHeaders) {
      if (!header.includes(col)) {
        return NextResponse.json(
          { error: `Missing required column: ${col}` },
          { status: 400 }
        );
      }
    }

    // Parse data
    const customers = [];
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(",").map((v) => v.trim());
      const row: Record<string, string> = {};

      header.forEach((col, idx) => {
        row[col] = values[idx] || "";
      });

      const lastLoginDate = row.last_login_date
        ? new Date(row.last_login_date)
        : null;
      const lastPaymentDate = row.last_payment_date
        ? new Date(row.last_payment_date)
        : null;

      const customer = {
        email: row.email,
        lastLoginDate,
        loginsLast7Days: parseInt(row.number_of_logins_last_7_days) || 0,
        loginsLast30Days: parseInt(row.number_of_logins_last_30_days) || 0,
        lastPaymentDate,
        paymentStatus: row.payment_status || "pending",
      };

      const riskResult = calculateChurnRisk(customer);

      customers.push({
        ...customer,
        riskScore: riskResult.score,
        riskLevel: riskResult.level,
        riskReasons: JSON.stringify(riskResult.reasons),
        suggestedActions: JSON.stringify(riskResult.actions),
      });
    }

    // Delete existing customers for this user
    await prisma.customer.deleteMany({
      where: { userId: user.id },
    });

    // Bulk insert/upsert new customers
    const inserted = await Promise.all(
      customers.map((customer) =>
        prisma.customer.create({
          data: {
            ...customer,
            userId: user.id,
          },
        })
      )
    );

    return NextResponse.json({
      success: true,
      count: inserted.length,
      message: `Imported ${inserted.length} customers`,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to process file" },
      { status: 500 }
    );
  }
}
