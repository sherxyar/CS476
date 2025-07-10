// app/api/auth/logout/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  (await cookies()).set({
    name: "session",
    value: "",                
    path: "/",
    expires: new Date(0),      
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  return NextResponse.json({ ok: true });
}
