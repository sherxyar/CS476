"use client";
import { useState, type CSSProperties } from "react";
import styles from "../styles/ProjectModal.module.css";
import type { Project } from "@/types/Project";

// ────────────────────────────────────────────────────────────── types

type ChangeLogEntry = {
  id: string;
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
  project: Project; // reserved for future use
};

// ────────────────────────────────────────────────────────────── component

export default function ChangeLogTab({ project: _project }: Props) {
  /* ----------------------------- state ----------------------------- */
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

  /* ---------------------------- helpers ---------------------------- */
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

  /* ------------------------- derived values ------------------------ */
  const filteredChanges = changeLog.filter((c) => {
    const typeMatch = filterType === "All" || c.changeType === filterType;
    const statusMatch = filterStatus === "All" || c.status === filterStatus;
    return typeMatch && statusMatch;
  });

  /* --------------------------- handlers ---------------------------- */
  const handleAddChange = () => {
    if (
      newChange.description &&
      newChange.impactArea &&
      newChange.justification &&
      newChange.requestedBy
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
      setNewChange((prev) => ({ ...prev, description: "", impactArea: "", oldValue: "", newValue: "", justification: "", requestedBy: "", estimatedImpact: "" }));
      setShowAddChange(false);
    }
  };

  /*  UI  */
  return (
    <div className={styles.generalContent}>
      {/*  summary boxes  */}
      <div className={styles.topSection}>
        <div className={styles.leftColumn}>
          <div className={styles.fieldGroup}>
            <label>Total Changes</label>
            <div className={styles.fieldValue}>{changeLog.length}</div>
          </div>
          <div className={styles.fieldGroup}>
            <label>Pending Approval</label>
            <div className={styles.fieldValue}>{changeLog.filter((c) => c.status === "Pending").length}</div>
          </div>
        </div>
        <div className={styles.rightColumn}>
          <div className={styles.fieldGroup}>
            <label>Financial Changes</label>
            <div className={styles.fieldValue}>{changeLog.filter((c) => c.changeType === "Financial").length}</div>
          </div>
          <div className={styles.fieldGroup}>
            <label>Schedule Changes</label>
            <div className={styles.fieldValue}>{changeLog.filter((c) => c.changeType === "Schedule").length}</div>
          </div>
        </div>
      </div>

      <div className={styles.divider} />

      {/*  filters & add button  */}
      <div className={styles.actualsSection}>
        <div className={styles.fieldGroup}>
          <div className={styles.actualsHeader}>
            <label>Change Request Log</label>
            <button className={styles.addInvoiceButton} onClick={() => setShowAddChange(true)}>
              Add Change Request
            </button>
          </div>

          {/* filters */}
          <div className={styles.formRow} style={{ marginBottom: 16 }}>
            <div className={styles.formField}>
              <label>Filter by Type</label>
              <select className={styles.formSelect} value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                <option value="All">All Types</option>
                <option value="Financial">Financial</option>
                <option value="Schedule">Schedule</option>
                <option value="Scope">Scope</option>
                <option value="Resource">Resource</option>
                <option value="Risk">Risk</option>
              </select>
            </div>
            <div className={styles.formField}>
              <label>Filter by Status</label>
              <select className={styles.formSelect} value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                <option value="All">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Implemented">Implemented</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>

          {/* table */}
          <div className={styles.tableContainer}>
            <table className={styles.actualsTable}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Description</th>
                  <th>Impact Area</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Requested By</th>
                </tr>
              </thead>
              <tbody>
                {filteredChanges.map((change) => {
                  const tag = getPriorityClass(change.priority);
                  const className = typeof tag === "string" ? tag : undefined;
                  const style: CSSProperties = typeof tag === "object" ? tag : {};

                  return (
                    <tr key={change.id}>
                      <td style={{ fontWeight: 600 }}>{change.id}</td>
                      <td>{change.date}</td>
                      <td>{change.changeType}</td>
                      <td style={{ maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {change.description}
                      </td>
                      <td>{change.impactArea}</td>
                      <td>
                        <span className={className} style={style}>
                          {change.priority}
                        </span>
                      </td>
                      <td>
                        <span className={getStatusClass(change.status)}>
                          {change.status}
                        </span>
                      </td>
                      <td>{change.requestedBy}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredChanges.length === 0 && (
            <div className={styles.tabContentText}>
              <p>No change requests match the current filters.</p>
            </div>
          )}
        </div>
      </div>

      {/*  add‑change popup  */}
      {showAddChange && (
        <div className={styles.popupOverlay} onClick={() => setShowAddChange(false)}>
          <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
            <div className={styles.popupHeader}>
              <h3>Add Change Request</h3>
              <button className={styles.popupCloseButton} onClick={() => setShowAddChange(false)}>
                ✖
              </button>
            </div>

            <div className={styles.popupContent}>
              <div className={styles.invoiceForm}>
                {/* row 1 */}
                <div className={styles.formRow}>
                  <div className={styles.formField}>
                    <label>Change Type</label>
                    <select
                      className={styles.formSelect}
                      value={newChange.changeType}
                      onChange={(e) => setNewChange({ ...newChange, changeType: e.target.value as ChangeLogEntry["changeType"] })}
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
                      onChange={(e) => setNewChange({ ...newChange, category: e.target.value as ChangeLogEntry["category"] })}
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

                {/* row 2 */}
                <div className={styles.formRow}>
                  <div className={styles.formField}>
                    <label>Description</label>
                    <input
                      type="text"
                      className={styles.formInput}
                      value={newChange.description}
                      onChange={(e) => setNewChange({ ...newChange, description: e.target.value })}
                      placeholder="Brief description of the change"
                    />
                  </div>
                  <div className={styles.formField}>
                    <label>Impact Area</label>
                    <input
                      type="text"
                      className={styles.formInput}
                      value={newChange.impactArea}
                      onChange={(e) => setNewChange({ ...newChange, impactArea: e.target.value })}
                      placeholder="What area of the project is affected"
                    />
                  </div>
                </div>

                {/* row 3 */}
                <div className={styles.formRow}>
                  <div className={styles.formField}>
                    <label>Old Value (Optional)</label>
                    <input
                      type="text"
                      className={styles.formInput}
                      value={newChange.oldValue}
                      onChange={(e) => setNewChange({ ...newChange, oldValue: e.target.value })}
                      placeholder="Previous value"
                    />
                  </div>
                  <div className={styles.formField}>
                    <label>New Value (Optional)</label>
                    <input
                      type="text"
                      className={styles.formInput}
                      value={newChange.newValue}
                      onChange={(e) => setNewChange({ ...newChange, newValue: e.target.value })}
                      placeholder="Proposed new value"
                    />
                  </div>
                </div>

                {/* row 4 */}
                <div className={styles.formRow}>
                  <div className={styles.formField}>
                    <label>Justification</label>
                    <input
                      type="text"
                      className={styles.formInput}
                      value={newChange.justification}
                      onChange={(e) => setNewChange({ ...newChange, justification: e.target.value })}
                      placeholder="Business justification for the change"
                    />
                  </div>
                  <div className={styles.formField}>
                    <label>Requested By</label>
                    <input
                      type="text"
                      className={styles.formInput}
                      value={newChange.requestedBy}
                      onChange={(e) => setNewChange({ ...newChange, requestedBy: e.target.value })}
                      placeholder="Name of requester"
                    />
                  </div>
                </div>

                {/* row 5 */}
                <div className={styles.formRow}>
                  <div className={styles.formField}>
                    <label>Priority</label>
                    <select
                      className={styles.formSelect}
                      value={newChange.priority}
                      onChange={(e) => setNewChange({ ...newChange, priority: e.target.value as ChangeLogEntry["priority"] })}
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
                      onChange={(e) => setNewChange({ ...newChange, estimatedImpact: e.target.value })}
                      placeholder="Expected impact (cost, schedule, scope)"
                    />
                  </div>
                </div>

                <div className={styles.formActions}>
                  <button className={styles.saveInvoiceButton} onClick={handleAddChange}>
                    Submit Change Request
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
