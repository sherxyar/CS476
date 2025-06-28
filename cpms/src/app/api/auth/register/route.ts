import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  const { email, password } = await request.json();


  const hashed_password = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      email,
      hashed_password        
    },
  });

  return NextResponse.json({ user: { id: user.id, email: user.email } });
}
