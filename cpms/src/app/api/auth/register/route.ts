import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { hashPassword } from "@/lib/auth";

export async function POST(req: Request) {
  const { name, email, password, role } = await req.json();

  if (!name) {
    return NextResponse.json({ error: "name is required" }, { status: 400 });
  }
  if (!email) {
    return NextResponse.json({ error: "email is required" }, { status: 400 });
  }
  if (!password) {
    return NextResponse.json({ error: "password is required" }, { status: 400 });
  }
  if (!role) {
    return NextResponse.json({ error: "role is required" }, { status: 400 });
  }

  const hashedPassword = await hashPassword(password);

  const user = await prisma.user.create({
    data: { name, email, hashedPassword, role },
  });

  return NextResponse.json({ user: { id: user.id, email: user.email } });
}
