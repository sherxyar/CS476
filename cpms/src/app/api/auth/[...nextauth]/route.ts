import NextAuth from "next-auth";
import { getServerSession } from "@/lib/auth-session";   // <- your config (providers, callbacks, etc.)

const handler = NextAuth(getServerSession);

export { handler as GET, handler as POST };
