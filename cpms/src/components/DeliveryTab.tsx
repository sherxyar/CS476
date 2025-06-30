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
  const [activeSubTab, setActiveSubTab] = useState("Lessons Learned");

  const [risks, setRisks] = useState<RiskEntry[]>([
    {
      id: "RSK-001",
      date: "Jan 10, 2025",
      riskDescription: "Weather delays during asphalt laying operations",
      category: "External",
      probability: "High",
      impact: "Medium",
      riskLevel: "High",
      mitigation: "Monitor weather forecasts daily, maintain flexible scheduling",
      contingency: "Secure indoor storage for materials, have backup dates scheduled",
      owner: "John Doe",
      status: "Monitoring",
      dueDate: "Feb 15, 2025",
      responseStrategy: "Mitigate"
    }
    // ... add more risk entries as needed
  ]);

  const [lessons, setLessons] = useState<LessonEntry[]>([
    {
      id: "LL-001",
      date: "Jan 15, 2025",
      category: "Planning",
      title: "Early stakeholder engagement improves approval times",
      description: "Engaging with city planning office 2 weeks earlier than scheduled resulted in faster permit approvals and reduced project delays",
      impact: "Positive",
      recommendation: "Always initiate stakeholder engagement at least 3 weeks before planned start date",
      applicablePhases: ["Planning", "Initiation"],
      priority: "High",
      documentedBy: "Jane Smith"
    }
    // ... add more lesson entries as needed
  ]);

  // Tab list and tab navigation style
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
          <div style={{
            margin: "1.5em 0 0.5em 0",
            fontSize: "1.2em",
            color: "#333",
            borderLeft: "4px solid #0074d9",
            paddingLeft: "0.5em"
          }}>Lessons Learned Table</div>
          <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "2em", background: "#fafafa" }}>
            <thead>
              <tr>
                <th>Topic</th>
                <th>Experience</th>
                <th>Impact & Recurrence</th>
                <th>Lessons Learned</th>
                <th>Best Practice or Problem</th>
                <th>Actions Required</th>
                <th>Implement (Q/S/L)</th>
                <th>Assigned To</th>
              </tr>
            </thead>
            <tbody>
              {/* Example row, replace with your data */}
              <tr>
                <td>Stakeholder Input</td>
                <td>Missed early engagement with key stakeholders.</td>
                <td>H, H</td>
                <td>
                  <ul>
                    <li>Engage all stakeholders at project start.</li>
                    <li>Document requirements formally.</li>
                  </ul>
                </td>
                <td>Problem</td>
                <td>
                  <ul>
                    <li>Schedule stakeholder meetings.</li>
                    <li>Create requirements checklist.</li>
                  </ul>
                </td>
                <td>Q</td>
                <td>Jane Doe</td>
              </tr>
            </tbody>
          </table>

          <div style={{
            margin: "1.5em 0 0.5em 0",
            fontSize: "1.2em",
            color: "#333",
            borderLeft: "4px solid #0074d9",
            paddingLeft: "0.5em"
          }}>Instructions & Definitions</div>
          <ul>
            <li><strong>Topic:</strong> Brief description (5–7 words) of the topic[1].</li>
            <li><strong>Experience:</strong> Describe the situation and what was experienced[1].</li>
            <li><strong>Impact & Recurrence:</strong>
              <ul>
                <li>Impact: H = High, M = Medium, L = Low, N = None</li>
                <li>Recurrence: H = High, M = Medium, L = Low</li>
              </ul>
            </li>
            <li><strong>Lessons Learned:</strong> List in bulleted format[1].</li>
            <li><strong>Best Practice or Problem:</strong> Is this a best practice or a problem to fix?[1]</li>
            <li><strong>Actions Required:</strong> Specific actions to implement the lesson learned[1].</li>
            <li><strong>Implement:</strong> Q = Quick Hit, S = Short-Term, L = Long-Term[1].</li>
            <li><strong>Assigned To:</strong> Team member(s) responsible for follow-up[1].</li>
          </ul>
        </div>
      )}

      {/* Risk Register Tab */}
      {activeSubTab === "Risk" && (
        <div className={styles.actualsSection}>
          <div style={{
            margin: "1.5em 0 0.5em 0",
            fontSize: "1.2em",
            color: "#333",
            borderLeft: "4px solid #0074d9",
            paddingLeft: "0.5em"
          }}>Risk Register Table</div>
          <div style={{ width: "100%", overflowX: "auto", borderBottom: "1px solid #bbb" }}>
            <table style={{ minWidth: 1600, borderCollapse: "collapse", background: "#fafafa" }}>
              <thead>
                <tr>
                  <th>Risk ID</th>
                  <th>Risk Name</th>
                  <th>Risk Description</th>
                  <th>Date Captured</th>
                  <th>Risk Owner</th>
                  <th>Pre-Mitigation Impact</th>
                  <th>Pre-Mitigation Likelihood</th>
                  <th>Pre-Mitigation Score</th>
                  <th>Current Impact</th>
                  <th>Current Likelihood</th>
                  <th>Current Score</th>
                  <th>Post-Mitigation Impact</th>
                  <th>Post-Mitigation Likelihood</th>
                  <th>Post-Mitigation Score</th>
                  <th>Risk Response</th>
                  <th>Mitigation Plan / Actions</th>
                  <th>Progress</th>
                  <th>Risk Proximity</th>
                  <th>Workstream</th>
                  <th>Operational or Project Risk</th>
                  <th>Escalation Level</th>
                  <th>Last Review Date</th>
                  <th>Next Review Date</th>
                  <th>Target Completion Date</th>
                  <th>Historical Progress</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {/* Example row, replace with your data */}
                <tr>
                  <td>R-001</td>
                  <td>Resource Gaps</td>
                  <td>Potential unavailability of key staff during critical phases.</td>
                  <td>2024-05-01</td>
                  <td>John Smith</td>
                  <td>4</td>
                  <td>3</td>
                  <td>12</td>
                  <td>3</td>
                  <td>2</td>
                  <td>6</td>
                  <td>2</td>
                  <td>1</td>
                  <td>2</td>
                  <td>Reduce</td>
                  <td>Cross-train team members.</td>
                  <td>Ongoing</td>
                  <td>Immediate</td>
                  <td>Development</td>
                  <td>Project</td>
                  <td>Medium</td>
                  <td>2024-06-01</td>
                  <td>2024-07-01</td>
                  <td>2024-07-15</td>
                  <td>On track</td>
                  <td>-</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div style={{
            margin: "1.5em 0 0.5em 0",
            fontSize: "1.2em",
            color: "#333",
            borderLeft: "4px solid #0074d9",
            paddingLeft: "0.5em"
          }}>Risk Definitions</div>
          <ul>
            <li><strong>Risk Impact:</strong>
              <ul>
                <li>1 = Very Minor</li>
                <li>2 = Minor</li>
                <li>3 = Moderate</li>
                <li>4 = Significant</li>
                <li>5 = Catastrophic</li>
              </ul>
            </li>
            <li><strong>Risk Likelihood:</strong>
              <ul>
                <li>1 = 1–20%</li>
                <li>2 = 21–40%</li>
                <li>3 = 41–60%</li>
                <li>4 = 61–80%</li>
                <li>5 = 81–99%</li>
              </ul>
            </li>
            <li><strong>Risk Response:</strong> Avoid, Reduce, Fallback, Transfer, Share, Accept[2].</li>
            <li><strong>Scores:</strong> Calculated as Impact × Likelihood[2].</li>
          </ul>
        </div>
      )}
    </div>
  );
}
