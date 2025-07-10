import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";          

const COOKIE_NAME      = "session";
const COOKIE_TTL_SEC   = 60 * 60 * 2;           
export async function POST(req: Request) {
  const { email = "", code = "" } = await req.json();

  if (!email.trim() || !code.trim()) {
    return NextResponse.json(
      { error: "email and code required" },
      { status: 400, headers: { "Cache-Control": "no-store" } }
    );
  }

  const mfa = await prisma.mfacode.findFirst({
    where: {
      code,
      user: { email: email.toLowerCase() },
      /* 1-min grace in case client clock is slow */
      validUntil: { gt: new Date(Date.now() - 60_000) },
    },
    include: { user: true },
  });

  if (!mfa) {
    return NextResponse.json(
      { error: "Code is invalid or expired." },
      { status: 403, headers: { "Cache-Control": "no-store" } }
    );
  }

  await prisma.mfacode.delete({ where: { id: mfa.id } });

  const token = jwt.sign(
    {
      sub: String(mfa.user.id),
      email: mfa.user.email,
      role: mfa.user.accountRole,
    },
    process.env.JWT_SECRET!,                 
    { expiresIn: COOKIE_TTL_SEC }
  );

  (await cookies()).set({
    name:       COOKIE_NAME,
    value:      token,
    httpOnly:   true,
    secure:     process.env.NODE_ENV === "production",
    sameSite:   "lax",
    path:       "/",
    maxAge:     COOKIE_TTL_SEC,
  });

  return NextResponse.json(
    { message: "2FA successful" },
    { headers: { "Cache-Control": "no-store" } }
  );
}
