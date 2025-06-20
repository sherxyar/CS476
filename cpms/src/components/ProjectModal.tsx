"use client";
import { useState, useEffect } from "react";
import styles from "@/styles/ProjectModal.module.css";
import type { Project, ProjectFinancialsLite } from "@/types/Project";
import GeneralTab from "./GeneralTab";
import FinancialsTab from "./FinancialsTab";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [activeTab, setActiveTab] = useState<"general" | "financials">("general");
  // now typed as the “lite” interface (plus null for “no data” & undefined for “loading”)
  const [financials, setFinancials] = useState<ProjectFinancialsLite | null | undefined>(undefined);

  useEffect(() => {
    if (activeTab === "financials") {
      (async () => {
        setFinancials(undefined); // back into “loading” state
        try {
          const res = await fetch(`/api/projects/${project.id}/financials`);
          if (!res.ok) throw new Error("Failed to load financials");
          // cast to the Lite version
          const data = (await res.json()) as ProjectFinancialsLite;
          setFinancials(data);
        } catch (err) {
          console.error(err);
          setFinancials(null); // indicates error/no data
        }
      })();
    }
  }, [activeTab, project.id]);

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <header className={styles.header}>
          <h2>{project.title}</h2>
          <button onClick={onClose} className={styles.closeButton}>✖</button>
        </header>

        <nav className={styles.tabs}>
          <button
            className={activeTab === "general" ? styles.activeTab : ""}
            onClick={() => setActiveTab("general")}
          >
            General
          </button>
          <button
            className={activeTab === "financials" ? styles.activeTab : ""}
            onClick={() => setActiveTab("financials")}
          >
            Financials
          </button>
        </nav>

        <section className={styles.content}>
          {activeTab === "general" && <GeneralTab project={project} />}
          {activeTab === "financials" && (
            <FinancialsTab
              projectId={project.id}
              // signature should accept ProjectFinancialsLite | null | undefined
              projectFinancials={financials}
            />
          )}
        </section>
      </div>
    </div>
  );
}
