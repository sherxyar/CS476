import HomePageClient from "@/components/HomePageClient";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic"; 

export default async function Index() {
  const session = await getServerSession(authOptions);     
  if (!session) redirect("/auth/login");         

  return <HomePageClient />;                     
}
