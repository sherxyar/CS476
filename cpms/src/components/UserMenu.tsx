"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserCircle, LogOut } from "lucide-react";
import styles from "@/styles/UserMenu.module.css";
import { useSession, signOut } from "next-auth/react";
import { logoutUser } from "@/lib/logout";

export default function UserMenu() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  if (!session?.user) return null;        

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
          <span className={styles.email}>{session.user.email}</span>

          <button
            className={styles.logout}
            onClick={async () => {
              await logoutUser();
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
