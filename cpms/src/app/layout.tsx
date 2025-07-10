import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import "../styles/page.module.css"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Providers } from "./providers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CPMS",
  description: "Construction Project Management System",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions); 

  return (
    <html lang="en">
      <body>
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  );
}

