"use server";

import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 📌 GET: Fetch all medical reports of a specific user
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId"); // ✅ Extract from query params

    if (!userId) {
      return NextResponse.json({ success: false, error: "Missing user ID" }, { status: 400 });
    }

    const reports = await prisma.medicalCase.findMany({
      where: { userId },
    });

    return NextResponse.json({ success: true, data: reports });
  } catch (error) {
    console.error("Error fetching reports:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch reports" }, { status: 500 });
  }
}
