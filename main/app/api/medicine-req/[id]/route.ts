"use server"

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
  try {
    const requests = await prisma.medicineRequest.findMany({
      where: { userId: params.userId },
      include: { seller: true }, // Include seller details if assigned
    });

    return NextResponse.json({ success: true, data: requests });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch requests" }, { status: 500 });
  }
}

// 📌 DELETE: Remove a medicine request
export async function DELETE(req: NextRequest, { params }: { params: { requestId: string } }) {
  try {
    await prisma.medicineRequest.delete({ where: { id: params.requestId } });

    return NextResponse.json({ success: true, message: "Request deleted successfully" });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to delete request" }, { status: 500 });
  }
}
