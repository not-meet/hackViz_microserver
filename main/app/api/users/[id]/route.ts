"use server"

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url); // Create a URL object from the request URL
    const id = url.searchParams.get('id'); // Get the 'id' parameter from the query string

    if (!id) {
      return NextResponse.json({ success: false, error: "Missing ID" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id },
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
    const url = new URL(req.url); // Create a URL object from the request URL
    const id = url.searchParams.get('id'); // Get the 'id' parameter from the query string

    if (!id) {
      return NextResponse.json({ success: false, error: "Missing ID" }, { status: 400 });
    }

    const body = await req.json();
    const updatedUser = await prisma.user.update({
      where: { id },
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
    const url = new URL(req.url); // Create a URL object from the request URL
    const id = url.searchParams.get('id'); // Get the 'id' parameter from the query string

    if (!id) {
      return NextResponse.json({ success: false, error: "Missing ID" }, { status: 400 });
    }

    await prisma.user.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to delete user" }, { status: 500 });
  }
}
