"use server"

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 📌 POST: Create a new seller
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newSeller = await prisma.seller.create({ data: body });

    return NextResponse.json({ success: true, data: newSeller }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create seller" }, { status: 500 });
  }
}

// 📌 GET: Fetch all sellers
export async function GET() {
  try {
    const sellers = await prisma.seller.findMany();
    return NextResponse.json({ success: true, data: sellers });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch sellers" }, { status: 500 });
  }
}
