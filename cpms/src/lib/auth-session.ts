import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";

export type Session =
  | { id: number; email: string; role: string }
  | null;


  interface SessionClaims extends JwtPayload {
  sub: string;         
  email: string;
  role: string;
}

export async function getServerSession(): Promise<Session> {
  const cookieStore = await cookies();          
  const raw = cookieStore.get("session")?.value;
  if (!raw) return null;

  try {
    const { sub, email, role } = jwt.verify(
      raw,
      process.env.JWT_SECRET!
    ) as SessionClaims;                       
    return { id: Number(sub), email, role };
  } catch {
    return null;                              
  }
}
