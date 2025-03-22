"use server";

import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ✅ Correct way to access `params` in API routes
export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id; // Correct extraction

    if (!id) {
      return res.status(400).json({ success: false, error: "Missing ID" });
    }

    const requests = await prisma.medicineRequest.findMany({
      where: { userId: id },
      include: { seller: true },
    });

    return res.status(200).json({ success: true, data: requests });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Failed to fetch requests" });
  }
}

// 📌 DELETE: Remove a medicine request
export async function DELETE(req: NextApiRequest, { params }: { params: Record<string, string> }, res: NextApiResponse) {
  try {
    const id = params.id; // Extracting correctly

    if (!id) {
      return res.status(400).json({ success: false, error: "Missing request ID" });
    }

    await prisma.medicineRequest.delete({ where: { id } });

    return res.status(200).json({ success: true, message: "Request deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Failed to delete request" });
  }
}
