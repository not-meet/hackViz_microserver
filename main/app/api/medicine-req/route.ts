import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
// 📌 POST: Add a new medicine request

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newRequest = await prisma.medicineRequest.create({ data: body });

    return NextResponse.json({ success: true, data: newRequest }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to add request" }, { status: 500 });
  }
}
