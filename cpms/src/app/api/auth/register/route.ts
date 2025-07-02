import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { hashPassword } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !name.trim()) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    if (!email || !email.trim()) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!regex.test(password)) {
      return NextResponse.json({ error: "Password does not required criteria" }, { status: 400 });
    }
    const isExistingUser = await prisma.user.findUnique({ where: { email } });

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: { name: name.trim(), email: email.trim(), hashedPassword },
    });

    return NextResponse.json({ user: { id: user.id, email: user.email } });
  }
  catch (error) {
    return NextResponse.json({ error: "Signup failed" }, { status: 500 });
  }
}
