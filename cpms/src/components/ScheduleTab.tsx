
"use client";
import { useState } from "react";
import styles from "../styles/ProjectModal.module.css";
import type { Project } from "@/types/Project";

type Milestone = {
  task: string;
  description: string;
  startDate: string;
  endDate: string;
  status: "Not Started" | "In Progress" | "Completed" | "Closed";
};


type Props = {
  project: Project;
}; 

export default function ScheduleTab({ project: _project }: Props) {
  const [milestones, setMilestones] = useState<Milestone[]>([
    {
      task: "Site Survey & Assessment",
      description: "Complete initial site evaluation and measurements",
      startDate: "Jan 15, 2025",
      endDate: "Jan 18, 2025",
      status: "Completed"
    },
    {
      task: "Material Procurement",
      description: "Order and receive all necessary construction materials",
      startDate: "Jan 20, 2025",
      endDate: "Jan 25, 2025",
      status: "In Progress"
    },
    {
      task: "Surface Preparation",
      description: "Clean and prepare existing pavement surface",
      startDate: "Jan 28, 2025",
      endDate: "Feb 3, 2025",
      status: "Not Started"
    },
    {
      task: "Pavement Repair Work",
      description: "Execute main repair work including crack sealing and resurfacing",
      startDate: "Feb 5, 2025",
      endDate: "Feb 15, 2025",
      status: "Not Started"
    },
    {
      task: "Final Inspection",
      description: "Quality control inspection and project completion review",
      startDate: "Feb 18, 2025",
      endDate: "Feb 20, 2025",
      status: "Not Started"
    }
  ]);

  const [showAddMilestone, setShowAddMilestone] = useState(false);
  const [newMilestone, setNewMilestone] = useState<Milestone>({
    task: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "Not Started"
  });

  const handleAddMilestone = () => {
    if (newMilestone.task && newMilestone.description && newMilestone.startDate && newMilestone.endDate) {
      setMilestones([...milestones, newMilestone]);
      setNewMilestone({
        task: "",
        description: "",
        startDate: "",
        endDate: "",
        status: "Not Started"
      });
      setShowAddMilestone(false);
    }
  };

  const handleStatusChange = (index: number, newStatus: Milestone["status"]) => {
    const updatedMilestones = [...milestones];
    updatedMilestones[index].status = newStatus;
    setMilestones(updatedMilestones);
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

  return (
    <div className={styles.generalContent}>
      <div className={styles.topSection}>
        <div className={styles.leftColumn}>
          <div className={styles.fieldGroup}>
            <label>Planned Start Date</label>
            <div className={styles.fieldValue}>
              January 15, 2025
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <label>Planned End Date</label>
            <div className={styles.fieldValue}>
              February 20, 2025
            </div>
          </div>
        </div>

        <div className={styles.rightColumn}>
          <div className={styles.fieldGroup}>
            <label>Actual Start Date</label>
            <div className={styles.fieldValue}>
              January 16, 2025
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <label>Actual End Date</label>
            <div className={styles.fieldValue}>
              In Progress
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
            >
              Add Milestone
            </button>
          </div>

          {showAddMilestone && (
            <div className={styles.invoiceForm}>
              <div className={styles.formRow}>
                <div className={styles.formField}>
                  <label>Task</label>
                  <input
                    type="text"
                    className={styles.formInput}
                    value={newMilestone.task}
                    onChange={(e) => setNewMilestone({ ...newMilestone, task: e.target.value })}
                    placeholder="Enter task name"
                  />
                </div>
                <div className={styles.formField}>
                  <label>Status</label>
                  <select
                    className={styles.formSelect}
                    value={newMilestone.status}
                    onChange={(e) => setNewMilestone({ ...newMilestone, status: e.target.value as Milestone["status"] })}
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
                  <label>Description</label>
                  <input
                    type="text"
                    className={styles.formInput}
                    value={newMilestone.description}
                    onChange={(e) => setNewMilestone({ ...newMilestone, description: e.target.value })}
                    placeholder="Enter description"
                  />
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.formField}>
                  <label>Start Date</label>
                  <input
                    type="date"
                    className={styles.formInput}
                    value={newMilestone.startDate}
                    onChange={(e) => setNewMilestone({ ...newMilestone, startDate: e.target.value })}
                  />
                </div>
                <div className={styles.formField}>
                  <label>End Date</label>
                  <input
                    type="date"
                    className={styles.formInput}
                    value={newMilestone.endDate}
                    onChange={(e) => setNewMilestone({ ...newMilestone, endDate: e.target.value })}
                  />
                </div>
              </div>
              <div className={styles.formActions}>
                <button className={styles.saveInvoiceButton} onClick={handleAddMilestone}>
                  Save Milestone
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
                {milestones.map((milestone, index) => (
                  <tr key={index}>
                    <td style={{ fontWeight: '600' }}>{milestone.task}</td>
                    <td>{milestone.description}</td>
                    <td>{milestone.startDate}</td>
                    <td>{milestone.endDate}</td>
                    <td>
                      <select
                        value={milestone.status}
                        onChange={(e) => handleStatusChange(index, e.target.value as Milestone["status"])}
                        className={`${styles.statusSelect} ${getStatusClass(milestone.status)}`}
                      >
                        <option value="Not Started">Not Started</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
