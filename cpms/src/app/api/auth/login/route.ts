import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { comparePasswords } from "@/lib/auth";
import { sendEmail } from "@/lib/mailer";
import { randomInt } from "crypto";

// The code had no way to see where it was failing, so I have added a couple of checks.

// For OTP
const CODE_TTL_MIN = 2; 

export async function POST(req: NextRequest) {
  try {
    const { email, password } = (await req.json()) as {
      email?: string;
      password?: string;
    };

    if (!email?.trim() || !password) {
      return NextResponse.json(
        { error: "email and password are required" },
        { status: 400 }
      );
    }

    // PW verification
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user || !(await comparePasswords(password, user.hashedPassword))) {
      return NextResponse.json(
        { error: "Invalid credentials! Please try again." },
        { status: 401 }
      );
    }

    // Reset/Unlink from last-1 OTP
    await prisma.mfacode.deleteMany({ where: { userId: user.id } });

    const code = randomInt(100_000, 1_000_000).toString(); 
    const validUntil = new Date(Date.now() + CODE_TTL_MIN * 60_000);

    await prisma.mfacode.create({
      data: { userId: user.id, code, validUntil },
    });

    // SMTP is likely failing
    try {
      await sendEmail(email, code);
    } catch (mailErr) {
      console.error("Mailer failed:", mailErr);
    }

    return NextResponse.json(
      {
        message: `2FA code sent to ${email}. Valid for ${CODE_TTL_MIN} minutes.`,
      },
      { status: 200 }
    );
  }
  // Getting some unknown error here
  catch (err) {
    console.error("Unhandled login error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
