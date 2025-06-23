import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword, complexPasswordCheck } from "@/lib/auth";

// Function with API route handling to run when register encounters a POST request
export async function POST(req: Request) {
    // read email and password sent via POST Request req from frontend
    const { email, password } = await req.json();

    // password complexity check
    if (!complexPasswordCheck(password)) {
        return NextResponse.json({ error: 'Entered password does not match the password criteria' }, { status: 400 });
    }

    const hashed_password = await hashPassword(password); // hash password
    // create new user record in SQLite database using Prisma
    const user = await prisma.user.create({
        data: { email, password: hashed_password }
    });
    // return user id (auto generated from schema.prisma) and email
    return NextResponse.json({ user: { id: user.id, email: user.email } });
}
