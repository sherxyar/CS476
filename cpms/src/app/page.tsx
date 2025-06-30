"use client";

import { useState, useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "@/styles/HomePage.module.css";
import ProjectModal from "@/components/ProjectModal";
import CreateProjectModal from "@/components/CreateProjectModal";
import type { Project } from "@/types/Project";


const Home: NextPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

const fetchProjects = async () => {
  try {
    const res = await fetch("/api/projects");
    if (!res.ok) {
      const text = await res.text();  
      throw new Error(`status ${res.status} , ${text}`);
    }
    const data = await res.json();
    setProjects(data);
  } catch (err) {
    console.error("Project fetch failed:", err);
  }
};

  const openProject = async (p: Project) => {
    try {
      const res = await fetch(`/api/projects/${p.id}`);
      if (!res.ok) throw new Error("Failed to fetch full project details");
      const fullProject = await res.json();
      setSelectedProject(fullProject);
      setShowModal(true);
    } catch (err) {
      console.error("Project load failed:", err);
    }
  };

  const closeProject = () => {
    setSelectedProject(null);
    setShowModal(false);
  };

  const handleCreate = async (draft: {
    title: string;
    projectManagerId?: string;
    description: string;
    forecast: string;
    actuals: string;
    budget: string;
    startDate: string;
    endDate: string;
  }) => {
    try {
      const payload = {
        title: draft.title,
        description: draft.description,
        phase: "Planning",
        projectManagerId:
          draft.projectManagerId && draft.projectManagerId.trim() !== ""
            ? Number(draft.projectManagerId)
            : undefined,
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

      if (!res.ok) throw new Error("API error");

      const saved: Project = await res.json();
      setProjects((prev) => [saved, ...prev]);
      setIsCreateOpen(false);
    } catch (err) {
      console.error("Project creation failed:", err);
      alert("Could not save project, check console for details.");
    }
  };

  const handleProjectUpdate = (updated: Project) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === updated.id ? { ...p, ...updated } : p))
    );
    setSelectedProject(updated);
  };

  return (
    <>
      <Head>
        <title>Planova - Home</title>
        <meta name="description" content="Planova Project Management Dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className={styles.sidebar}>
        <img src="/PlanovaLogo.png" alt="Logo" className={styles.sidebarLogo} />
        <nav>
          <ul>
            <li className={styles.active}><span className={styles.icon}>🏠</span>HOME</li>
          </ul>
        </nav>
      </div>

      <div className={styles.topbar}>
        <div className={styles.logoText}>Planova</div>
        <input type="text" className={styles.searchBox} placeholder="Search" />
        <div className={styles.topbarActions}>
          <a href="/signup" className={styles.topbarButton}>Sign Up</a>
          <a href="/login" className={styles.topbarButton}>Login</a>
        </div>
      </div>

      <main className={styles.main}>
        <div className={styles.content}>
          <h2>Welcome back!</h2>

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
                        className={`${styles.status} ${
                          p.phase.toLowerCase() === "planning"
                            ? styles.planning
                            : styles.construction
                        }`}
                      />
                      {p.phase}
                    </td>
                    <td>{p.projectManager?.name ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className={styles.buttons}>
              <button
                className={styles.create}
                onClick={() => setIsCreateOpen(true)}
              >
                + Create Project
              </button>
              <button className={styles.view}>View All Projects</button>
            </div>
          </div>
        </div>
      </main>

      {showModal && selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={closeProject}
          onProjectUpdate={handleProjectUpdate}
        />
      )}

      <CreateProjectModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onCreate={handleCreate}
      />
    </>
  );
};

export default Home;
