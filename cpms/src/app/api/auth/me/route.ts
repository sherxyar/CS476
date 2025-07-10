import { NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth-session";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";         

export async function GET() {
  const session = await getServerSession();
  
  // If there's no session, return as is
  if (!session) {
    return NextResponse.json(session, {
      headers: { "Cache-Control": "no-store" },
    });
  }
  
  // Get the user's full profile including name
  const user = await prisma.user.findUnique({
    where: { id: session.id },
    select: {
      id: true,
      name: true,
      email: true,
      accountRole: true,
    },
  });
  
  return NextResponse.json(user || session, {
    headers: { "Cache-Control": "no-store" },
  });
}
