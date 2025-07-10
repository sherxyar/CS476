"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserCircle, LogOut } from "lucide-react";
import styles from "@/styles/UserMenu.module.css";

interface Session {
  id: number;
  email: string;
  role: string;
}

export default function UserMenu() {
  const [user, setUser] = useState<Session | null>(null);
  const [open, setOpen]   = useState(false);
  const router            = useRouter();

  /* Load current session */
  useEffect(() => {
    fetch("/api/auth/me", { credentials: "include", cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then(setUser)
      .catch(() => setUser(null));
  }, []);

  if (!user) return null;        

  return (
    <div className={styles.wrapper}>
      <button
        aria-label="User menu"
        onClick={() => setOpen((o) => !o)}
        className={styles.avatar}
      >
        <UserCircle size={24} aria-hidden />
      </button>

      {open && (
        <div className={styles.dropdown}>
          <span className={styles.email}>{user.email}</span>

          {//redirect
          }
          <button
            className={styles.logout}
            onClick={async () => {
              await fetch("/api/auth/logout", {
                method: "POST",
                credentials: "include",    
              });
              router.replace("/auth/login"); 
            }}
          >
            <LogOut size={16} aria-hidden />
            Log&nbsp;out
          </button>
        </div>
      )}
    </div>
  );
}
