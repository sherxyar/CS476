import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import "../styles/page.module.css"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Providers } from "./providers";
import { getServerSession } from "@/lib/auth-session";

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
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Call your getServerSession without parameters
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers session={session}>
          {children}
          <ToastContainer position="top-right" autoClose={2000} />
        </Providers>
      </body>
    </html>
  );
}

