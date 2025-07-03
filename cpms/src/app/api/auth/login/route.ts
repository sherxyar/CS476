import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { comparePasswords } from "@/lib/auth";
import { sendEmail } from "@/lib/mailer";
import { compare } from "bcryptjs";

function generateCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();
        if (!email || !password) {
            return NextResponse.json({ error: "Email and Password required" }, { status: 400 });
        }
        const user = await prisma.user.findUnique({ where: { email } })
        if (!user || !(await compare(password, user.hashedPassword))) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }
        const code = generateCode();
        const validUntil = new Date(Date.now() + 600000);
        await prisma.MFAcode.create({
            data: {
                userId: user.id,
                code,
                validUntil,
            }
        });
        await sendEmail(email, code);
        return NextResponse.json({ message: "Two-factor Authentication Code sent to your email", userId: user.id });
    } catch (error) {
        return NextResponse.json({ error: "Login failed" }, { status: 500 });
    }
}