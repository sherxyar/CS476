"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import styles from "../styles/ProjectModal.module.css";
import GeneralTab from "./GeneralTab";
import FinancialsTab from "./FinancialsTab";
import ScheduleTab from "./ScheduleTab";
import ChangeLogTab from "./ChangeLogTab";
import AdministrationTab from "./AdministrationTab";
import DeliveryTab from "./DeliveryTab";
import type { Project } from "@/types/Project";
import { 
  SquareX, 
  Folder, 
  DollarSign, 
  Calendar, 
  ClipboardList, 
  Radar, 
  Settings 
} from "lucide-react";
import { useSession } from "next-auth/react";

/* Types */
interface Props {
  project: Project;
  onClose: () => void;
  onProjectUpdate: (project: Project) => void;
}

/* UI Tabs */
const ALL_TABS = [
  "General",
  "Financials",
  "Schedule",
  "Change Log",
  "Delivery",
  "Administration"
] as const;

type TabName = (typeof ALL_TABS)[number];

/* Component */
export default function ProjectModal({ project: initial, onClose, onProjectUpdate }: Props) {
  /* Get user session */
  const { data: session } = useSession();
  const userRole = session?.user?.accountRole || '';
  const isContributor = userRole === 'CONTRIBUTOR';

  const [project, setProject] = useState<Project>(initial);

  const changeHandlersRef = useRef<Array<() => Partial<Project>>>([]);
  const registerChangeHandler = useCallback((fn: () => Partial<Project>) => {
    changeHandlersRef.current.push(fn);
  }, []);

  /* Get filtered tabs based on user role */
  const TABS = ALL_TABS.filter(tab => !isContributor || tab !== "Administration");
  
  const [activeTab, setActiveTab] = useState<TabName>("General");
  
  /* Switch away from Administration tab if user is a contributor */
  useEffect(() => {
    if (isContributor && activeTab === "Administration") {
      setActiveTab("General");
    }
  }, [isContributor, activeTab]);

  /* esc to close */
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [onClose]);

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

      changeHandlersRef.current = [];
    } catch (err) {
      console.error(err);
      alert("Failed to save project.");
    }
  };

  /* Tab icons mapping */
  const TAB_ICONS = {
    "General": <Folder size={16} />,
    "Financials": <DollarSign size={16} />,
    "Schedule": <Calendar size={16} />,
    "Change Log": <ClipboardList size={16} />,
    "Delivery": <Radar size={16} />,
    "Administration": <Settings size={16} />
  };

  /* render tab */
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
      case "Delivery":
        return (
          <DeliveryTab
            project={project}
            registerChangeHandler={registerChangeHandler}
          />
        );
      case "Administration":
        return !isContributor ? <AdministrationTab project={project} /> : null;

      default:
        return null;
    }
  };

  /* jsx */
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {/* header */}
        <div className={styles.header}>
          <h2>{project.title}</h2>
          <button
            className={styles.closeButton}
            onClick={onClose}
            title="Close"
            aria-label="Close"
          >
            <SquareX aria-hidden="true" className={styles.closeIcon} size={18} strokeWidth={1.5} />
          </button>
        </div>

        {/* main tabs */}
        <div className={styles.tabHeader}>
          {TABS.map((t) => (
            <button
              key={t}
              className={`${styles.tabButton} ${activeTab === t ? styles.activeTab : ""}`}
              onClick={() => setActiveTab(t)}
            >
              <span className={styles.tabButtonContent}>
                <span className={styles.tabIcon}>{TAB_ICONS[t]}</span>
                <span className={styles.tabLabel}>{t}</span>
              </span>
            </button>
          ))}
        </div>

        <div className={styles.tabContent}>{renderTab()}</div>

        {/* footer */}
        <div className={styles.footer}>
          <button className={styles.backButton} onClick={onClose}>
            Close
          </button>
          <button className={styles.editButton} onClick={handleSaveProject}>
            Save Project
          </button>

        </div>
      </div>
    </div>
  );
}
