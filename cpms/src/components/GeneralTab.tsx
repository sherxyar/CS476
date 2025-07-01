"use client";
import { useState, useEffect } from "react";
import styles from "../styles/ProjectModal.module.css";
import type { Project } from "@/types/Project";

type Props = {
  project: Project;

  /* Parent will refresh once Project is saved*/
  onProjectUpdate: (project: Project) => void;

  /** From ProjectModal for/so this tab can report just its edits */
  registerChangeHandler: (getChanges: () => Partial<Project>) => void;
};

export default function GeneralTab({
  project,
  registerChangeHandler,
}: Props) {

  /*  Local state  */
  const [phase, setPhase] = useState(project.phase);

  /*  register change handler  */
  useEffect(() => {

    // Provide a function that ProjectModal will call at “Save Project” time
    const getChanges = (): Partial<Project> =>
      phase !== project.phase ? { phase } : {};

    registerChangeHandler(getChanges);

    // Re-register if phase or original value changes
  }, [phase, project.phase, registerChangeHandler]);

  /*  Render  */
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

          {/*  Phase (locally editable; saved later via Save Project which goes to Db)  */}
          <div className={styles.fieldGroup}>
            <label>Phase</label>
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
          </div>
        </div>
      </div>

      <div className={styles.divider}></div>

      <div className={styles.notesSection}>
        <div className={styles.fieldGroup}>
          <label>PM Notes</label>
          <div className={styles.fieldValue}>
            {project.pmNotesHistory?.length
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
