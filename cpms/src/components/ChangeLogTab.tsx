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

  // 상태 업데이트 함수 (승인/거절)
  const updateStatus = async (id: number, newStatus: string) => {
    try {
      const res = await fetch(`/api/change-log/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error("Failed to update status");

      const updated = await res.json();
      setChangeLog((prev) =>
        prev.map((entry) => (entry.id === id ? updated : entry))
      );
    } catch (err) {
      console.error("❌ Failed to update status:", err);
      alert("Failed to update status.");
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
          {/* ...기존 입력폼 코드 그대로 유지... */}
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
                    <strong>{entry.createdAt}</strong>: {entry.description} (
                    {entry.status})
                  </div>
                </div>
                {entry.status === "Pending" && (
                  <div className={styles.formActions}>
                    <button
                      className={styles.saveInvoiceButton}
                      onClick={() => updateStatus(entry.id, "Approved")}
                      style={{ marginRight: "10px" }}
                    >
                      Approve
                    </button>
                    <button
                      className={styles.cancelNoteButton}
                      onClick={() => updateStatus(entry.id, "Rejected")}
                    >
                      Reject
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
