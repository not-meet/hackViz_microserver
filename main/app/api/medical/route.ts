"use server"

import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 📌 GET: Fetch all medical reports of a specific user

// 📌 POST: Add a new medical report
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newReport = await prisma.medicalCase.create({ data: body });

    return NextResponse.json({ success: true, data: newReport }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to add report" }, { status: 500 });
  }
}
