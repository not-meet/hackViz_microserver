"use server";

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 📌 GET: Fetch all medicine requests for a user (Fix params to match `[id]`)
export async function GET(req: NextRequest, context: { params: { id: string } }) {
  try {
    const id = context.params.id; // Extract `id` correctly

    const requests = await prisma.medicineRequest.findMany({
      where: { userId: id }, // Use `id` instead of `userId`
      include: { seller: true },
    });

    return NextResponse.json({ success: true, data: requests });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch requests" }, { status: 500 });
  }
}

// 📌 DELETE: Remove a medicine request
export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  try {
    const id = context.params.id; // Correct `id` extraction

    await prisma.medicineRequest.delete({ where: { id } });

    return NextResponse.json({ success: true, message: "Request deleted successfully" });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json({ success: false, error: "Failed to delete request" }, { status: 500 });
  }
}
