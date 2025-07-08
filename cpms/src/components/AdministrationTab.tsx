import { useState, useEffect } from "react";
import styles from "../styles/ProjectModal.module.css";
import type { Project } from "@/types/Project";

// Data type
type TeamMember = {
  id: string;
  name: string;
  role: string;
  email: string;
  accessLevel: "Admin" | "Project Manager" | "Contributor";
  department: string;
  lastActivity: string;
};

// user select
interface UserOption {
  id: number;
  name: string;
  email: string;
}

interface Props {
  project: Project;
}

export default function AdministrationTab({ project }: Props) {
  const [showAccessModal, setShowAccessModal] = useState(false);
  const [showAddMember, setShowAddMember] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [userOptions, setUserOptions] = useState<UserOption[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | "">("");
  const [newMemberAccess, setNewMemberAccess] = useState<TeamMember["accessLevel"]>(
    "Contributor"
  );

// GET- Fetch current team members for this project
  const fetchMembers = async () => {
    try {
      const res = await fetch(`/api/projects/${project.id}/members`);
      const data: TeamMember[] = await res.json();
      setTeamMembers(data);
    } catch (error) {
      console.error("Failed to load team members", error);
    }
  };

  // Fetch all users (for dropdown)
  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users"); // adjust to your route
      const data: UserOption[] = await res.json();
      setUserOptions(data);
    } catch (error) {
      console.error("Failed to load users", error);
    }
  };


  useEffect(() => {
    fetchMembers();
    fetchUsers();
  }, []);

 
  const filteredMembers = teamMembers.filter((member) =>
    [member.name, member.email, member.role]
      .some((field) => field.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  
  const getAccessLevelColor = (level: string) => {
    switch (level) {
      case "Admin":
        return styles.statusNotPaid;
      case "Project Manager":
        return styles.statusInProgress;
      case "Contributor":
        return styles.statusClosed;
      default:
        return "";
    }
  };

  // handle member add
  const handleAddMember = async () => {
    if (!selectedUserId) return;
    try {
      await fetch(`/api/projects/${project.id}/members`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: selectedUserId,
          accessLevel: newMemberAccess,
        }),
      });
      setSelectedUserId("");
      setNewMemberAccess("Contributor");
      setShowAddMember(false);
      fetchMembers();
    } catch (error) {
      console.error("Failed to add member", error);
    }
  };

  return (
    <div className={styles.generalContent}>
      <div className={styles.topSection}>
        <div className={styles.leftColumn}>
          <div className={styles.fieldGroup}>
            <label>Project Owner</label>
            <div className={styles.fieldValue}>
              {project.projectManager?.name || "Unassigned"}
            </div>
          </div>
        </div>
        <div className={styles.rightColumn}>
          <div className={styles.fieldGroup}>
            <label>Total Team Members</label>
            <div className={styles.fieldValue}>{teamMembers.length}</div>
          </div>
        </div>
      </div>

      <div className={styles.divider} />

      {/* Team Access Management */}
      <div className={styles.actualsSection}>
        <div className={styles.fieldGroup}>
          <div className={styles.actualsHeader}>
            <label>Team Access Management</label>
            <div className={styles.buttonGroup}>
              <button
                className={styles.viewDetailsButton}
                onClick={() => setShowAccessModal(true)}
              >
                View All Access
              </button>
              <button
                className={styles.addInvoiceButton}
                onClick={() => setShowAddMember(true)}
              >
                Add Team Member
              </button>
            </div>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <input
              type="text"
              className={styles.formInput}
              placeholder="Search team members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ maxWidth: "300px" }}
            />
          </div>

          {showAddMember && (
            <div className={styles.invoiceForm}>
              <div className={styles.formRow}>
                <div className={styles.formField}>
                  <label>Select User</label>
                  <select
                    className={styles.formSelect}
                    value={selectedUserId}
                    onChange={(e) =>
                      setSelectedUserId(
                        e.target.value === "" ? "" : Number(e.target.value)
                      )
                    }
                  >
                    <option value="">-- Choose a user --</option>
                    {userOptions.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name} ({user.email})
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.formField}>
                  <label>Access Level</label>
                  <select
                    className={styles.formSelect}
                    value={newMemberAccess}
                    onChange={(e) =>
                      setNewMemberAccess(e.target.value as TeamMember["accessLevel"])
                    }
                  >
                    <option value="Contributor">Contributor</option>
                    <option value="Project Manager">Project Manager</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
              </div>
              <div className={styles.formActions}>
                <button
                  className={styles.saveInvoiceButton}
                  disabled={!selectedUserId}
                  onClick={handleAddMember}
                >
                  Add Team Member
                </button>
              </div>
            </div>
          )}

          {/* Team Members Table */}
          <div className={styles.tableContainer}>
            <table className={styles.actualsTable}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Access Level</th>
                  <th>Last Activity</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.map((member) => (
                  <tr key={member.id}>
                    <td style={{ fontWeight: "600" }}>{member.name}</td>
                    <td>{member.role}</td>
                    <td>{member.email}</td>
                    <td>{member.department}</td>
                    <td>
                      <span className={getAccessLevelColor(member.accessLevel)}>
                        {member.accessLevel}
                      </span>
                    </td>
                    <td>{member.lastActivity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className={styles.divider} />

      {/* Quick Actions */}
      <div className={styles.actualsSection}>
        <div className={styles.fieldGroup}>
          <label>Quick Actions</label>
          <div className={styles.buttonGroup}>
            <button className={styles.viewDetailsButton}>Export Project Data</button>
            <button className={styles.viewDetailsButton}>Audit Log</button>
          </div>
        </div>
      </div>

      {/* Access Modal */}
      {showAccessModal && (
        <div className={styles.popupOverlay}>
          <div className={styles.popup}>
            <div className={styles.popupHeader}>
              <h3>Team Access Overview</h3>
              <button
                className={styles.popupCloseButton}
                onClick={() => setShowAccessModal(false)}
              >
                ✕
              </button>
            </div>
            <div className={styles.popupContent}>
              <div className={styles.summaryCard}>
                <div className={styles.summaryItem}>
                  <span className={styles.summaryLabel}>Admin Access</span>
                  <span className={styles.summaryValue}>
                    {teamMembers.filter((m) => m.accessLevel === "Admin").length} members
                  </span>
                </div>
                <div className={styles.summaryItem}>
                  <span className={styles.summaryLabel}>Project Manager Access</span>
                  <span className={styles.summaryValue}>
                    {
                      teamMembers.filter((m) => m.accessLevel === "Project Manager")
                        .length
                    } members
                  </span>
                </div>
                <div className={styles.summaryItem}>
                  <span className={styles.summaryLabel}>Contributor Access</span>
                  <span className={styles.summaryValue}>
                    {teamMembers.filter((m) => m.accessLevel === "Contributor").length} members
                  </span>
                </div>
              </div>

              <h4 style={{ marginTop: "24px", marginBottom: "16px" }}>
                Access Permissions
              </h4>
              <div className={styles.tableContainer}>
                <table className={styles.historyTable}>
                  <thead>
                    <tr>
                      <th>Permission</th>
                      <th>Admin</th>
                      <th>Project Manager</th>
                      <th>Contributor</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>View Project</td>
                      <td>✓</td>
                      <td>✓</td>
                      <td>✓</td>
                    </tr>
                    <tr>
                      <td>Edit Project Details</td>
                      <td>✓</td>
                      <td>✓</td>
                      <td>✗</td>
                    </tr>
                    <tr>
                      <td>Manage Financials</td>
                      <td>✓</td>
                      <td>✓</td>
                      <td>✗</td>
                    </tr>
                    <tr>
                      <td>Approve Changes</td>
                      <td>✓</td>
                      <td>✓</td>
                      <td>✗</td>
                    </tr>
                    <tr>
                      <td>Manage Team Access</td>
                      <td>✓</td>
                      <td>✗</td>
                      <td>✗</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
