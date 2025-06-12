
"use client";
import styles from "../styles/ProjectModal.module.css";

type Project = {
  id: string;
  title: string;
  phase: string;
  projectmanager: string;
  dateCreated?: string;
  lastUpdated?: string;
  status?: string;
  description?: string;
  pmNotes?: string;
};

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
            <div className={styles.fieldValue}>{project.id}</div>
          </div>

          <div className={styles.fieldGroup}>
            <label>Title</label>
            <div className={styles.fieldValue}>{project.title}</div>
          </div>

          <div className={styles.fieldGroup}>
            <label>Project Manager</label>
            <div className={styles.fieldValue}>{project.projectmanager}</div>
          </div>
        </div>

        <div className={styles.rightColumn}>
          <div className={styles.fieldGroup}>
            <label>Date Created</label>
            <div className={styles.fieldValue}>{"01 Jan 2025"}</div>
          </div>

          <div className={styles.fieldGroup}>
            <label>Last Updated</label>
            <div className={styles.fieldValue}>
              {project.lastUpdated || "January 12, 2025"}
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <label>Status</label>
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
            {project.description ||
              "This project involves comprehensive pavement repair work for Regina School including surface restoration, crack sealing, and drainage improvements to ensure safe access for students and staff."}
          </div>
        </div>
      </div>
    </div>
  );
}
