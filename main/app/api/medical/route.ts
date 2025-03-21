"use server"

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 📌 GET: Fetch all medical reports of a specific user
export async function GET(req: Request, { params }: { params: { userId: string } }) {
  try {
    const reports = await prisma.medicalCase.findMany({
      where: { userId: params.userId },
    });

    return NextResponse.json({ success: true, data: reports });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch reports" }, { status: 500 });
  }
}

// 📌 POST: Add a new medical report
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newReport = await prisma.medicalCase.create({ data: body });

    return NextResponse.json({ success: true, data: newReport }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to add report" }, { status: 500 });
  }
}
