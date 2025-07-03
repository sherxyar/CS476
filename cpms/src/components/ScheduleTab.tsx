// ✅ ScheduleTab.tsx (Frontend)
"use client";
import { useEffect, useState } from "react";
import styles from "../styles/ProjectModal.module.css";
import type { Project } from "@/types/Project";

type Milestone = {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: "Not Started" | "In Progress" | "Completed" | "Closed";
};

type Props = {
  project: Project;
};

export default function ScheduleTab({ project }: Props) {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [showAddMilestone, setShowAddMilestone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newMilestone, setNewMilestone] = useState<Omit<Milestone, "id">>({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "Not Started"
  });

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        setLoading(true);
        // Use project.id instead of project.projectID
        const res = await fetch(`/api/projects/${project.id}/schedule`);
        
        if (!res.ok) {
          throw new Error(`Failed to fetch schedule: ${res.status}`);
        }
        
        const data = await res.json();
        setMilestones(
          data?.milestones?.map((m: any) => ({
            id: m.id,
            title: m.title,
            description: m.description,
            startDate: new Date(m.startDate).toISOString().split('T')[0], // Format for date input
            endDate: new Date(m.endDate).toISOString().split('T')[0],
            status: m.status
          })) || []
        );
      } catch (error) {
        console.error("Failed to fetch milestones:", error);
      } finally {
        setLoading(false);
      }
    };

    if (project.id) {
      fetchSchedule();
    }
  }, [project.id]);

  const handleAddMilestone = async () => {
    const { title, description, startDate, endDate, status } = newMilestone;
    if (!title || !description || !startDate || !endDate) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`/api/projects/${project.id}/schedule/milestones`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, startDate, endDate, status })
      });

      if (!res.ok) {
        throw new Error(`Failed to create milestone: ${res.status}`);
      }

      const saved = await res.json();
      setMilestones([
        ...milestones,
        {
          id: saved.id,
          title: saved.title,
          description: saved.description,
          startDate: new Date(saved.startDate).toISOString().split('T')[0],
          endDate: new Date(saved.endDate).toISOString().split('T')[0],
          status: saved.status
        }
      ]);

      setNewMilestone({
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        status: "Not Started"
      });
      setShowAddMilestone(false);
    } catch (error) {
      console.error("Failed to add milestone:", error);
      alert("Failed to add milestone. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (index: number, newStatus: Milestone["status"]) => {
    const milestone = milestones[index];
    try {
      const res = await fetch(`/api/milestones/${milestone.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });
      
      if (!res.ok) {
        throw new Error(`Status update failed: ${res.status}`);
      }

      const updated = [...milestones];
      updated[index].status = newStatus;
      setMilestones(updated);
    } catch (error) {
      console.error("Failed to update milestone status:", error);
      alert("Failed to update milestone status. Please try again.");
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

  const formatDateForDisplay = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return dateString;
    }
  };

  return (
    <div className={styles.generalContent}>
      <div className={styles.topSection}>
        <div className={styles.leftColumn}>
          <div className={styles.fieldGroup}>
            <label>Planned Start Date</label>
            <div className={styles.fieldValue}>
              {project.plannedStartDate ? formatDateForDisplay(project.plannedStartDate.toString()) : "Not set"}
            </div>
          </div>
          <div className={styles.fieldGroup}>
            <label>Planned End Date</label>
            <div className={styles.fieldValue}>
              {project.plannedEndDate ? formatDateForDisplay(project.plannedEndDate.toString()) : "Not set"}
            </div>
          </div>
        </div>

        <div className={styles.rightColumn}>
          <div className={styles.fieldGroup}>
            <label>Actual Start Date</label>
            <div className={styles.fieldValue}>
              {milestones.length > 0 ? formatDateForDisplay(milestones[0].startDate) : "Not started"}
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <label>Actual End Date</label>
            <div className={styles.fieldValue}>
              {milestones.some(m => m.status === "Completed") ? "Completed" : "In Progress"}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.divider}></div>

      <div className={styles.actualsSection}>
        <div className={styles.fieldGroup}>
          <div className={styles.actualsHeader}>
            <label>Milestones</label>
            <button
              className={styles.addInvoiceButton}
              onClick={() => setShowAddMilestone(!showAddMilestone)}
              disabled={loading}
            >
              {loading ? "Loading..." : "Add Milestone"}
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
                    onChange={(e) => setNewMilestone({ ...newMilestone, title: e.target.value })}
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
                      setNewMilestone({ ...newMilestone, status: e.target.value as Milestone["status"] })
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
                    onChange={(e) => setNewMilestone({ ...newMilestone, description: e.target.value })}
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
                    onChange={(e) => setNewMilestone({ ...newMilestone, startDate: e.target.value })}
                    required
                  />
                </div>
                <div className={styles.formField}>
                  <label>End Date *</label>
                  <input
                    type="date"
                    className={styles.formInput}
                    value={newMilestone.endDate}
                    onChange={(e) => setNewMilestone({ ...newMilestone, endDate: e.target.value })}
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
                  milestones.map((milestone, index) => (
                    <tr key={milestone.id}>
                      <td style={{ fontWeight: "600" }}>{milestone.title}</td>
                      <td>{milestone.description}</td>
                      <td>{formatDateForDisplay(milestone.startDate)}</td>
                      <td>{formatDateForDisplay(milestone.endDate)}</td>
                      <td>
                        <select
                          value={milestone.status}
                          onChange={(e) =>
                            handleStatusChange(index, e.target.value as Milestone["status"])
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