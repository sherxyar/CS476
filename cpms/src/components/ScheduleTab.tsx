"use client";
import { useEffect, useState } from "react";
import styles from "../styles/ProjectModal.module.css";
import type { Project } from "@/types/Project";
import { type LucideIcon } from 'lucide-react';
import {
  Circle,
  Loader2,
  CheckCircle2,
  XCircle,
} from 'lucide-react';

type Milestone = {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: "Not Started" | "In Progress" | "Completed" | "Closed";
};

// these are from Lucide icons
const statusIconMap: Record<Milestone['status'], LucideIcon> = {
  'Not Started': Circle,
  'In Progress': Loader2,
  Completed: CheckCircle2,
  Closed: XCircle,
};

// Lucide icons helper function
export function StatusIcon({ status }: { status: Milestone['status'] }) {
  const Icon = statusIconMap[status];
  return (
    <Icon
      className={`h-4 w-4 inline-block ${status === 'In Progress' ? 'animate-spin' : ''
        }`}
    />
  );
}



type Schedule = {
  id: number;
  projectId: string;
  milestones: Milestone[];
};

type Props = {
  project: Project;
};

export default function ScheduleTab({ project }: Props) {
  const [schedule, setSchedule] = useState<Schedule | null>(null);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [showAddMilestone, setShowAddMilestone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newMilestone, setNewMilestone] = useState<Omit<Milestone, "id">>({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "Not Started",
  });

  // 🛠 Date display fix: create local date to avoid timezone shift
  const formatDateForDisplay = (dateString: string) => {
    try {
      const [datePart] = dateString.split("T");
      const [year, month, day] = datePart.split("-").map(Number);
      const displayDate = new Date(year, month - 1, day);
      return displayDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  // Date string creation with UTC noon to avoid shift
  const createDateString = (dateInput: string) => {
    if (dateInput && !dateInput.includes("T")) {
      return `${dateInput}T12:00:00Z`;
    }
    return dateInput;
  };

  useEffect(() => {
    const fetchSchedule = async () => {
      if (!project.id) return;
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/projects/${project.id}/milestones`);
        if (!response.ok) throw new Error(`Status: ${response.status}`);

        const data = await response.json();
        setSchedule({
          id: data.id || 0,
          projectId: project.id,
          milestones: data.milestones || [],
        });
        setMilestones(data.milestones || []);
      } catch (err) {
        console.error("Fetch schedule error:", err);
        setError("Failed to load schedule data");
      } finally {
        setLoading(false);
      }
    };
    fetchSchedule();
  }, [project.id]);

  const handleAddMilestone = async () => {
    const { title, description, startDate, endDate, status } = newMilestone;
    if (!title || !description || !startDate || !endDate) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/projects/${project.id}/milestones`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          startDate: createDateString(startDate),
          endDate: createDateString(endDate),
          status,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Unknown error");
      }

      const savedMilestone = await response.json();
      setMilestones((prev) => [...prev, savedMilestone]);

      setNewMilestone({
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        status: "Not Started",
      });
      setShowAddMilestone(false);
    } catch (err) {
      console.error("Add milestone error:", err);
      setError("Failed to add milestone. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (
    milestoneId: number,
    newStatus: Milestone["status"]
  ) => {
    try {
      setError(null);

      const response = await fetch(`/api/projects/${project.id}/milestones`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ milestoneId, status: newStatus }),
      });

      if (!response.ok) throw new Error("Status update failed");

      setMilestones((prev) =>
        prev.map((m) =>
          m.id === milestoneId ? { ...m, status: newStatus } : m
        )
      );
    } catch (err) {
      console.error("Status update error:", err);
      setError("Failed to update milestone status. Please try again.");
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "Completed":
        return styles.statusPaid;
      case "In Progress":
        return styles.statusInProgress;
      case "Closed":
        return styles.statusClosed;
      case "Not Started":
        return styles.statusNotPaid;
      default:
        return "";
    }
  };

  const getActualStartDate = () => {
    if (milestones.length === 0) return "Not started";
    const sorted = [...milestones].sort(
      (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );
    return formatDateForDisplay(sorted[0].startDate);
  };

  const getActualEndDate = () => {
    const completed = milestones.filter((m) => m.status === "Completed");
    if (completed.length === 0) return "In Progress";

    const latest = completed.reduce((a, b) =>
      new Date(a.endDate) > new Date(b.endDate) ? a : b
    );
    return formatDateForDisplay(latest.endDate);
  };

  return (
    <div className={styles.generalContent}>
      {error && (
        <div
          style={{
            background: "#fee",
            color: "#c33",
            padding: "10px",
            marginBottom: "20px",
            borderRadius: "4px",
            border: "1px solid #fcc",
          }}
        >
          {error}
        </div>
      )}

      <div className={styles.topSection}>
        <div className={styles.leftColumn}>
          <div className={styles.fieldGroup}>
            <label>Planned Start Date</label>
            <div className={styles.fieldValue}>
              {project.plannedStartDate
                ? formatDateForDisplay(project.plannedStartDate.toString())
                : "Not set"}
            </div>
          </div>
          <div className={styles.fieldGroup}>
            <label>Planned End Date</label>
            <div className={styles.fieldValue}>
              {project.plannedEndDate
                ? formatDateForDisplay(project.plannedEndDate.toString())
                : "Not set"}
            </div>
          </div>
        </div>

        <div className={styles.rightColumn}>
          <div className={styles.fieldGroup}>
            <label>Actual Start Date</label>
            <div className={styles.fieldValue}>{getActualStartDate()}</div>
          </div>
          <div className={styles.fieldGroup}>
            <label>Actual End Date</label>
            <div className={styles.fieldValue}>{getActualEndDate()}</div>
          </div>
        </div>
      </div>

      <div className={styles.divider}></div>

      {/* Milestones Section */}
      <div className={styles.actualsSection}>
        <div className={styles.fieldGroup}>
          <div className={styles.actualsHeader}>
            <label>Milestones</label>
            <button
              className={styles.addInvoiceButton}
              onClick={() => setShowAddMilestone(!showAddMilestone)}
              disabled={loading}
            >
              {loading ? "Loading..." : showAddMilestone ? "Cancel" : "Add Milestone"}
            </button>
          </div>

          {showAddMilestone && (
            <div className={styles.invoiceForm}>
              <div className={styles.formRow}>
                <div className={styles.formField}>
                  <label>Task *</label>
                  <input
                    type="text"
                    className={styles.formInput}
                    value={newMilestone.title}
                    onChange={(e) =>
                      setNewMilestone({ ...newMilestone, title: e.target.value })
                    }
                    placeholder="Enter task name"
                    required
                  />
                </div>
                <div className={styles.formField}>
                  <label>Status</label>
                  <select
                    className={styles.formSelect}
                    value={newMilestone.status}
                    onChange={(e) =>
                      setNewMilestone({
                        ...newMilestone,
                        status: e.target.value as Milestone["status"],
                      })
                    }
                  >
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formField}>
                  <label>Description *</label>
                  <input
                    type="text"
                    className={styles.formInput}
                    value={newMilestone.description}
                    onChange={(e) =>
                      setNewMilestone({ ...newMilestone, description: e.target.value })
                    }
                    placeholder="Enter description"
                    required
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formField}>
                  <label>Start Date *</label>
                  <input
                    type="date"
                    className={styles.formInput}
                    value={newMilestone.startDate}
                    onChange={(e) =>
                      setNewMilestone({ ...newMilestone, startDate: e.target.value })
                    }
                    required
                  />
                </div>
                <div className={styles.formField}>
                  <label>End Date *</label>
                  <input
                    type="date"
                    className={styles.formInput}
                    value={newMilestone.endDate}
                    onChange={(e) =>
                      setNewMilestone({ ...newMilestone, endDate: e.target.value })
                    }
                    min={newMilestone.startDate}
                    required
                  />
                </div>
              </div>

              <div className={styles.formActions}>
                <button
                  className={styles.saveInvoiceButton}
                  onClick={handleAddMilestone}
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save Milestone"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddMilestone(false)}
                  style={{ marginLeft: "10px", background: "#ccc" }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className={styles.tableContainer}>
            <table className={styles.actualsTable}>
              <thead>
                <tr>
                  <th>Task</th>
                  <th>Description</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} style={{ textAlign: "center", padding: "20px" }}>
                      Loading milestones...
                    </td>
                  </tr>
                ) : milestones.length === 0 ? (
                  <tr>
                    <td colSpan={5} style={{ textAlign: "center", padding: "20px" }}>
                      No milestones found. Add your first milestone!
                    </td>
                  </tr>
                ) : (
                  milestones.map((milestone) => (
                    <tr key={milestone.id}>
                      <td style={{ fontWeight: "600" }}>{milestone.title}</td>
                      <td>{milestone.description}</td>
                      <td>{formatDateForDisplay(milestone.startDate)}</td>
                      <td>{formatDateForDisplay(milestone.endDate)}</td>
                      <td className={styles.statusCell}>
                        <StatusIcon status={milestone.status} />
                        <select
                          value={milestone.status}
                          onChange={(e) =>
                            handleStatusChange(
                              milestone.id,
                              e.target.value as Milestone['status'],
                            )
                          }
                          className={`${styles.statusSelect} ${getStatusClass(milestone.status)}`}
                        >
                          <option value="Not Started">Not Started</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                          <option value="Closed">Closed</option>
                        </select>
                      </td>

                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
