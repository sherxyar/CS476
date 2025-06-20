"use client";
import styles from "../styles/ProjectModal.module.css";
import type { Project } from "@/types/Project";
import { useState } from "react";

type Props = {
  project: Project;
  onProjectUpdate: (project: Project) => void;

};

export default function GeneralTab({ project, onProjectUpdate }: Props) {


  // Dont want to send all project data only the fields that are edited/changed.
  const [currentPhase, setCurrentPhase] = useState(project.phase);
  const [isSaving, setIsSaving] = useState(false);

  const handlePhaseChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPhase = e.target.value;
    setCurrentPhase(newPhase);
    setIsSaving(true);

    try {
      await fetch(`/api/projects/${project.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phase: newPhase }),
      });


      // Re-fetch updated project data
      const res = await fetch(`/api/projects/${project.id}`);
      if (res.ok) {
        const updated = await res.json();
        onProjectUpdate(updated);
      }

    } catch (err) {
      console.error("Failed to update phase:", err);
      alert("Error saving phase");
    }

    setIsSaving(false);
  };


  return (
    <div className={styles.generalContent}>
      <div className={styles.topSection}>
        <div className={styles.leftColumn}>
          <div className={styles.fieldGroup}>
            <label>Project ID</label>
            <div className={styles.fieldValue}>{project.projectID ?? "N/A"}</div>
          </div>

          <div className={styles.fieldGroup}>
            <label>Title</label>
            <div className={styles.fieldValue}>{project.title}</div>
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

          <div className={styles.fieldGroup}>
            <label>Phase</label>
            <select
              className={styles.formSelect}
              value={currentPhase}
              onChange={handlePhaseChange}
              disabled={isSaving}
            >
              <option value="Planning">Planning</option>
              <option value="Design">Design</option>
              <option value="Construction">Construction</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
        </div>
      </div>

      <div className={styles.divider}></div>

      <div className={styles.notesSection}>
        <div className={styles.fieldGroup}>
          <label>PM Notes</label>
          <div className={styles.fieldValue}>
            {project.pmNotesHistory?.length > 0
              ? project.pmNotesHistory[0].note
              : "No notes available."}
          </div>
          <button className={styles.viewAllButton}>View All</button>
        </div>
      </div>

      <div className={styles.divider}></div>

      <div className={styles.descriptionSection}>
        <div className={styles.fieldGroup}>
          <label>Project Description</label>
          <div className={styles.descriptionBox}>{project.description}</div>
        </div>
      </div>
    </div>
  );
}
