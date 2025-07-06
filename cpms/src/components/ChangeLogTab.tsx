// src/pages/admin/ChangeLogTab.tsx
"use client";
import { useState, type CSSProperties } from "react";
import styles from "../styles/ProjectModal.module.css";
import type { Project } from "@/types/Project";

// types
type ChangeLogEntry = {
  id: string;
  date: string;
  changeType: "Financial" | "Schedule" | "Scope" | "Resource" | "Risk";
  category: "Budget" | "Forecast" | "Actuals" | "Timeline" | "Milestone" | "Deliverable" | "Other";
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

export default function ChangeLogTab({ project: _project }: Props) {
  const [showAddChange, setShowAddChange] = useState(false);
  const [filterType, setFilterType] = useState<string>("All");
  const [filterStatus, setFilterStatus] = useState<string>("All");

  const [changeLog, setChangeLog] = useState<ChangeLogEntry[]>([]);

  const [newChange, setNewChange] = useState<Partial<ChangeLogEntry>>({
    changeType: "Financial",
    category: "Budget",
    description: "",
    impactArea: "",
    oldValue: "",
    newValue: "",
    justification: "",
    requestedBy: "",
    status: "Pending",
    priority: "Medium",
    estimatedImpact: "",
  });

  const handleAddChange = () => {
  if (
    newChange.description?.trim() &&
    newChange.impactArea?.trim() &&
    newChange.justification?.trim() &&
    newChange.requestedBy?.trim()
  ) {
    const entry: ChangeLogEntry = {
      id: `CHG-2025-${String(changeLog.length + 1).padStart(3, "0")}`,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      changeType: newChange.changeType as ChangeLogEntry["changeType"],
      category: newChange.category as ChangeLogEntry["category"],
      description: newChange.description,
      impactArea: newChange.impactArea,
      oldValue: newChange.oldValue,
      newValue: newChange.newValue,
      justification: newChange.justification,
      requestedBy: newChange.requestedBy,
      approvedBy: "Pending",
      status: newChange.status as ChangeLogEntry["status"],
      priority: newChange.priority as ChangeLogEntry["priority"],
      estimatedImpact: newChange.estimatedImpact || "To be determined",
    };

    setChangeLog([entry, ...changeLog]);

    setNewChange({
      changeType: "Financial",
      category: "Budget",
      description: "",
      impactArea: "",
      oldValue: "",
      newValue: "",
      justification: "",
      requestedBy: "",
      status: "Pending",
      priority: "Medium",
      estimatedImpact: "",
    });

    setShowAddChange(false);
  } else {
    alert("⚠️ Please fill out all required fields: Description, Impact Area, Justification, and Requested By.");
  }
};
