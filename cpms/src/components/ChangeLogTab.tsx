"use client";

import { useState } from "react";
import styles from "../styles/ProjectModal.module.css";
import type { Project } from "@/types/Project";

// types
type ChangeLogEntry = {
  id: number;
  changeType: string;
  category: string;
  description: string;
  impactArea: string;
  oldValue?: string;
  newValue?: string;
  justification: string;
  requestedBy: string;
  approvedBy: string;
  status: string;
  priority: string;
  estimatedImpact: string;
  createdAt: string;
};

type Props = {
  project: Project;
};

export default function ChangeLogTab({ project }: Props) {
  const [showAddChange, setShowAddChange] = useState(false);
  const [changeLog, setChangeLog] = useState<ChangeLogEntry[]>([]);

  const [newChange, setNewChange] = useState({
    changeType: "Financial",
    category: "Budget",
    description: "",
    impactArea: "",
    oldValue: "",
    newValue: "",
    justification: "",
    requestedBy: "",
    approvedBy: "",
    status: "Pending",
    priority: "Medium",
    estimatedImpact: "",
  });

  const handleAddChange = async () => {
    const {
      changeType,
      category,
      description,
      impactArea,
      oldValue,
      newValue,
      justification,
      requestedBy,
      approvedBy,
      status,
      priority,
      estimatedImpact,
    } = newChange;

    if (!description || !impactArea || !justification || !requestedBy) {
      alert("⚠️ Please fill all required fields.");
      return;
    }

    try {
      const res = await fetch("/api/change-log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          changeType,
          category,
          description,
          impactArea,
          oldValue,
          newValue,
          justification,
          requestedBy,
          approvedBy,
          status,
          priority,
          estimatedImpact,
          userId: 1,
          projectId: project.id,
        }),
      });

      if (!res.ok) throw new Error("Failed to create change log entry");

      const saved = await res.json();
      setChangeLog((prev) => [saved, ...prev]);
      setNewChange({
        changeType: "Financial",
        category: "Budget",
        description: "",
        impactArea: "",
        oldValue: "",
        newValue: "",
        justification: "",
        requestedBy: "",
        approvedBy: "",
        status: "Pending",
        priority: "Medium",
        estimatedImpact: "",
      });
      setShowAddChange(false);
    } catch (err) {
      console.error("❌ Failed to add change:", err);
      alert("Failed to add change request.");
    }
  };

  return (
    <div className={styles.generalContent}>
      <div className={styles.actualsHeader}>
        <label>Change Log</label>
        <button
          className={styles.addInvoiceButton}
          onClick={() => setShowAddChange(true)}
        >
          + Add Change
        </button>
      </div>

      {showAddChange && (
        <div className={styles.invoiceForm}>
          <div className={styles.formRow}>
            <div className={styles.formField}>
              <label>Description</label>
              <input
                type="text"
                className={styles.formInput}
                value={newChange.description}
                onChange={(e) =>
                  setNewChange({ ...newChange, description: e.target.value })
                }
              />
            </div>
            <div className={styles.formField}>
              <label>Impact Area</label>
              <input
                type="text"
                className={styles.formInput}
                value={newChange.impactArea}
                onChange={(e) =>
                  setNewChange({ ...newChange, impactArea: e.target.value })
                }
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formField}>
              <label>Justification</label>
              <input
                type="text"
                className={styles.formInput}
                value={newChange.justification}
                onChange={(e) =>
                  setNewChange({ ...newChange, justification: e.target.value })
                }
              />
            </div>
            <div className={styles.formField}>
              <label>Requested By</label>
              <input
                type="text"
                className={styles.formInput}
                value={newChange.requestedBy}
                onChange={(e) =>
                  setNewChange({ ...newChange, requestedBy: e.target.value })
                }
              />
            </div>
          </div>

          <div className={styles.formActions}>
            <button
              className={styles.saveInvoiceButton}
              onClick={handleAddChange}
            >
              Save Change
            </button>
            <button
              className={styles.cancelNoteButton}
              onClick={() => setShowAddChange(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className={styles.divider} />

      <div className={styles.notesSection}>
        {changeLog.length === 0 ? (
          <p>No change log entries yet.</p>
        ) : (
          <ul>
            {changeLog.map((entry) => (
              <li key={entry.id} className={styles.noteItem}>
                <div className={styles.fieldGroup}>
                  <div className={styles.fieldValue}>
                    <strong>{entry.createdAt}</strong>: {entry.description} ({entry.status})
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
