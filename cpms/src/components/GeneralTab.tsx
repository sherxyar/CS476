
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
            {/* unassigned is needed for the case where no project manager is assigned */}
            {project.projectManager?.name ?? "Unassigned"}
          </div>
          </div>
        </div>

        <div className={styles.rightColumn}>
          <div className={styles.fieldGroup}>
            <label>Date Created</label>
            <div className={styles.fieldValue}>
              {new Date(project.dateCreated ?? "2000-01-01").toLocaleDateString("en-CA", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
              </div>
          </div>

          <div className={styles.fieldGroup}>
            <label>Last Updated</label>
            <div className={styles.fieldValue}>
              {project.lastUpdated || "January 01, 2000"}
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
            {project.pmNotes ||
              "Late materials - reach management as a form note"}
          </div>
          <button className={styles.viewAllButton}>View All</button>
        </div>
      </div>

      <div className={styles.divider}></div>

      <div className={styles.descriptionSection}>
        <div className={styles.fieldGroup}>
          <label>Project Description</label>
          <div className={styles.descriptionBox}>
            {project.description }
          </div>
        </div>
      </div>
    </div>
  );
}
