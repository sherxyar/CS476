import { prisma } from "@/lib/prisma";
import { comparePasswords } from "@/lib/auth";
import { sendEmail } from "@/lib/mailer";
import { NextResponse } from "next/server";
import { send } from "process";

export async function POST(req: Request) {
    const { email, password } = await req.json();
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await comparePasswords(password, user.hashedPassword))) {
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }
    // generate random 6-digit code
    const code = Math.floor(Math.random() * 1000000).toString();
    // code will be valid until 1000(ms/sec) * 60(sec/min) * 2 = 2 minutes
    const validUntil = new Date(Date.now() + 1000 * 60 * 2);
    await prisma.Mfacode.create({ data: { userId: user.id, code, validUntil } });
    await sendEmail(email, code);
    return NextResponse.json({message: `2FA code sent to ${email}. It is valid for the next 2 minutes.`});
}