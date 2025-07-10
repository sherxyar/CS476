"use client";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export function Providers({
  children,
  session,
}: {
  children: ReactNode;
  session: any;          // next-auth Session | null
}) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
