"use client";
import { useState, useEffect, useCallback, FormEvent } from "react";
import styles from "../styles/ProjectModal.module.css";

// Updated to match API response format
export type ChangeLogEntry = {
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
  requestedById: number;
  requestedBy: { id: number; name: string; email: string };
  approvedById: number | null;
  approvedBy: { id: number; name: string; email: string } | null;
  status: "Pending" | "Approved" | "Rejected" | "Implemented";
  priority: "Low" | "Medium" | "High" | "Critical";
  estimatedImpact: string;
};

type Props = {
  project: { id: string };
};

type ChangeDraft = {
  description: string;
  impactArea: string;
  justification: string;
};



/**
 * Change-Log Tab
 * – Loads existing rows from `/api/projects/[id]/change-log`
 * – Creates new rows with POST to the same endpoint
 * – Uses optimistic-update so the UI feels instant
 */
export default function ChangeLogTab({ project }: Props) {
  // State for current user
  const [currentUser, setCurrentUser] = useState<{ id: number; name: string; email: string } | null>(null);
  
  /* ──────────────────────────────── state ─────────────────────────────── */
  const [changeLog, setChangeLog] = useState<ChangeLogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showAddChange, setShowAddChange] = useState(false);
  const [filterType, setFilterType] = useState<ChangeLogEntry["changeType"] | "All">("All");
  const [filterStatus, setFilterStatus] = useState<ChangeLogEntry["status"] | "All">("All");

