import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";          

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

  // Return success response so the client-side can sign in using NextAuth
  return NextResponse.json(
    { 
      message: "2FA successful",
      // Include the user's credentials for the client to use with NextAuth
      user: {
        id: mfa.user.id,
        email: mfa.user.email,
        accountRole: mfa.user.accountRole
      }
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}

