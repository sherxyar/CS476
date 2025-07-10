"use client";
import styles from "../styles/NotesModal.module.css";
import type { PMNote } from "@/types/Project";
import { useEffect, useState } from "react";

type Props = {
    notes: PMNote[];
    onClose: () => void;
};

export default function NotesModal({ notes, onClose }: Props) {
    // Add state for current user to show for new notes
    const [currentUser, setCurrentUser] = useState<{id: number; name: string} | null>(null);
    
    useEffect(() => {
        async function fetchCurrentUser() {
            try {
                const res = await fetch("/api/auth/me", { cache: "no-store" });
                if (res.ok) {
                    const userData = await res.json();
                    setCurrentUser(userData);
                }
            } catch (err) {
                console.error("Failed to fetch current user:", err);
            }
        }
        
        fetchCurrentUser();
    }, []);
    
    return (
        <div className={styles.backdrop}>
            <div className={styles.modalCard}>
                <div className={styles.header}>
                    <h2>All PM Notes</h2>
                    <button onClick={onClose} aria-label="Close">✕</button>
                </div>

                {notes.length ? (
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Note</th>
                                <th>Author</th>
                            </tr>
                        </thead>
                        <tbody>
                            {notes.map((note) => (
                                <tr key={note.id}>
                                    <td>
                                        {new Date(note.createdAt).toLocaleDateString("en-CA", {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                        })}
                                    </td>
                                    <td>{note.note}</td>
                                    <td>
                                        {typeof note.author === "object" && note.author !== null && typeof note.author.name === "string"
                                            ? note.author.name
                                            : (currentUser && note.userId === currentUser.id)
                                                ? currentUser.name 
                                                : (typeof note.author === "string" ? note.author : "—")}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No notes available.</p>
                )}
            </div>
        </div>
    );
}
