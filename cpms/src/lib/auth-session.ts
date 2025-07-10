import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export type Session =
  | { id: number; email: string; role: string }
  | null;

export async function getServerSession(): Promise<Session> {
  const cookieStore = await cookies();
  const raw = cookieStore.get("session")?.value;
  if (!raw) return null;

  try {
    const { sub, email, role } = jwt.verify(
      raw,
      process.env.JWT_SECRET!
    ) as any;
    return { id: Number(sub), email, role };
  } catch {
    return null;
  }
}
