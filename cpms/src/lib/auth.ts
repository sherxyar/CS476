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
  pages: {
    signIn: '/auth/login',
  },
  debug: process.env.NODE_ENV === 'development',

  providers: [
    Credentials({
      credentials: {
        email:    { label: "Email",    type: "email",    required: true },
        password: { label: "Password", type: "password", required: true },
      },
      async authorize(creds) {
        if (!creds) {
          console.error("No credentials provided");
          return null;
        }

        const { email, password } = creds as { email: string; password: string };
        console.log(`Auth attempt for email: ${email}`);

        // Check if we're in the 2FA stage by using the MFA code
        // If the password is a 6-digit code, we should check if it's a valid MFA code
        if (password.length === 6 && /^\d+$/.test(password)) {
          console.log("Handling MFA code login");
          
          // For MFA authentication, we trust that the code was already verified in the mfa-auth API
          // We can just fetch the user directly here
          const user = await prisma.user.findUnique({ 
            where: { email: email.toLowerCase() } 
          });
          
          if (!user) {
            console.error("MFA: User not found");
            throw new Error("User not found");
          }
          
          console.log(`MFA login successful for user ${user.id}`);
          
          return {
            id:          user.id.toString(),
            name:        user.name,
            email:       user.email,
            accountRole: user.accountRole,   
          };
        }
        
        // Normal login flow for direct NextAuth calls
        console.log("Handling direct credentials login");
        const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
        if (!user) {
          console.error("Direct login: User not found");
          throw new Error("No user with that email");
        }

        const ok = await bcrypt.compare(password, user.hashedPassword);
        if (!ok) {
          console.error("Direct login: Password mismatch");
          throw new Error("Bad password");
        }

        console.log(`Direct login successful for user ${user.id}`);
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
    async redirect({ url, baseUrl }) {
      // If url is just a path, prepend the baseUrl
      if (url.startsWith('/')) {
        return `${baseUrl}${url}`;
      }
      // If url is an absolute URL that belongs to our site
      else if (new URL(url).origin === baseUrl) {
        return url;
      }
      // Default to the homepage
      return baseUrl;
    },
    
    async jwt({ token, user }) {
      if (user) {
        console.log("JWT callback - adding user data to token:", user.id);
        token.id          = user.id;
        token.accountRole = user && 'accountRole' in user ? user.accountRole as string : undefined;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        console.log("Session callback - populating session with token data:", token.id);
        session.user.id          = Number(token.id);
        session.user.accountRole = token.accountRole as string;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthOptions;
