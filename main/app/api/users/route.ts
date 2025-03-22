"use server"
import { NextResponse, NextRequest } from "next/server";
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
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.clerkId) {
      return NextResponse.json({ success: false, error: "Missing Clerk ID" }, { status: 400 });
    }

    // Create a data object with required fields
    const userData: any = {
      clerkId: body.clerkId,
      name: body.name,
    };

    // Add optional fields if they exist in the request
    if (body.bloodGrp) {
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
      userData.bloodGroup = bloodGroupMap[body.bloodGrp];
    }

    if (body.sex) {
      // 🔹 Convert gender to match Prisma enum
      const formattedSex = body.sex.charAt(0).toUpperCase() + body.sex.slice(1).toLowerCase();
      if (!Object.values(Gender).includes(formattedSex as Gender)) {
        return NextResponse.json({ success: false, error: "Invalid gender" }, { status: 400 });
      }
      userData.sex = formattedSex as Gender;
    }

    if (body.age !== undefined) {
      userData.age = body.age;
    }

    if (body.address) {
      userData.address = body.address;
    }

    // Handle metadata if provided
    if (body.metadata) {
      userData.metadata = body.metadata;
    }

    const existingUser = await prisma.user.findUnique({
      where: { clerkId: body.clerkId },
    });

    if (existingUser) {
      return NextResponse.json({ success: false, error: "User with this Clerk ID already exists" }, { status: 409 });
    }

    const newUser = await prisma.user.create({
      data: userData
    });

    return NextResponse.json({ success: true, data: newUser }, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ success: false, error: "Failed to create user" }, { status: 500 });
  }
}
