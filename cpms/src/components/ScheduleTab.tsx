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
    status: "Not Started"
  });

  // Fetch schedule data when component mounts
  useEffect(() => {
    const fetchSchedule = async () => {
      if (!project.id) return;
      
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`/api/projects/${project.id}/milestones`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch schedule: ${response.status}`);
        }
        
        const data = await response.json();
        setSchedule({ id: data.id || 0, projectId: project.id, milestones: data.milestones || [] });
        setMilestones(data.milestones || []);
      } catch (err) {
        console.error("Failed to fetch schedule:", err);
        setError("Failed to load schedule data");
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, [project.id]);

  // Add new milestone
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
        headers: { 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({ 
          title, 
          description, 
          startDate, 
          endDate, 
          status 
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Milestone creation failed:", errorData);
        throw new Error(`Failed to create milestone: ${response.status} - ${errorData.error}`);
      }

      const savedMilestone = await response.json();
      
      // Add the new milestone to the list
      setMilestones(prev => [...prev, savedMilestone]);

      // Reset form
      setNewMilestone({
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        status: "Not Started"
      });
      setShowAddMilestone(false);
    } catch (err) {
      console.error("Failed to add milestone:", err);
      setError("Failed to add milestone. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Update milestone status
  const handleStatusChange = async (milestoneId: number, newStatus: Milestone["status"]) => {
    try {
      setError(null);
      
      const response = await fetch(`/api/projects/${project.id}/milestones`, {
        method: "PATCH",
        headers: { 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({ 
          milestoneId, 
          status: newStatus 
        })
      });
      
      if (!response.ok) {
        throw new Error(`Status update failed: ${response.status}`);
      }

      // Update the milestone in the list
      setMilestones(prev => 
        prev.map(milestone => 
          milestone.id === milestoneId 
            ? { ...milestone, status: newStatus }
            : milestone
        )
      );
    } catch (err) {
      console.error("Failed to update milestone status:", err);
      setError("Failed to update milestone status. Please try again.");
    }
  };

  // Get CSS class for status
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

  // Format date for display
  const formatDateForDisplay = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return dateString;
    }
  };

  // Get actual start date from milestones
  const getActualStartDate = () => {
    if (milestones.length === 0) return "Not started";
    const sortedMilestones = [...milestones].sort((a, b) => 
      new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );
    return formatDateForDisplay(sortedMilestones[0].startDate);
  };

  // Get actual end date from milestones
  const getActualEndDate = () => {
    const completedMilestones = milestones.filter(m => m.status === "Completed");
    if (completedMilestones.length === 0) return "In Progress";
    
    const latestCompleted = completedMilestones.reduce((latest, current) => 
      new Date(current.endDate) > new Date(latest.endDate) ? current : latest
    );
    return formatDateForDisplay(latestCompleted.endDate);
  };

  return (
    <div className={styles.generalContent}>
      {/* Error Display */}
      {error && (
        <div style={{ 
          background: "#fee", 
          color: "#c33", 
          padding: "10px", 
          marginBottom: "20px",
          borderRadius: "4px",
          border: "1px solid #fcc"
        }}>
          {error}
        </div>
      )}

      {/* Project Schedule Overview */}
      <div className={styles.topSection}>
        <div className={styles.leftColumn}>
          <div className={styles.fieldGroup}>
            <label>Planned Start Date</label>
            <div className={styles.fieldValue}>
              {project.plannedStartDate ? 
                formatDateForDisplay(project.plannedStartDate.toString()) : 
                "Not set"
              }
            </div>
          </div>
          <div className={styles.fieldGroup}>
            <label>Planned End Date</label>
            <div className={styles.fieldValue}>
              {project.plannedEndDate ? 
                formatDateForDisplay(project.plannedEndDate.toString()) : 
                "Not set"
              }
            </div>
          </div>
        </div>

        <div className={styles.rightColumn}>
          <div className={styles.fieldGroup}>
            <label>Actual Start Date</label>
            <div className={styles.fieldValue}>
              {getActualStartDate()}
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <label>Actual End Date</label>
            <div className={styles.fieldValue}>
              {getActualEndDate()}
            </div>
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
              {loading ? "Loading..." : "Add Milestone"}
            </button>
          </div>

          {/* Add Milestone Form */}
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

          {/* Milestones Table */}
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
                      <td>
                        <select
                          value={milestone.status}
                          onChange={(e) =>
                            handleStatusChange(milestone.id, e.target.value as Milestone["status"])
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