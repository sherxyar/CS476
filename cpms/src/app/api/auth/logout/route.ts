import { NextResponse } from "next/server";
import { signOut } from "next-auth/react";

// Moved it to Client-side
export async function POST() {
  return NextResponse.json({ 
    ok: true,
  });
}
