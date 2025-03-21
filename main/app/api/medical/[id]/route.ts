"use server";

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 📌 GET: Fetch a single medical report by ID
export async function GET(req: NextRequest, context: { params: { id: string } }) {
  try {
    const { id } = context.params;

    const report = await prisma.medicalCase.findUnique({
      where: { id },
    });

    if (!report) {
      return NextResponse.json({ success: false, error: "Report not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: report });
  } catch (error) {
    console.error("Error fetching report:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch report" }, { status: 500 });
  }
}

// 📌 PUT: Update a medical report
export async function PUT(req: NextRequest, context: { params: { id: string } }) {
  try {
    const { id } = context.params;
    const body = await req.json();

    const updatedReport = await prisma.medicalCase.update({
      where: { id },
      data: body,
    });

    return NextResponse.json({ success: true, data: updatedReport });
  } catch (error) {
    console.error("Error updating report:", error);
    return NextResponse.json({ success: false, error: "Failed to update report" }, { status: 500 });
  }
}
