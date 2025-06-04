'use client';
import { useState, useEffect } from "react";
import styles from "./ProjectModal_Popup.module.css";

type Props = {
  onClose: () => void;
};

export default function ProjectModal({ onClose }: Props) {
  const tabs = ["General", "Financials", "Schedule", "Delivery", "Administration"];
  const [activeTab, setActiveTab] = useState("General");

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
  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <button onClick={onClose} className={styles.closeButton}>✖</button>
        <h2>Regina School Project</h2>

        <div className={styles.tabHeader}>
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={activeTab === tab ? styles.activeTab : ""}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className={styles.tabContent}>
          {activeTab === "General" && <p>General content goes here.</p>}
          {activeTab === "Financials" && <p>Financials content goes here.</p>}
          {activeTab === "Schedule" && <p>Schedule content goes here.</p>}
          {activeTab === "Delivery" && <p>Delivery content goes here.</p>}
          {activeTab === "Administration" && <p>Administration content goes here.</p>}
        </div>
      </div>
    </div>
  );
}
