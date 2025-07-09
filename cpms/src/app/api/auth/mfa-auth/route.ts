import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const COOKIE_NAME = "session";
const COOKIE_TTL = 60 * 60 * 2; 

export async function POST(req: Request) {
  const { email, code } = await req.json();
  if (!email?.trim() || !code?.trim()) {
    return NextResponse.json({ error: "email and code required" }, { status: 400 });
  }

  const mfa = await prisma.mfacode.findFirst({
    where: {
      user: { email },
      code,
      validUntil: { gt: new Date() },
    },
    include: { user: true },
  });

  if (!mfa) {
    return NextResponse.json({ error: "Code is invalid or expired." }, { status: 403 });
  }

  await prisma.mfacode.delete({ where: { id: mfa.id } });

// JWT token generation - From online example

   const token = jwt.sign(
    { sub: mfa.user.id, email: mfa.user.email, role: mfa.user.accountRole },
    process.env.JWT_SECRET!,
    { expiresIn: COOKIE_TTL }
  );

  const cookieStore = await cookies();
  cookieStore.set({
    name: COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_TTL,
  });

  return NextResponse.json({ message: "2FA successful" });
}
