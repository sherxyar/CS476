import { NextResponse } from "next/server";

// Moved it to Client-side
export async function POST() {
  return NextResponse.json({ 
    ok: true,
  });
}
