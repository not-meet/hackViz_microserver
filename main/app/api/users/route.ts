"use server"
import { NextResponse } from "next/server";
import { BloodGroup, Gender, PrismaClient } from "@prisma/client";
import { Record } from "@prisma/client/runtime/library";

const prisma = new PrismaClient();

// 📌 GET: Fetch all users
export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json({ success: true, data: users });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch users" }, { status: 500 });
  }
}

// 📌 POST: Create a new user
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 🔹 Convert blood group format to match Prisma enum
    const bloodGroupMap: Record<string, BloodGroup> = {
      "O+": BloodGroup.O_POS, "O-": BloodGroup.O_NEG,
      "A+": BloodGroup.A_POS, "A-": BloodGroup.A_NEG,
      "B+": BloodGroup.B_POS, "B-": BloodGroup.B_NEG,
      "AB+": BloodGroup.AB_POS, "AB-": BloodGroup.AB_NEG
    };

    if (!bloodGroupMap[body.bloodGrp]) {
      return NextResponse.json({ success: false, error: "Invalid blood group" }, { status: 400 });
    }

    // 🔹 Convert gender to match Prisma enum
    const formattedSex = body.sex.charAt(0).toUpperCase() + body.sex.slice(1).toLowerCase(); // Capitalize first letter

    if (!Object.values(Gender).includes(formattedSex as Gender)) {
      return NextResponse.json({ success: false, error: "Invalid gender" }, { status: 400 });
    }

    const newUser = await prisma.user.create({
      data: {
        name: body.name,
        age: body.age,
        bloodGroup: bloodGroupMap[body.bloodGrp], // Convert blood group
        sex: formattedSex as Gender, // Convert gender
        address: body.address,
      }
    });

    return NextResponse.json({ success: true, data: newUser }, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ success: false, error: "Failed to create user" }, { status: 500 });
  }
}
