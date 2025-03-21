"use server"

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 📌 GET: Fetch a single medical report by ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const report = await prisma.medicalCase.findUnique({
      where: { id: params.id },
    });

    if (!report) {
      return NextResponse.json({ success: false, error: "Report not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: report });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch report" }, { status: 500 });
  }
}

// 📌 PUT: Update a medical report
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const updatedReport = await prisma.medicalCase.update({
      where: { id: params.id },
      data: body,
    });

    return NextResponse.json({ success: true, data: updatedReport });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update report" }, { status: 500 });
  }
}
