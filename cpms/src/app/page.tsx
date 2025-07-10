import HomePageClient from "@/components/HomePageClient";
import { getServerSession } from "@/lib/auth-session"; 
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic"; 

export default async function Index() {
  const session = await getServerSession();     
  if (!session) redirect("/auth/login");         

  return <HomePageClient />;                     
}
