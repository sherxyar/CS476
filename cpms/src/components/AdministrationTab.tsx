import { useState, useEffect } from "react";
import styles from "../styles/ProjectModal.module.css";
import type { Project } from "@/types/Project";

type TeamMember = {
  id: string;
  name: string;
  role: string;
  email: string;
  accessLevel: "Admin" | "Project Manager" | "Contributor";
  department: string;
  lastActivity: string;
};

type Props = {
  project: Project;
};

export default function AdministrationTab({ project }: Props) {
  const [showAccessModal, setShowAccessModal] = useState(false);
  const [showAddMember, setShowAddMember] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [newMemberAccess, setNewMemberAccess] = useState<TeamMember["accessLevel"]>("Contributor");

  // Fetch current team members from backend
  const fetchMembers = async () => {
    try {
      const res = await fetch(`/api/projects/${project.id}/members`);
      const data: TeamMember[] = await res.json();
      setTeamMembers(data);
    } catch (error) {
      console.error("Failed to load team members", error);  
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const filteredMembers = teamMembers.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getAccessLevelColor = (level: string) => {
    switch (level) {
      case "Admin": return styles.statusNotPaid;
      case "Project Manager": return styles.statusInProgress;
      case "Contributor": return styles.statusClosed;
      default: return "";
    }
  };

  // Add existing user by email
  const handleAddMember = async () => {
    if (!newMemberEmail) return;
    try {
      await fetch(`/api/projects/${project.id}/members`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: newMemberEmail,
          accessLevel: newMemberAccess
        })
      });
      setNewMemberEmail("");
      setNewMemberAccess("Contributor");
      setShowAddMember(false);
      fetchMembers();
    } catch (error) {
      console.error("Failed to add member", error);
    }
  };

  return (
    <div className={styles.generalContent}>
      {/* Top info */}
      <div className={styles.topSection}>
        <div className={styles.leftColumn}>
          <div className={styles.fieldGroup}>
            <label>Project Owner</label>
            <div className={styles.fieldValue}>{project.projectManager?.name || 'Unassigned'}</div>
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

          {/* Search */}
          <div style={{ marginBottom: '16px' }}>
            <input
              type="text"
              className={styles.formInput}
              placeholder="Search team members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ maxWidth: '300px' }}
            />
          </div>

          {/* Add Member Form (select existing user) */}
          {showAddMember && (
            <div className={styles.invoiceForm}>
              <div className={styles.formRow}>
                <div className={styles.formField}>
                  <label>User Email</label>
                  <input
                    type="email"
                    className={styles.formInput}
                    value={newMemberEmail}
                    onChange={(e) => setNewMemberEmail(e.target.value)}
                    placeholder="Enter user email"
                  />
                </div>
                <div className={styles.formField}>
                  <label>Access Level</label>
                  <select
                    className={styles.formSelect}
                    value={newMemberAccess}
                    onChange={(e) => setNewMemberAccess(e.target.value as TeamMember["accessLevel"])}
                  >
                    <option value="Contributor">Contributor</option>
                    <option value="Project Manager">Project Manager</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
              </div>
              <div className={styles.formActions}>
                <button className={styles.saveInvoiceButton} onClick={handleAddMember}>
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
                {filteredMembers.map(member => (
                  <tr key={member.id}>
                    <td style={{ fontWeight: '600' }}>{member.name}</td>
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
            <button className={styles.viewDetailsButton}>
              Export Project Data
            </button>
            <button className={styles.viewDetailsButton}>
              Audit Log
            </button>
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
                    {teamMembers.filter(m => m.accessLevel === "Admin").length} members
                  </span>
                </div>
                <div className={styles.summaryItem}>
                  <span className={styles.summaryLabel}>Project Manager Access</span>
                  <span className={styles.summaryValue}>
                    {teamMembers.filter(m => m.accessLevel === "Project Manager").length} members
                  </span>
                </div>
                <div className={styles.summaryItem}>
                  <span className={styles.summaryLabel}>Contributor Access</span>
                  <span className={styles.summaryValue}>
                    {teamMembers.filter(m => m.accessLevel === "Contributor").length} members
                  </span>
                </div>

              </div>

              <h4 style={{ marginTop: '24px', marginBottom: '16px' }}>Access Permissions</h4>
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
