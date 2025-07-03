"use client";
import styles from "../styles/NotesModal.module.css";
import type { PMNote } from "@/types/Project";

type Props = {
    notes: PMNote[];
    onClose: () => void;
};

export default function NotesModal({ notes, onClose }: Props) {
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
                                    {typeof note.author === "object" && note.author !== null
                                        ? note.author.name
                                        : note.author ?? "—"}
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
