"use server";

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ✅ Correct way to access `params` in API routes
export async function GET(req: NextRequest, { params }: { params: Record<string, string> }) {
  try {
    const id = params.id; // Correct extraction

    if (!id) {
      return NextResponse.json({ success: false, error: "Missing ID" }, { status: 400 });
    }

    const requests = await prisma.medicineRequest.findMany({
      where: { userId: id },
      include: { seller: true },
    });

    return NextResponse.json({ success: true, data: requests });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch requests" }, { status: 500 });
  }
}

// 📌 DELETE: Remove a medicine request
export async function DELETE(req: NextRequest, { params }: { params: Record<string, string> }) {
  try {
    const id = params.id; // Extracting correctly

    if (!id) {
      return NextResponse.json({ success: false, error: "Missing request ID" }, { status: 400 });
    }

    await prisma.medicineRequest.delete({ where: { id } });

    return NextResponse.json({ success: true, message: "Request deleted successfully" });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to delete request" }, { status: 500 });
  }
}
