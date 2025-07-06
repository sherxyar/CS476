import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { useSearchParams, useRouter } from "next/navigation";

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
    return NextResponse.json({ message: "Multi-factor authentication successful", user: { id: user.id, role: user.role } });
}