const [newChange, setNewChange] = useState<Partial<ChangeLogEntry>>({
  changeType: "Financial",
  category: "Budget",
  status: "Pending",
  priority: "Medium",
});

  // Fetch current user
  useEffect(() => {
    async function fetchCurrentUser() {
      try {
        const res = await fetch("/api/auth/me", { cache: "no-store" });
        if (res.ok) {
          const userData = await res.json();
          setCurrentUser(userData);
        }
      } catch (err) {
        console.error("Failed to fetch current user:", err);
      }
    }
    
    fetchCurrentUser();
  }, []);

  const loadChanges = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`/api/projects/${project.id}/ChangeLog`, { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: ChangeLogEntry[] = await res.json();

      data.sort((a, b) => +new Date(b.date) - +new Date(a.date));
      setChangeLog(data);
    } catch (err: unknown) {
      setError((err as Error).message ?? "Unknown error");
    } finally {
      setLoading(false);
    }
  }, [project.id]);

  useEffect(() => {
    if (project?.id) loadChanges();
  }, [project?.id, loadChanges]);

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

  const getPriorityStyle = (priority: ChangeLogEntry["priority"]) => {
    if (priority === "High") {
      return {
        backgroundColor: "#ff9800",
        color: "white",
        padding: "4px 8px",
        borderRadius: "12px",
        fontSize: "11px",
        fontWeight: 500,
      } as const;
    }
    return undefined;
  };

  // ADD change
  async function handleAddChange(e: FormEvent) {
    e.preventDefault();

    if (!currentUser) {
      alert("You must be logged in to submit a change request.");
      return;
    }

    // Basic front-end validation
    if (
      !newChange.description ||
      !newChange.impactArea ||
      !newChange.justification
    ) {
      alert("Please complete all required fields.");
      return;
    }

    const payload = {
      changeType: newChange.changeType,
      category: newChange.category,
      description: newChange.description,
      impactArea: newChange.impactArea,
      oldValue: newChange.oldValue || undefined,
      newValue: newChange.newValue || undefined,
      justification: newChange.justification,
      requestedById: currentUser.id,
      status: newChange.status,
      priority: newChange.priority,
      estimatedImpact: newChange.estimatedImpact || "To be determined",
      date: new Date().toISOString(),
    };

    const tempId = `tmp-${Date.now()}`;
    const optimistic: ChangeLogEntry = {
      id: tempId,
      date: payload.date,
      changeType: payload.changeType as ChangeLogEntry["changeType"],
      category: payload.category as ChangeLogEntry["category"],
      description: payload.description!,
      impactArea: payload.impactArea!,
      oldValue: payload.oldValue,
      newValue: payload.newValue,
      justification: payload.justification!,
      requestedById: currentUser.id,
      requestedBy: currentUser,
      approvedById: null,
      approvedBy: null,
      status: payload.status as ChangeLogEntry["status"],
      priority: payload.priority as ChangeLogEntry["priority"],
      estimatedImpact: payload.estimatedImpact,
    };
    setChangeLog((prev) => [optimistic, ...prev]);

    try {
      const res = await fetch(`/api/projects/${project.id}/ChangeLog`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const saved: ChangeLogEntry = await res.json();

      setChangeLog((prev) => prev.map((c) => (c.id === tempId ? saved : c)));
    } catch (err: unknown) {
      setChangeLog((prev) => prev.filter((c) => c.id !== tempId));
      alert(`Could not save change request: ${(err as Error).message}`);
    } finally {
      // Reset form
      setNewChange({ changeType: "Financial", category: "Budget", status: "Pending", priority: "Medium" });
      setShowAddChange(false);
    }
  }

  const filteredChanges = changeLog.filter((c) => {
    const typeOk = filterType === "All" || c.changeType === filterType;
    const statusOk = filterStatus === "All" || c.status === filterStatus;
    return typeOk && statusOk;
  });

  if (loading) {
    return (
      <div className={styles.generalContent}>
        <div className={styles.topSection}>
          {/* Empty card placeholders with fixed heights */}
          <div className={styles.leftColumn}>
            <div className={styles.fieldGroup} style={{ minHeight: "80px" }}>
              <label>Total Changes</label>
              <div className={styles.fieldValue}>—</div>
            </div>
            <div className={styles.fieldGroup} style={{ minHeight: "80px" }}>
              <label>Pending Approval</label>
              <div className={styles.fieldValue}>—</div>
            </div>
          </div>
          <div className={styles.rightColumn}>
            <div className={styles.fieldGroup} style={{ minHeight: "80px" }}>
              <label>Financial Changes</label>
              <div className={styles.fieldValue}>—</div>
            </div>
            <div className={styles.fieldGroup} style={{ minHeight: "80px" }}>
              <label>Schedule Changes</label>
              <div className={styles.fieldValue}>—</div>
            </div>
          </div>
        </div>

        <div className={styles.divider} />

        {/* Table section with fixed height */}
        <div className={styles.actualsSection}>
          <div className={styles.fieldGroup}>
            <div className={styles.actualsHeader}>
              <label>Change Request Log</label>
              <div className={styles.spinnerContainer}>
                <div className={styles.spinner}></div>
                <span>Loading...</span>
              </div>
            </div>
            
            {/* Empty table with fixed height */}
            <div className={styles.tableContainer} style={{ minHeight: "300px" }}>
              {/* Loading indicator centered in table area */}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.generalContent}>
        <div className={styles.topSection}>
          {/* Same empty placeholders as loading state */}
          <div className={styles.leftColumn}>
            <div className={styles.fieldGroup} style={{ minHeight: "80px" }}>
              <label>Total Changes</label>
              <div className={styles.fieldValue}>—</div>
            </div>
            <div className={styles.fieldGroup} style={{ minHeight: "80px" }}>
              <label>Pending Approval</label>
              <div className={styles.fieldValue}>—</div>
            </div>
          </div>
          <div className={styles.rightColumn}>
            <div className={styles.fieldGroup} style={{ minHeight: "80px" }}>
              <label>Financial Changes</label>
              <div className={styles.fieldValue}>—</div>
            </div>
            <div className={styles.fieldGroup} style={{ minHeight: "80px" }}>
              <label>Schedule Changes</label>
              <div className={styles.fieldValue}>—</div>
            </div>
          </div>
        </div>

        <div className={styles.divider} />

        {/* Error message with same height as table */}
        <div className={styles.actualsSection}>
          <div className={styles.fieldGroup}>
            <div className={styles.actualsHeader}>
              <label>Change Request Log</label>
            </div>
            
            <div className={styles.tableContainer} style={{ minHeight: "300px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div className={styles.errorMessage}>
                Error: {error}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.generalContent}>
      {/* ───────── summary cards ───────── */}
      <div className={styles.topSection}>
        <div className={styles.leftColumn}>
          <div className={styles.fieldGroup}>
            <label>Total Changes</label>
            <div className={styles.fieldValue}>{changeLog.length}</div>
          </div>
          <div className={styles.fieldGroup}>
            <label>Pending Approval</label>
            <div className={styles.fieldValue}>
              {changeLog.filter((c) => c.status === "Pending").length}
            </div>
          </div>
        </div>
        <div className={styles.rightColumn}>
          <div className={styles.fieldGroup}>
            <label>Financial Changes</label>
            <div className={styles.fieldValue}>
              {changeLog.filter((c) => c.changeType === "Financial").length}
            </div>
          </div>
          <div className={styles.fieldGroup}>
            <label>Schedule Changes</label>
            <div className={styles.fieldValue}>
              {changeLog.filter((c) => c.changeType === "Schedule").length}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.divider} />

      {/*  table & filters  */}
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
              <select
              className={styles.formSelect}
              value={filterType}
              onChange={(e) =>
                setFilterType(e.target.value as ChangeLogEntry["changeType"] | "All")
              }
              >
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
              <select
                className={styles.formSelect}
                value={filterStatus}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setFilterStatus(e.target.value as ChangeLogEntry["status"] | "All")
                }
              >
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
                {filteredChanges.map((c) => (
                  <tr key={c.id}>
                    <td style={{ fontWeight: 600 }}>{c.id}</td>
                    <td>{new Date(c.date).toLocaleDateString()}</td>
                    <td>{c.changeType}</td>
                    <td style={{ maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis" }}>
                      {c.description}
                    </td>
                    <td>{c.impactArea}</td>
                    <td>
                      <span className={styles.statusInProgress} style={getPriorityStyle(c.priority)}>
                        {c.priority}
                      </span>
                    </td>
                    <td>
                      <span className={getStatusClass(c.status)}>{c.status}</span>
                    </td>
                    <td>{c.requestedBy?.name || "Unknown"}</td>
                  </tr>
                ))}
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

      {/* ───────── add-popup ───────── */}
      {showAddChange && (
        <div className={styles.popupOverlay} onClick={() => setShowAddChange(false)}>
          <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
            <div className={styles.popupHeader}>
              <h3>Add Change Request</h3>
              <button className={styles.popupCloseButton} onClick={() => setShowAddChange(false)}>
                ✖
              </button>
            </div>
            <form className={styles.popupContent} onSubmit={handleAddChange}>
              {/* Form fields - removed "Requested By" field */}
              <div className={styles.formRow}>
                <div className={styles.formField}>
                  <label>Change Type</label>
                  <select
                    className={styles.formSelect}
                    value={newChange.changeType}
                    onChange={(e) =>
                      setNewChange({ ...newChange, changeType: e.target.value as ChangeLogEntry["changeType"] })
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
                      setNewChange({ ...newChange, category: e.target.value as ChangeLogEntry["category"] })
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
              </div>
              <div className={styles.formRow}>
                <div className={styles.formField} style={{ width: '100%' }}>
                  <label>Estimated Impact</label>
                  <input
                    type="text"
                    className={styles.formInput}
                    value={newChange.estimatedImpact}
                    onChange={(e) => setNewChange({ ...newChange, estimatedImpact: e.target.value })}
                    placeholder="Expected impact on cost, schedule, scope"
                  />
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.formField} style={{ width: '100%' }}>
                  <label>Requesting As</label>
                  <input
                    type="text"
                    className={styles.formInput}
                    value={currentUser?.name || "Loading..."}
                    disabled
                    style={{ backgroundColor: "#f3f4f6" }}
                  />
                </div>
              </div>
              <div className={styles.formActions}>
                <button type="submit" className={styles.saveInvoiceButton}>
                  Submit Change Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
