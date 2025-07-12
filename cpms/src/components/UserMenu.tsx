"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { UserCircle, LogOut, Settings, User, Bell } from "lucide-react";
import styles from "@/styles/UserMenu.module.css";
import { useSession, signOut } from "next-auth/react";
import { logoutUser } from "@/lib/logout";

export default function UserMenu() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  
  // Close the menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!session?.user) return null;        

  return (
    <div className={styles.wrapper} ref={menuRef}>
      <button
        aria-label="User menu"
        onClick={() => setOpen((o) => !o)}
        className={styles.avatar}
      >
        <UserCircle size={20} aria-hidden />
      </button>

      {open && (
        <div className={styles.dropdown}>
          <div className={styles.userInfo}>
            <span className={styles.userName}>{session.user.name || 'User'}</span>
            <span className={styles.email}>{session.user.email}</span>
          </div>
         {/* FOR FUTURE DEVELOPMENT - outside project
          <div className={styles.menuItem}>
            <User size={16} />
            <span>Profile</span>
          </div>
          
          <div className={styles.menuItem}>
            <Bell size={16} />
            <span>Notifications</span>
          </div>
          
          <div className={styles.menuItem}>
            <Settings size={16} />
            <span>Settings</span>
          </div>
 */}  
          
          <button
            className={styles.logout}
            onClick={async () => {
              await logoutUser();
            }}
          >
            <LogOut size={16} aria-hidden />
            Log out
          </button>
        </div>
      )}
    </div>
  );
}
