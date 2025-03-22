"use server";

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 📌 GET: Fetch all medicine requests for a user (Fix params to match `[id]`)
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const requests = await prisma.medicineRequest.findMany({
      where: { userId: params.id }, // Use `id` instead of `userId`
      include: { seller: true },
    });

    return NextResponse.json({ success: true, data: requests });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch requests" }, { status: 500 });
  }
}

// 📌 DELETE: Remove a medicine request (Fix params to match `[id]`)
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.medicineRequest.delete({ where: { id: params.id } }); // Use `id` instead of `requestId`

    return NextResponse.json({ success: true, message: "Request deleted successfully" });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to delete request" }, { status: 500 });
  }
}
