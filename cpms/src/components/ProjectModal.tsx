"use client";
import { useState, useEffect } from "react";
import styles from "../styles/ProjectModal.module.css";
import GeneralTab from "./GeneralTab";
import FinancialsTab from "./FinancialsTab";
import ScheduleTab from "./ScheduleTab";
import ChangeLogTab from "./ChangeLogTab";
import AdministrationTab from "./AdministrationTab";

import type { Project } from "@/types/Project";


type Props = {
  project: Project;
  onClose: () => void;
  onProjectUpdate: (project: Project) => void;
};

function RiskTab() {
  return <div>Risk Matrix</div>;
}

function LessonsLearnedTab() {
  return <div>Lessons Log</div>;
}

export default function ProjectModal({ project: initialProject, onClose, onProjectUpdate }: Props) {
  const [project, setProject] = useState(initialProject);

  const tabs = [
    "General",
    "Financials",
    "Schedule",
    "Change Log",
    "Administration",
    "Delivery",
  ];
  const [activeTab, setActiveTab] = useState("General");
  const [activeDeliveryTab, setActiveDeliveryTab] = useState("Risk");

  // Esc key close.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  // Click outside to close modal.
  //const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
  //  if (event.target === event.currentTarget) {
  //    onClose();
  //  }
  //};

  const renderActiveTab = () => {
  switch (activeTab) {
    case "General":
      return (
        <GeneralTab
          project={project}
          onProjectUpdate={(updated) => {
            setProject(updated);            // update local state
            onProjectUpdate(updated);       // update parent state
          }}
        />
      );
    case "Financials":
      return <FinancialsTab project={project} />;
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
            <button
              className={`${styles.tabButton} ${activeDeliveryTab === "Risk" ? styles.activeTab : ""}`}
              onClick={() => setActiveDeliveryTab("Risk")}
            >
              Risk
            </button>
            <button
              className={`${styles.tabButton} ${activeDeliveryTab === "Lessons Learned" ? styles.activeTab : ""}`}
              onClick={() => setActiveDeliveryTab("Lessons Learned")}
            >
              Lessons Learned
            </button>
          </div>
          {activeDeliveryTab === "Risk" ? <RiskTab /> : <LessonsLearnedTab />}
        </div>
      );
    default:
      return (
        <GeneralTab
          project={project}
          onProjectUpdate={(updated) => {
            setProject(updated);
            onProjectUpdate(updated);
          }}
        />
      );
  }
};
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>{project.title}</h2>

          <div className={styles.headerActions}>
            {/* Add something of action here. */}
          </div>

          <button onClick={onClose} className={styles.closeButton}>
            X
          </button>
        </div>

        <div className={styles.tabHeader}>
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`${styles.tabButton} ${activeTab === tab ? styles.activeTab : ""
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className={styles.tabContent}>{renderActiveTab()}</div>

        <div className={styles.footer}>
          <button className={styles.backButton} onClick={onClose}>
            Close
          </button>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              className={styles.editButton}
              onClick={() => console.log("Save project")}
            >
              Save Project
            </button>
            <button
              className={styles.editButton}
              onClick={() => console.log("Edit mode")}
            >
              Edit Project
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}