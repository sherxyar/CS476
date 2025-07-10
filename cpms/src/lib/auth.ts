import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";

// Function to hash password
export async function hashPassword(password: string) {
    return await bcrypt.hash(password, 12);
}

// Function to compare user's input password with stored hash password
export async function comparePasswords(input_passwd: string, hashed_passwd: string) {
    return await bcrypt.compare(input_passwd, hashed_passwd);
}

export const authOptions = {
  session: { strategy: "jwt" },

  providers: [
    Credentials({
      credentials: {
        email:    { label: "Email",    type: "email",    required: true },
        password: { label: "Password", type: "password", required: true },
      },
      async authorize(creds) {
        const { email, password } = creds as { email: string; password: string };

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) throw new Error("No user with that email");

        const ok = await bcrypt.compare(password, user.hashedPassword);
        if (!ok) throw new Error("Bad password");

        return {
          id:          user.id.toString(),
          name:        user.name,
          email:       user.email,
          accountRole: user.accountRole,   
        };
      },
    }),
  ],

  callbacks: {

    async jwt({ token, user }) {
      if (user) {
        token.id          = user.id;
        token.accountRole = (user as any).accountRole;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id          = Number(token.id);
        session.user.accountRole = token.accountRole as string;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthOptions;
