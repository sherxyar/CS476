"use client";
import { useState, useEffect } from "react";
import styles from "../styles/ProjectModal.module.css";
import type { Project } from "@/types/Project";
import NotesModal from "./NotesModal";
import { useSession, signIn } from "next-auth/react";

export function DebugSession() {
  const { data: session, status } = useSession();
  if (status === "loading") return null;
  if (!session) return <button onClick={() => signIn()}>Sign in</button>;

  return <pre>{JSON.stringify(session, null, 2)}</pre>;
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
  const [projectManagerId, setProjectManagerId] = useState<number | null>(project.projectManagerId ?? null);
  const [projectManagers, setProjectManagers] = useState<{ id: number; name: string; email: string }[]>([]);
  DebugSession();
  // this is for PM notes history
  const [showAll, setShowAll] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [noteDraft, setNoteDraft] = useState("");
  // Add state for current user
  const [currentUser, setCurrentUser] = useState<{ id: number; name: string; email: string } | null>(null);
  const { data: session } = useSession();
  
  // Get user role directly from the session
  const userRole = session?.user?.accountRole || '';
  const isAdmin = userRole === 'ADMIN';
  const isContributor = userRole === 'CONTRIBUTOR';
  const canEdit = !isContributor;

  useEffect(() => {
    async function fetchCurrentUser() {
      try {
        const res = await fetch("/api/auth/me", { cache: "no-store" });
        if (res.ok) {
          const userData = await res.json();
          setCurrentUser(userData);
        }
      } catch (err) {
        console.error("Failed to fetch user data:", err);
      }
    }

    fetchCurrentUser();
  }, []);

  useEffect(() => {
    async function fetchProjectManagers() {
      try {
        const res = await fetch("/api/users?managersOnly=true");
        if (res.ok) {
          const managers = await res.json();
          setProjectManagers(managers);
        }
      } catch (err) {
        console.error("Failed to fetch project managers:", err);
      }
    }

    fetchProjectManagers();
  }, []);

  useEffect(() => {
    setPhase(project.phase);
    setTitle(project.title);
    setDescription(project.description);
    setProjectManagerId(project.projectManagerId ?? null);
  }, [project]);

  useEffect(() => {
    if (canEdit) {
      const getChanges = (): Partial<Project> => {
        const changes: Partial<Project> = {};
  
        if (phase !== project.phase) changes.phase = phase;
        if (title !== project.title) changes.title = title;
        if (description !== project.description) changes.description = description;
        if (projectManagerId !== (project.projectManagerId ?? null)) {
          changes.projectManagerId = projectManagerId ?? undefined;
        }
  
        return changes;
      };
  
      registerChangeHandler(getChanges);
    }
  }, [phase, title, description, projectManagerId, project, registerChangeHandler, canEdit]);

  DebugSession();
  
  const handleAddNoteClick = () => {
    // Only allow non-collaborators to add notes
    if (canEdit) {
      setShowAdd(true);
    }
  };
  
  const handleCloseModal = () => setShowAll(false);

  const handleSaveNote = async () => {
    // Double-check that user can edit before saving
    if (!canEdit) {
      alert("You don't have permission to add notes.");
      return;
    }
    
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
      alert("Couldn't save note - please try again.");
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
            {canEdit ? (
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
            {canEdit ? (
              <select
                className={styles.formSelect}
                value={projectManagerId || ""}
                onChange={(e) => setProjectManagerId(e.target.value ? Number(e.target.value) : null)}
              >
                <option value="">Unassigned</option>
                {projectManagers.map((manager) => (
                  <option key={manager.id} value={manager.id}>
                    {manager.name} ({manager.email})
                  </option>
                ))}
              </select>
            ) : (
              <div className={styles.fieldValue}>
                {project.projectManager?.name ?? "Unassigned"}
              </div>
            )}
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

            {canEdit ? (
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
            {canEdit && (
              <button
                type="button"
                className={styles.addNoteButton}
                onClick={handleAddNoteClick}
              >
                Add a note
              </button>
            )}
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
          {canEdit ? (
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
