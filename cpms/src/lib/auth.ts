import bcrypt from "bcryptjs";
import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";        

// Function to hash password
export async function hashPassword(password: string) {
    return await bcrypt.hash(password, 12);
}

// Function to compare user's input password with stored hash password
export async function comparePasswords(input_passwd: string, hashed_passwd: string) {
    return  await bcrypt.compare(input_passwd, hashed_passwd);
}



export const authOptions = {
  session: { strategy: "jwt" },

  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email", required: true },
        password: { label: "Password", type: "password", required: true },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) throw new Error("No user");

        const valid = await bcrypt.compare(password, user.hashedPassword);
        if (!valid) throw new Error("Bad password");

        return {
          id: user.id.toString(),
          email: user.email,
          role: user.accountRole,   // ⭐ keep the role
        };
      },
    }),
  ],

  callbacks: {
    /** add custom fields into the JWT */
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },
    /** expose them to the client */
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
} satisfies NextAuthOptions;
