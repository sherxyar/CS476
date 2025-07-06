// src/pages/admin/ChangeLogTab.tsx
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
          userId: 1, // Replace with actual logged-in user ID
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
    <div>
      <h1>Change Log</h1>
      <button onClick={() => setShowAddChange(true)}>Add Change</button>

      {showAddChange && (
        <div>
          <h2>New Change Request</h2>
          <input
            placeholder="Description"
            value={newChange.description}
            onChange={(e) =>
              setNewChange({ ...newChange, description: e.target.value })
            }
          />
          <input
            placeholder="Impact Area"
            value={newChange.impactArea}
            onChange={(e) =>
              setNewChange({ ...newChange, impactArea: e.target.value })
            }
          />
          <input
            placeholder="Justification"
            value={newChange.justification}
            onChange={(e) =>
              setNewChange({ ...newChange, justification: e.target.value })
            }
          />
          <input
            placeholder="Requested By"
            value={newChange.requestedBy}
            onChange={(e) =>
              setNewChange({ ...newChange, requestedBy: e.target.value })
            }
          />
          <button onClick={handleAddChange}>Submit</button>
        </div>
      )}

      <ul>
        {changeLog.map((entry) => (
          <li key={entry.id}>
            {entry.createdAt} - {entry.description} ({entry.status})
          </li>
        ))}
      </ul>
    </div>
  );
}
