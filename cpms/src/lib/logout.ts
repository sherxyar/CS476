"use client";

import { signOut } from "next-auth/react";

// This function properly logs out users from NextAuth
export async function logoutUser() {
  try {
    await fetch("/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    });
    
    await signOut({ callbackUrl: "/auth/login" });
    
    return { success: true };
  } catch (error) {
    console.error("Logout error:", error);
    return { success: false, error };
  }
}
