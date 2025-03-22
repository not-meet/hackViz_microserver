"use server"

import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 📌 GET: Fetch all medical reports of a specific user
export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
  try {
    const id = params?.userId;

    if (!id) {
      return NextResponse.json({ success: false, error: "Missing report ID" }, { status: 400 });
    }


    const reports = await prisma.medicalCase.findMany({
      where: { userId: id },
    });

    return NextResponse.json({ success: true, data: reports });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch reports" }, { status: 500 });
  }
}

