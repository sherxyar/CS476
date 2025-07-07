"use client";

import { useState, CSSProperties, useEffect } from "react";
import styles from "../styles/ProjectModal.module.css";
import type { Project } from "@/types/Project";

type ChangeLogEntry = {
  id: number;
  date: string;
  changeType: "Financial" | "Schedule" | "Scope" | "Resource" | "Risk";
  category:
    | "Budget"
    | "Forecast"
    | "Actuals"
    | "Timeline"
    | "Milestone"
    | "Deliverable"
    | "Other";
  description: string;
  impactArea: string;
  oldValue?: string;
  newValue?: string;
  justification: string;
  requestedBy: string;
  approvedBy: string;
  status: "Pending" | "Approved" | "Rejected" | "Implemented";
  priority: "Low" | "Medium" | "High" | "Critical";
  estimatedImpact: string;
};

type Props = {
  project: Project;
};

export default function ChangeLogTab({ project }: Props) {
  const [showAddChange, setShowAddChange] = useState(false);
  const [changeLog, setChangeLog] = useState<ChangeLogEntry[]>([]);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const [newChange, setNewChange] = useState<Partial<ChangeLogEntry>>({
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

  // Load existing change logs on mount
  useEffect(() => {
    async function fetchChangeLogs() {
      try {
        const res = await fetch(`/api/change-log?projectId=${project.id}`);
        if (!res.ok) throw new Error("Failed to fetch change logs");
        const data = await res.json();
        setChangeLog(data);
      } catch (err) {
        console.error("Failed to load change logs:", err);
      }
    }
    fetchChangeLogs();
  }, [project.id]);

  // Helper functions for styling
  const getStatusClass = (status: ChangeLogEntry["status"]) => {
    switch (status) {
      case "Implemented":
        return styles.statusPaid;
      case "Approved":
        return styles.statusInProgress;
      case "Pending":
        return styles.statusClosed;
      case "Rejected":
        return styles.statusNotPaid;
      default:
        return "";
    }
  };

  const getPriorityClass = (
    priority: ChangeLogEntry["priority"]
  ): string | CSSProperties => {
    switch (priority) {
      case "Critical":
        return styles.statusNotPaid;
      case "High":
        return {
          backgroundColor: "#ff9800",
          color: "white",
          padding: "4px 8px",
          borderRadius: "12px",
          fontSize: "11px",
          fontWeight: "500",
        };
      case "Medium":
        return styles.statusInProgress;
      case "Low":
        return styles.statusPaid;
      default:
        return "";
    }
  };

  const toggleExpand = (id: number) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  // Add new change
  const handleAddChange = async () => {
    if (
      !newChange.description ||
      !newChange.impactArea ||
      !newChange.justification ||
      !newChange.requestedBy
    ) {
      alert("⚠️ Please fill all required fields.");
      return;
    }

    try {
      const res = await fetch("/api/change-log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newChange,
          approvedBy: "Pending",
          status: "Pending",
          projectId: project.id,
          userId: 1, // Replace with actual user ID if needed
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

  // Update status with all required fields included to prevent 400 error
  const updateStatus = async (id: number, newStatus: ChangeLogEntry["status"]) => {
    try {
      const entry = changeLog.find((e) => e.id === id);
      if (!entry) {
        alert("Entry not found");
        return;
      }

      const body = {
        status: newStatus,
        description: entry.description,
        impactArea: entry.impactArea,
        justification: entry.justification,
        approvedBy: newStatus === "Approved" ? "Admin" : "Admin", // Replace with actual admin user
        priority: entry.priority,
        estimatedImpact: entry.estimatedImpact,
        oldValue: entry.oldValue,
        newValue: entry.newValue,
        category: entry.category,
        changeType: entry.changeType,
      };

      const res = await fetch(`/api/change-log/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
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
          {/* Form fields for new change request */}
          <div className={styles.formRow}>
            <div className={styles.formField}>
              <label>Change Type</label>
              <select
                className={styles.formSelect}
                value={newChange.changeType}
                onChange={(e) =>
                  setNewChange({
                    ...newChange,
                    changeType: e.target.value as ChangeLogEntry["changeType"],
                  })
                }
              >
                <option value="Financial">Financial</option>
                <option value="Schedule">Schedule</option>
                <option value="Scope">Scope</option>
                <option value="Resource">Resource</option>
                <option value="Risk">Risk</option>
              </select>
            </div>
            <div className={styles.formField}>
              <label>Category</label>
              <select
                className={styles.formSelect}
                value={newChange.category}
                onChange={(e) =>
                  setNewChange({
                    ...newChange,
                    category: e.target.value as ChangeLogEntry["category"],
                  })
                }
              >
                <option value="Budget">Budget</option>
                <option value="Forecast">Forecast</option>
                <option value="Actuals">Actuals</option>
                <option value="Timeline">Timeline</option>
                <option value="Milestone">Milestone</option>
                <option value="Deliverable">Deliverable</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

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
                placeholder="Brief description of the change"
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
                placeholder="Area impacted by this change"
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formField}>
              <label>Old Value (Optional)</label>
              <input
                type="text"
                className={styles.formInput}
                value={newChange.oldValue}
                onChange={(e) =>
                  setNewChange({ ...newChange, oldValue: e.target.value })
                }
                placeholder="Previous value"
              />
            </div>
            <div className={styles.formField}>
              <label>New Value (Optional)</label>
              <input
                type="text"
                className={styles.formInput}
                value={newChange.newValue}
                onChange={(e) =>
                  setNewChange({ ...newChange, newValue: e.target.value })
                }
                placeholder="Proposed new value"
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
                placeholder="Reason for this change"
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
                placeholder="Name of requester"
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formField}>
              <label>Priority</label>
              <select
                className={styles.formSelect}
                value={newChange.priority}
                onChange={(e) =>
                  setNewChange({
                    ...newChange,
                    priority: e.target.value as ChangeLogEntry["priority"],
                  })
                }
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
            <div className={styles.formField}>
              <label>Estimated Impact</label>
              <input
                type="text"
                className={styles.formInput}
                value={newChange.estimatedImpact}
                onChange={(e) =>
                  setNewChange({ ...newChange, estimatedImpact: e.target.value })
                }
                placeholder="Impact estimation"
              />
            </div>
          </div>

          <div className={styles.formActions}>
            <button className={styles.saveInvoiceButton} onClick={handleAddChange}>
              Submit Change Request
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

      {/* Change log list */}
      <ul>
        {changeLog.map((entry) => {
          const priorityStyle = getPriorityClass(entry.priority);
          const priorityClassName = typeof priorityStyle === "string" ? priorityStyle : undefined;
          const priorityInlineStyle = typeof priorityStyle === "object" ? priorityStyle : {};

          return (
            <li key={entry.id} className={styles.noteItem}>
              <div
                role="button"
                onClick={() => toggleExpand(entry.id)}
                style={{ cursor: "pointer", display: "flex", alignItems: "center", userSelect: "none" }}
                aria-expanded={expandedId === entry.id}
              >
                <span style={{ marginRight: 8 }}>
                  {expandedId === entry.id ? "▼" : "▶"}
                </span>
                <strong>{new Date(entry.date).toLocaleString()}</strong>: {entry.description} (
                {entry.status})
              </div>

              {expandedId === entry.id && (
                <div className={styles.changeDetails}>
                  <p><strong>Change Type:</strong> {entry.changeType}</p>
                  <p><strong>Category:</strong> {entry.category}</p>
                  <p><strong>Impact Area:</strong> {entry.impactArea}</p>
                  <p><strong>Old Value:</strong> {entry.oldValue || "N/A"}</p>
                  <p><strong>New Value:</strong> {entry.newValue || "N/A"}</p>
                  <p><strong>Justification:</strong> {entry.justification}</p>
                  <p><strong>Requested By:</strong> {entry.requestedBy}</p>
                  <p><strong>Approved By:</strong> {entry.approvedBy}</p>
                  <p><strong>Priority:</strong> <span className={priorityClassName} style={priorityInlineStyle}>{entry.priority}</span></p>
                  <p><strong>Estimated Impact:</strong> {entry.estimatedImpact}</p>
                </div>
              )}

              {/* Approve/Reject buttons only if status is Pending */}
              {entry.status === "Pending" && (
                <div className={styles.formActions}>
                  <button
                    className={styles.saveInvoiceButton}
                    onClick={() => updateStatus(entry.id, "Approved")}
                    style={{ marginRight: 10 }}
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
          );
        })}
      </ul>
    </div>
  );
}
