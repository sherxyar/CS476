"use client";
import { useState } from "react";
import styles from "../styles/ProjectModal.module.css";
import type { Project } from "@/types/Project";

type RiskEntry = {
  id: string;
  date: string;
  riskDescription: string;
  category: "Technical" | "Financial" | "Schedule" | "Resource" | "External" | "Safety" | "Environmental" | "Regulatory" | "Quality" | "Procurement";
  probability: "Very Low" | "Low" | "Medium" | "High" | "Very High";
  impact: "Very Low" | "Low" | "Medium" | "High" | "Very High";
  riskLevel: "Low" | "Medium" | "High" | "Critical";
  mitigation: string;
  contingency: string;
  owner: string;
  status: "Identified" | "Assessed" | "Planned" | "Monitoring" | "Closed" | "Escalated";
  dueDate: string;
  responseStrategy: "Avoid" | "Mitigate" | "Transfer" | "Accept";
};

type LessonEntry = {
  id: string;
  date: string;
  category: "Process" | "Technical" | "Communication" | "Planning" | "Resource Management";
  title: string;
  description: string;
  impact: "Positive" | "Negative";
  recommendation: string;
  applicablePhases: string[];
  priority: "Low" | "Medium" | "High";
  documentedBy: string;
};

type Props = {
  project: Project;
};

export default function DeliveryTab({ project: _project }: Props) {
  const [activeSubTab, setActiveSubTab] = useState("Risk");
  // ... all your state and logic for risks, lessons, handlers, etc ...

  // (keep all your risk, lesson, form, and logic code here unchanged)

  // Replace your subTabs and tabHeader code with this:
  const tabList = [
    { key: "Lessons Learned", label: "Lessons Learned" },
    { key: "Risk", label: "Risk Register" }
  ];

  return (
    <div className={styles.generalContent}>
      {/* Tab Navigation - HTML style */}
      <div style={{ display: "flex", borderBottom: "2px solid #bbb", marginBottom: "1em" }}>
        {tabList.map(tab => (
          <div
            key={tab.key}
            className={`tab${activeSubTab === tab.key ? " active" : ""}`}
            style={{
              padding: "1em 2em",
              cursor: "pointer",
              background: activeSubTab === tab.key ? "#fff" : "#e6e6e6",
              border: "1px solid #bbb",
              borderBottom: activeSubTab === tab.key ? "2px solid #fff" : "none",
              marginRight: "0.5em",
              borderRadius: "8px 8px 0 0",
              fontWeight: "bold",
              color: activeSubTab === tab.key ? "#0074d9" : "inherit"
            }}
            onClick={() => setActiveSubTab(tab.key)}
          >
            {tab.label}
          </div>
        ))}
      </div>

      {/* Lessons Learned Tab */}
      {activeSubTab === "Lessons Learned" && (
        <div className={styles.actualsSection}>
          {/* ... your Lessons Learned content ... */}
        </div>
      )}

      {/* Risk Register Tab */}
      {activeSubTab === "Risk" && (
        <div className={styles.actualsSection}>
          {/* ... your Risk Register content ... */}
        </div>
      )}
    </div>
  );
}
