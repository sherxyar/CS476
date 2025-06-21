// ProjectModal.tsx — fully updated for staged‑save architecture

"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import styles from "../styles/ProjectModal.module.css";
import GeneralTab from "./GeneralTab";
import FinancialsTab from "./FinancialsTab";
import ScheduleTab from "./ScheduleTab";
import ChangeLogTab from "./ChangeLogTab";
import AdministrationTab from "./AdministrationTab";
import type { Project } from "@/types/Project";

/* Types */

interface Props {
  project: Project;
  onClose: () => void;
  onProjectUpdate: (project: Project) => void;
}

/*  UI Tabs  */
const TABS = [
  "General",
  "Financials",
  "Schedule",
  "Change Log",
  "Administration",
  "Delivery",
] as const;

type TabName = (typeof TABS)[number];

/*  Components  */
export default function ProjectModal({ project: initial, onClose, onProjectUpdate }: Props) {
  /* Project state */
  const [project, setProject] = useState<Project>(initial);

  /* Staged‑change callbacks to make sure no lost data */
  const changeHandlersRef = useRef<Array<() => Partial<Project>>>([]);
  const registerChangeHandler = useCallback((fn: () => Partial<Project>) => {
    changeHandlersRef.current.push(fn);
  }, []);

  /* UI state */
  const [activeTab, setActiveTab] = useState<TabName>("General");
  const [activeDeliveryTab, setActiveDeliveryTab] = useState<"Risk" | "Lessons Learned">("Risk");

  /* Esc key for closing  */
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [onClose]);

  /*  Save Project (single PATCH)  */
  const handleSaveProject = async () => {
    const combined: Partial<Project> = {};
    changeHandlersRef.current.forEach((get) => Object.assign(combined, get()));

    if (Object.keys(combined).length === 0) {
      alert("No changes to save.");
      return;
    }

    try {
      const res = await fetch(`/api/projects/${project.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(combined),
      });
      if (!res.ok) throw new Error("Save failed");

      const updated = await res.json();
      setProject(updated);
      onProjectUpdate(updated);
      alert("Project saved.");
      changeHandlersRef.current = []; // reset staged callbacks
    } catch (err) {
      console.error(err);
      alert("Failed to save project.");
    }
  };

  /*  Tab Renderer  */
  const renderTab = () => {
    switch (activeTab) {
      case "General":
        return (
          <GeneralTab
            project={project}
            onProjectUpdate={(p) => {
              setProject(p);
              onProjectUpdate(p);
            }}
            registerChangeHandler={registerChangeHandler}
          />
        );
      case "Financials":
        return (
          <FinancialsTab
            project={project}
            registerChangeHandler={registerChangeHandler}
          />
        );
      case "Schedule":
        return <ScheduleTab project={project} />;
      case "Change Log":
        return <ChangeLogTab project={project} />;
      case "Administration":
        return <AdministrationTab project={project} />;
      case "Delivery":
        return (
          <div>
            <div className={styles.tabHeader}>
              {(["Risk", "Lessons Learned"] as const).map((d) => (
                <button
                  key={d}
                  className={`${styles.tabButton} ${activeDeliveryTab === d ? styles.activeTab : ""}`}
                  onClick={() => setActiveDeliveryTab(d)}
                >
                  {d}
                </button>
              ))}
            </div>
            {/* TODO: We need to work on these two logs.  */} 
            {activeDeliveryTab === "Risk" ? <div>Risk Matrix</div> : <div>Lessons Log</div>}
          </div>
        );
      default:
        return null;
    }
  };

  /*  JSX  */
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {/* Header */}
        <div className={styles.header}>
          <h2>{project.title}</h2>
          <button className={styles.closeButton} onClick={onClose}>\
          {  /* TODO: We need to add a close icon here */}
            X
          </button>
        </div>

        {/* Tab buttons */}
        <div className={styles.tabHeader}>
          {TABS.map((t) => (
            <button
              key={t}
              className={`${styles.tabButton} ${activeTab === t ? styles.activeTab : ""}`}
              onClick={() => setActiveTab(t)}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Active tab content */}
        <div className={styles.tabContent}>{renderTab()}</div>

        {/* Footer */}
        <div className={styles.footer}>
          <button className={styles.backButton} onClick={onClose}>
            Close
          </button>
          <button className={styles.editButton} onClick={handleSaveProject}>
            Save Project
          </button>
          <button className={styles.editButton} onClick={() => console.log("Edit mode")}>Edit Project</button>
        </div>
      </div>
    </div>
  );
}
