import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { email, code } = await req.json();
    const user = await prisma.user.findUnique({ where: { email }, include: { mfaCodes: true } });
    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const isValidCode = user.mfaCodes.find((current_session: { code: string; validUntil: Date }) => current_session.code === code && new Date(current_session.validUntil) > new Date());
    if (!isValidCode) {
        return NextResponse.json({ error: "Code is invalid or expired" }, { status: 403 });
    }
    const res = NextResponse.json({ message: "2FA successful", user: { id: user.id, role: user.role } });
    res.cookies.set("user", JSON.stringify({ id: user.id, role: user.role }), { path: "/", httpOnly: true });
    return res;
}