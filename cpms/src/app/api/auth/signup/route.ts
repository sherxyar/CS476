import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth";
import { Prisma } from "@prisma/client";

// API accepts only these roles
const ALLOWED_ROLES = ["ADMIN", "PROJECT_MANAGER", "COLLABORATOR"] as const;
type AccountRole = (typeof ALLOWED_ROLES)[number];

interface SignupPayload {
  name?: string;
  email?: string;
  password?: string;
  accountRole?: string;
}

interface UniqueConstraintMeta {
  target?: string[]; // e.g. ["User_email_key"]
}

export async function POST(req: NextRequest) {
  try {
    const body: SignupPayload = await req.json();
    const { name, email, password, accountRole } = body;

    if (!name?.trim()) {
      return NextResponse.json({ error: "name is required" }, { status: 400 });
    }
    if (!email?.trim()) {
      return NextResponse.json({ error: "email is required" }, { status: 400 });
    }
    if (!password) {
      return NextResponse.json({ error: "password is required" }, { status: 400 });
    }
    if (!accountRole) {
      return NextResponse.json({ error: "role is required" }, { status: 400 });
    }
    if (!ALLOWED_ROLES.includes(accountRole as AccountRole)) {
      return NextResponse.json(
        { error: `role must be one of ${ALLOWED_ROLES.join(", ")}` },
        { status: 400 }
      );
    }

    // create user in db
    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        hashedPassword,
        accountRole: accountRole as AccountRole,
      },
    });

    return NextResponse.json(
      {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          accountRole: user.accountRole,
        },
      },
      { status: 201 }
    );
  } catch (err) {
    // check for identical email
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2002" &&
      (err.meta as UniqueConstraintMeta | undefined)?.target?.includes("email")
    ) {
      return NextResponse.json(
        { error: "A user with that e-mail already exists." },
        { status: 409 }
      );
    }

    console.error("Signup error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
