"use server"

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(req: NextRequest, { params }: { params: { requestId: string } }) {

  try {
    const { sellerId } = await req.json();

    const updatedRequest = await prisma.medicineRequest.update({
      where: { id: params.requestId },
      data: { sellerId, isPickedUp: true },
      include: { seller: true }, // To get seller details after update
    });

    return NextResponse.json({ success: true, data: updatedRequest });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to assign request" }, { status: 500 });
  }
}
