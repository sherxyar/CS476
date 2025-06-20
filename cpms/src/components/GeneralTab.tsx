// This component renders the general information about a project, 
// including its ID, title, project manager, dates, phase, PM notes, and description.

"use client";
import styles from "../styles/ProjectModal.module.css";
import type { Project } from "@/types/Project";

type Props = {
  project: Project;
};

export default function GeneralTab({ project }: Props) {
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
            <div className={styles.fieldValue}>{project.phase}</div>
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
