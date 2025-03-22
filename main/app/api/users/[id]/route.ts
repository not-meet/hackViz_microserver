"use server"
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const clerkId = url.searchParams.get('clerkId'); // Changed from 'id' to 'clerkId'

    if (!clerkId) {
      return NextResponse.json({ success: false, error: "Missing Clerk ID" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { clerkId }, // Changed from 'id' to 'clerkId'
    });

    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: user });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch user" }, { status: 500 });
  }
}

// 📌 PUT: Update a user
export async function PUT(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const clerkId = url.searchParams.get('clerkId'); // Changed from 'id' to 'clerkId'

    if (!clerkId) {
      return NextResponse.json({ success: false, error: "Missing Clerk ID" }, { status: 400 });
    }

    const body = await req.json();
    const updatedUser = await prisma.user.update({
      where: { clerkId }, // Changed from 'id' to 'clerkId'
      data: body,
    });

    return NextResponse.json({ success: true, data: updatedUser });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update user" }, { status: 500 });
  }
}

// 📌 DELETE: Remove a user
export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const clerkId = url.searchParams.get('clerkId'); // Changed from 'id' to 'clerkId'

    if (!clerkId) {
      return NextResponse.json({ success: false, error: "Missing Clerk ID" }, { status: 400 });
    }

    await prisma.user.delete({ where: { clerkId } }); // Changed from 'id' to 'clerkId'

    return NextResponse.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to delete user" }, { status: 500 });
  }
}
