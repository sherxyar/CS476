"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import styles from "@/styles/HomePage.module.css";
import ProjectModal from "@/components/ProjectModal";
import CreateProjectModal from "@/components/CreateProjectModal";
import type { Project } from "@/types/Project";
import { Building2, Phone, Search, House } from "lucide-react";
import UserMenu from "@/components/UserMenu";
import { useSession } from "next-auth/react";

// User name in greeting
function UserGreeting() {
  const { data: session } = useSession();
  const name = session?.user?.name || session?.user?.email?.split("@")[0] || null;

  return <h2>Welcome back{name ? `, ${name}!` : "!"}</h2>;
}

export default function HomePageClient() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const { data: session } = useSession();

  // Check if user is a collaborator
  const isCollaborator = session?.user?.accountRole === "COLLABORATOR";

  // FETCH
  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    try {
      const res = await fetch("/api/projects");
      if (!res.ok) throw new Error(await res.text());
      setProjects(await res.json());
    } catch (err) {
      console.error("Project fetch failed:", err);
    }
  }

  async function openProject(p: Project) {
    try {
      const res = await fetch(`/api/projects/${p.id}`);
      if (!res.ok) throw new Error("Failed to fetch full project details");
      setSelectedProject(await res.json());
      setShowModal(true);
    } catch (err) {
      console.error("Project load failed:", err);
    }
  }

  async function handleCreate(draft: {
    title: string;
    projectManagerId?: string;
    description: string;
    forecast: string;
    actuals: string;
    budget: string;
    startDate: string;
    endDate: string;
  }) {
    try {
      const payload = {
        title: draft.title,
        description: draft.description,
        phase: "Planning",
        projectManagerId:
          draft.projectManagerId?.trim() ? Number(draft.projectManagerId) : undefined,
        forecast: Number(draft.forecast) || 0,
        actuals: Number(draft.actuals) || 0,
        budget: Number(draft.budget) || 0,
        plannedStartDate: draft.startDate,
        plannedEndDate: draft.endDate,
      };

      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(await res.text());

      const saved: Project = await res.json();
      setProjects((prev) => [saved, ...prev]);
      setIsCreateOpen(false);
    } catch (err) {
      console.error("Project creation failed:", err);
      alert("Could not save project, check console for details.");
    }
  }

  function handleProjectUpdate(updated: Project) {
    setProjects((prev) =>
      prev.map((p) => (p.id === updated.id ? { ...p, ...updated } : p))
    );
    setSelectedProject(updated);
  }

  useEffect(() => {
    console.log("DB URL at runtime:", process.env.POSTGRES_URL);
  }, []);

  return (
    <>
      <Head>
        <title>InfraPro - Home</title>
        <meta name="description" content="InfraPro Project Management Dashboard" />
      </Head>

      <div className={styles.sidebar}>
        <nav>
          <div className={styles.logoWrap}>
            <Building2 className={styles.logoIcon} strokeWidth={2} />
            <span className={styles.logoText}>InfraPro</span>
          </div>

          <ul>
            <li className={styles.active}>
              <span className={styles.homeIcon}><House /></span>
              <span style={{ fontSize: "0.8em" }}>HOME</span>
            </li>
          </ul>

          {!isCollaborator && (
            <button className={styles.create} onClick={() => setIsCreateOpen(true)}>
              + Create Project
            </button>
          )}

          <button className={styles.supportLink}>
            <Phone /> Get Support
          </button>
        </nav>
      </div>

      <div className={styles.topbar}>
        <div className={styles.outer}>
          <div className={styles.inner}>
            <Search className={styles.icon} size={16} />
            <input type="text" placeholder="Search…" className={styles.searchBox} />
          </div>
        </div>
        <div className={styles.topbarActions}>
          <UserMenu />
        </div>
      </div>

      <main className={styles.main}>
        <div className={styles.content}>
          <UserGreeting />

          <div className={styles.card}>
            <h3>Project Overview</h3>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Project Title</th>
                  <th>Phase</th>
                  <th>Project Manager</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((p) => (
                  <tr
                    key={p.projectID}
                    className={styles.clickableRow}
                    onClick={() => openProject(p)}
                  >
                    <td>{p.projectID}</td>
                    <td>{p.title}</td>
                    <td>
                      <span
                        className={`
                          ${styles.status} 
                          ${p.phase.toLowerCase() === "planning"
                            ? styles.planning
                            : styles.construction}`}
                      />
                      {p.phase}
                    </td>
                    <td>{p.projectManager?.name ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {showModal && selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => { setSelectedProject(null); setShowModal(false); }}
          onProjectUpdate={handleProjectUpdate}
        />
      )}

      {!isCollaborator && (
        <CreateProjectModal
          isOpen={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
          onCreate={handleCreate}
        />
      )}
    </>
  );
}
