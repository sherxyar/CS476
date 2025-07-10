"use client";
import { useState, useEffect } from "react";
import styles from "../styles/ProjectModal.module.css";
import type { Project } from "@/types/Project";
import NotesModal from "./NotesModal";
import { useSession } from "next-auth/react";



declare module "next-auth" {
  interface Session {
    user?: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      accountRole?: string | null;
    };
  }
}

type Props = {
  project: Project;
  onProjectUpdate: (project: Project) => void;
  registerChangeHandler: (getChanges: () => Partial<Project>) => void;
};

export default function GeneralTab({
  project,
  onProjectUpdate,
  registerChangeHandler,
}: Props) {
  const [phase, setPhase] = useState(project.phase);
  const [title, setTitle] = useState(project.title);
  const [description, setDescription] = useState(project.description);

  // this is for PM notes history
  const [showAll, setShowAll] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [noteDraft, setNoteDraft] = useState("");

  // Add state for current user
  const [currentUser, setCurrentUser] = useState<{ id: number; name: string; email: string } | null>(null);
  const [note, setNote] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    async function checkAdmin() {
      try {
        const res = await fetch("/api/auth/me", { cache: "no-store" });
        if (res.ok) {
          const userData = await res.json();
          setIsAdmin(userData?.accountRole === "ADMIN");
        }
      } catch (err) {
        console.error("Failed to check admin status:", err);
      }
    }

    checkAdmin();
  }, []);

  useEffect(() => {
    const getChanges = (): Partial<Project> => {
      const changes: Partial<Project> = {};

      if (phase !== project.phase) changes.phase = phase;
      if (title !== project.title) changes.title = title;
      if (description !== project.description) changes.description = description;

      return changes;
    };

    registerChangeHandler(getChanges);
  }, [phase, title, description, project, registerChangeHandler]);

  /*  Handlers  */
  const handleAddNoteClick = () => setShowAdd(true);
  const handleCloseModal = () => setShowAll(false);

  const handleSaveNote = async () => {
    const note = noteDraft.trim();
    if (!note) return;

    // Use currentUser id if available, fallback to 1
    const userId = currentUser?.id ?? 1;

    try {
      const res = await fetch(`/api/projects/${project.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ note, userId }),
      });
      if (!res.ok) throw new Error(await res.text());

      /*  Updated project with fresh note history  */
      const updated: Project = await res.json();
      onProjectUpdate(updated);

      setNoteDraft("");
      setShowAdd(false);
    } catch (err) {
      console.error("Add-note failed:", err);
      alert("Couldnt save note - please try again.");
    }
  };

  const handleViewAll = () => setShowAll(true);


  /*  render  */
  return (
    <div className={styles.generalContent}>
      {/*  General details  */}
      <div className={styles.topSection}>
        <div className={styles.leftColumn}>
          <div className={styles.fieldGroup}>
            <label>Project ID</label>
            <div className={styles.fieldValue}>{project.projectID ?? "N/A"}</div>
          </div>

          <div className={styles.fieldGroup}>
            <label>Title</label>
            {isAdmin ? (
              <input
                type="text"
                className={styles.formInput}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            ) : (
              <div className={styles.fieldValue}>{project.title}</div>
            )}
          </div>

          <div className={styles.fieldGroup}>
            <label>Project Manager</label>
            <div className={styles.fieldValue}>
              {project.projectManager?.name ?? "Unassigned"}
            </div>
          </div>
        </div>

        <div className={styles.rightColumn}>
          <div className={styles.fieldGroup}>
            <label>Date Created</label>
            <div className={styles.fieldValue}>
              {new Date(project.dateCreated).toLocaleDateString("en-CA", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <label>Last Updated</label>
            <div className={styles.fieldValue}>
              {project.lastUpdated
                ? new Date(project.lastUpdated).toLocaleDateString("en-CA", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
                : "N/A"}
            </div>
          </div>

          {/* Phase selector (staged for Save) */}
          <div className={styles.fieldGroup}>
            <label>Phase</label>
            {isAdmin ? (
              <select
                className={styles.formSelect}
                value={phase}
                onChange={(e) => setPhase(e.target.value)}
              >
                <option value="Planning">Planning</option>
                <option value="Design">Design</option>
                <option value="Construction">Construction</option>
                <option value="Closed">Closed</option>
              </select>
            ) : (
              <div className={styles.fieldValue}>{phase}</div>
            )}
          </div>
        </div>
      </div>

      <div className={styles.divider}></div>

      {/*  PM Notes  */}

      <div className={styles.notesSection}>
        <div className={styles.fieldGroup}>
          <label>PM Notes</label>
          <div className={styles.fieldValue}>
            {project.pmNotesHistory?.length
              ? project.pmNotesHistory[0].note
              : "No notes available."}
          </div>
          <div className={styles.actionRow}>
            <button
              type="button"
              className={styles.addNoteButton}
              onClick={handleAddNoteClick}
            >
              Add a note
            </button>
            <button
              type="button"
              className={styles.viewAllButton}
              onClick={handleViewAll}
              disabled={!project.pmNotesHistory?.length}
            >
              View All
            </button>
          </div>
        </div>

        {/*  Inline add-note dialog  */}
        {showAdd && (
          <div className={styles.addNoteDialog}>
            <textarea
              className={styles.noteTextarea}
              value={noteDraft}
              onChange={(e) => setNoteDraft(e.target.value)}
              placeholder="Type your note here…"
            />
            <div className={styles.dialogButtons}>
              <button onClick={handleSaveNote} className={styles.addNoteButton}>Save note</button>
              <button onClick={() => setShowAdd(false)} className={styles.cancelNoteButton}>Cancel</button>
            </div>
          </div>
        )}

        {showAll && (
          <NotesModal
            notes={project.pmNotesHistory ?? []}
            onClose={handleCloseModal}
          />
        )}
      </div>

      <div className={styles.divider}></div>

      {/*  description  */}
      <div className={styles.descriptionSection}>
        <div className={styles.fieldGroup}>
          <label>Project Description</label>
          {isAdmin ? (
            <textarea
              className={styles.formTextarea}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          ) : (
            <div className={styles.descriptionBox}>{project.description}</div>
          )}
        </div>
      </div>
    </div>
  );
}
