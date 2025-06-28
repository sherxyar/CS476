
"use client";
import { useState } from "react";
import styles from "../styles/ProjectModal.module.css";
import type { Project } from "@/types/Project";

type TeamMember = {
  id: string;
  name: string;
  role: string;
  email: string;
  accessLevel: "Admin" | "Manager" | "Contributor" | "Viewer";
  department: string;
  lastActivity: string;
};

type Props = {
 project: Project;
};

export default function AdministrationTab({ project: _project }: Props) {
  const [showAccessModal, setShowAccessModal] = useState(false);
  const [showAddMember, setShowAddMember] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: "TM001",
      name: "Jane Smith",
      role: "Project Manager",
      email: "jane.smith@company.com",
      accessLevel: "Admin",
      department: "Engineering",
      lastActivity: "2 hours ago"
    },
    {
      id: "TM002",
      name: "Mike Johnson",
      role: "Lead Engineer",
      email: "mike.johnson@company.com",
      accessLevel: "Manager",
      department: "Engineering",
      lastActivity: "1 day ago"
    },
    {
      id: "TM003",
      name: "Sarah Wilson",
      role: "Quality Analyst",
      email: "sarah.wilson@company.com",
      accessLevel: "Contributor",
      department: "Quality",
      lastActivity: "3 hours ago"
    },
    {
      id: "TM004",
      name: "David Brown",
      role: "Stakeholder",
      email: "david.brown@client.com",
      accessLevel: "Viewer",
      department: "Client",
      lastActivity: "1 week ago"
    }
  ]);

  const [newMember, setNewMember] = useState({
    name: "",
    role: "",
    email: "",
    accessLevel: "Viewer" as TeamMember["accessLevel"],
    department: ""
  });

  const filteredMembers = teamMembers.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getAccessLevelColor = (level: string) => {
    switch (level) {
      case "Admin": return styles.statusNotPaid;
      case "Manager": return styles.statusInProgress;
      case "Contributor": return styles.statusClosed;
      case "Viewer": return styles.statusPaid;
      default: return "";
    }
  };

  const handleAddMember = () => {
    if (newMember.name && newMember.email && newMember.role) {
      const member: TeamMember = {
        ...newMember,
        id: `TM${String(teamMembers.length + 1).padStart(3, '0')}`,
        lastActivity: "Just added"
      };
      setTeamMembers([...teamMembers, member]);
      setNewMember({
        name: "",
        role: "",
        email: "",
        accessLevel: "Viewer",
        department: ""
      });
      setShowAddMember(false);
    }
  };

  return (
    <div className={styles.generalContent}>
      <div className={styles.topSection}>
        <div className={styles.leftColumn}>
          <div className={styles.fieldGroup}>
            <label>Project Owner</label>
            <div className={styles.fieldValue}>Jane Smith</div>
          </div>

          <div className={styles.fieldGroup}>
            <label>Organization</label>
            <div className={styles.fieldValue}>Infrastructure Development Corp</div>
          </div>

          <div className={styles.fieldGroup}>
            <label>Project Category</label>
            <div className={styles.fieldValue}>Infrastructure</div>
          </div>
        </div>

        <div className={styles.rightColumn}>
          <div className={styles.fieldGroup}>
            <label>Total Team Members</label>
            <div className={styles.fieldValue}>{teamMembers.length}</div>
          </div>

          <div className={styles.fieldGroup}>
            <label>Active Members</label>
            <div className={styles.fieldValue}>
              {teamMembers.filter(m => !m.lastActivity.includes("week")).length}
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <label>Project Security Level</label>
            <div className={styles.fieldValue}>Standard</div>
          </div>
        </div>
      </div>

      <div className={styles.divider}></div>

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

          {/* Add Member Form */}
          {showAddMember && (
            <div className={styles.invoiceForm}>
              <div className={styles.formRow}>
                <div className={styles.formField}>
                  <label>Name</label>
                  <input
                    type="text"
                    className={styles.formInput}
                    value={newMember.name}
                    onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                    placeholder="Full name"
                  />
                </div>
                <div className={styles.formField}>
                  <label>Email</label>
                  <input
                    type="email"
                    className={styles.formInput}
                    value={newMember.email}
                    onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                    placeholder="Email address"
                  />
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.formField}>
                  <label>Role</label>
                  <input
                    type="text"
                    className={styles.formInput}
                    value={newMember.role}
                    onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                    placeholder="Job title/role"
                  />
                </div>
                <div className={styles.formField}>
                  <label>Department</label>
                  <input
                    type="text"
                    className={styles.formInput}
                    value={newMember.department}
                    onChange={(e) => setNewMember({ ...newMember, department: e.target.value })}
                    placeholder="Department"
                  />
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.formField}>
                  <label>Access Level</label>
                  <select
                    className={styles.formSelect}
                    value={newMember.accessLevel}
                    onChange={(e) => setNewMember({ ...newMember, accessLevel: e.target.value as TeamMember["accessLevel"] })}
                  >
                    <option value="Viewer">Viewer</option>
                    <option value="Contributor">Contributor</option>
                    <option value="Manager">Manager</option>
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
                {filteredMembers.map((member) => (
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

      <div className={styles.divider}></div>

      {/* Additional Administration Features */}
      <div className={styles.actualsSection}>
        <div className={styles.fieldGroup}>
          <label>Project Administration</label>
          <div className={styles.summaryCard}>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>Backup Status</span>
              <span className={styles.summaryValue}>Last backup: 2 hours ago</span>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>Project Template</span>
              <span className={styles.summaryValue}>Infrastructure Standard v2.1</span>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>Notifications</span>
              <span className={styles.summaryValue}>Email & In-App Enabled</span>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>Integration Status</span>
              <span className={styles.summaryValue}>Active (5 connected systems)</span>
            </div>
          </div>
        </div>
      </div>

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
            <button className={styles.viewDetailsButton}>
              Risk Assessment
            </button>
            <button className={styles.viewDetailsButton}>
              Resource Planning
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
                  <span className={styles.summaryLabel}>Manager Access</span>
                  <span className={styles.summaryValue}>
                    {teamMembers.filter(m => m.accessLevel === "Manager").length} members
                  </span>
                </div>
                <div className={styles.summaryItem}>
                  <span className={styles.summaryLabel}>Contributor Access</span>
                  <span className={styles.summaryValue}>
                    {teamMembers.filter(m => m.accessLevel === "Contributor").length} members
                  </span>
                </div>
                <div className={styles.summaryItem}>
                  <span className={styles.summaryLabel}>Viewer Access</span>
                  <span className={styles.summaryValue}>
                    {teamMembers.filter(m => m.accessLevel === "Viewer").length} members
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
                      <th>Manager</th>
                      <th>Contributor</th>
                      <th>Viewer</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>View Project</td>
                      <td>✓</td>
                      <td>✓</td>
                      <td>✓</td>
                      <td>✓</td>
                    </tr>
                    <tr>
                      <td>Edit Project Details</td>
                      <td>✓</td>
                      <td>✓</td>
                      <td>✓</td>
                      <td>✗</td>
                    </tr>
                    <tr>
                      <td>Manage Financials</td>
                      <td>✓</td>
                      <td>✓</td>
                      <td>✗</td>
                      <td>✗</td>
                    </tr>
                    <tr>
                      <td>Approve Changes</td>
                      <td>✓</td>
                      <td>✓</td>
                      <td>✗</td>
                      <td>✗</td>
                    </tr>
                    <tr>
                      <td>Manage Team Access</td>
                      <td>✓</td>
                      <td>✗</td>
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
