import { useState, useEffect } from "react";
import styles from "../styles/ProjectModal.module.css";
import type { Project } from "@/types/Project";

export type DbRole = "ADMIN" | "PROJECT_MANAGER" | "COLLABORATOR";

interface TeamMember {
  id: number;
  name: string;
  email: string;
  department: string | null;
  lastActivity: string | null;
  role: DbRole;
}

interface UserOption {
  id: number;
  name: string;
  email: string;
}

interface Props {
  project: Project;
}

// Mapping helpers between DB enum and UI labels
const roleLabel: Record<DbRole, string> = {
  ADMIN: "Admin",
  PROJECT_MANAGER: "Project Manager",
  COLLABORATOR: "Collaborator",
};

export default function AdministrationTab({ project }: Props) {

  const [showAccessModal, setShowAccessModal] = useState(false);
  const [showAddMember, setShowAddMember] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [userOptions, setUserOptions] = useState<UserOption[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | "">("");
  const [newMemberRole, setNewMemberRole] = useState<DbRole>("COLLABORATOR");

  // API calls
  const fetchMembers = async () => {
    try {
      const res = await fetch(`/api/projects/${project.id}/members`);
      if (!res.ok) throw new Error(await res.text());
      const data: TeamMember[] = await res.json();
      setTeamMembers(data);
    } catch (err) {
      console.error("Failed to load team members", err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users");
      if (!res.ok) throw new Error(await res.text());
      const data: UserOption[] = await res.json();
      setUserOptions(data);
    } catch (err) {
      console.error("Failed to load users", err);
    }
  };

  useEffect(() => {
    fetchMembers();
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredMembers = teamMembers.filter((m) =>
    [m.name, m.email, roleLabel[m.role]]
      .some((f) => f.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getRoleBadgeClass = (role: DbRole) => {
    switch (role) {
      case "ADMIN":
        return styles.statusNotPaid;
      case "PROJECT_MANAGER":
        return styles.statusInProgress;
      case "COLLABORATOR":
        return styles.statusClosed;
      default:
        return "";
    }
  };

  const handleAddMember = async () => {
    if (!selectedUserId) return;
    try {
      const res = await fetch(`/api/projects/${project.id}/members`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: selectedUserId, role: newMemberRole }),
      });
      if (!res.ok) throw new Error(await res.text());
      setShowAddMember(false);
      setSelectedUserId("");
      setNewMemberRole("COLLABORATOR");
      fetchMembers();
    } catch (err) {
      console.error("Failed to add member", err);
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
      {/* Quick actions */}
      <div className={styles.actualsSection}>
        <div className={styles.fieldGroup}>
          <label>Quick Actions</label>
          <div className={styles.buttonGroup}>
            <button
              className={styles.viewDetailsButton}
              onClick={() =>
                window.open(`/api/projects/${project.id}/export`, '_blank')
              }
            >
              Export Project Data
            </button>
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
                className={styles.addInvoiceButton}
                onClick={() => setShowAddMember(true)}
              >
                Add Team Member
              </button>
            </div>
          </div>

          {/* Search */}
          <input
            type="text"
            className={styles.formInput}
            placeholder="Search team members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ maxWidth: "300px", marginBottom: "16px" }}
          />

          {/* Add Member Form */}
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
                    {userOptions.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.name} ({u.email})
                      </option>
                    ))}
                  </select>
                </div>
                <div className={styles.formField}>
                  <label>Role</label>
                  <select
                    className={styles.formSelect}
                    value={newMemberRole}
                    onChange={(e) => setNewMemberRole(e.target.value as DbRole)}
                  >
                    <option value="COLLABORATOR">Collaborator</option>
                    <option value="PROJECT_MANAGER">Project Manager</option>
                    <option value="ADMIN">Admin</option>
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

          {/* Members table */}
          <div className={styles.tableContainer}>
            <table className={styles.actualsTable}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Role</th>
                  <th>Last Activity</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.map((m) => (
                  <tr key={m.id}>
                    <td style={{ fontWeight: 600 }}>{m.name}</td>
                    <td>{m.email}</td>
                    <td>{m.department ?? "—"}</td>
                    <td>
                      <span className={getRoleBadgeClass(m.role)}>
                        {roleLabel[m.role]}
                      </span>
                    </td>
                    <td>{m.lastActivity ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className={styles.divider} />



    </div>
  );
}
