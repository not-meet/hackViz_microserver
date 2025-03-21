"use server"

import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function PATCH(req: NextRequest, { params }: { params: { sellerId: string } }) {
  try {
    const body = await req.json();
    const updatedSeller = await prisma.seller.update({
      where: { id: params.sellerId },
      data: body,
    });

    return NextResponse.json({ success: true, data: updatedSeller });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update seller" }, { status: 500 });
  }
}

// 📌 DELETE: Remove a seller
export async function DELETE(req: NextRequest, { params }: { params: { sellerId: string } }) {
  try {
    await prisma.seller.delete({ where: { id: params.sellerId } });
    return NextResponse.json({ success: true, message: "Seller deleted successfully" });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to delete seller" }, { status: 500 });
  }
}
