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
    (async () => {
      try {
        const res = await fetch("/api/projects");
        if (!res.ok) throw new Error("Failed to fetch projects");
        setProjects(await res.json());
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const openProject = (p: Project) => {
    setSelectedProject(p);
    setShowModal(true);
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
    startDate?: string;
    endDate?: string;
  }) => {
    try {
      // generate a human-friendly projectID
      const projectID = `PRJ-${Date.now()}`;
      const payload = {
        projectID,
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
        plannedStartDate: draft.startDate ?? null,
        plannedEndDate: draft.endDate ?? null,
      };

      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("API error");

      const saved: Project = await res.json();
      setProjects(prev => [saved, ...prev]);
      setIsCreateOpen(false);
    } catch (err) {
      console.error(err);
      alert("Could not save project – check console for details.");
    }
  };

  return (
    <>
      <Head>
        <title>Planova – Home</title>
        <meta name="description" content="Planova Project Management Dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* sidebar */}
      <div className={styles.sidebar}>
        {/* ...sidebar content... */}
      </div>

      {/* topbar */}
      <div className={styles.topbar}>
        {/* ...topbar content... */}
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
                  <th>Title</th>
                  <th>Phase</th>
                  <th>Manager</th>
                </tr>
              </thead>
              <tbody>
                {projects.map(p => (
                  <tr
                    key={p.projectID}
                    className={styles.clickableRow}
                    onClick={() => openProject(p)}
                  >
                    <td>{p.projectID}</td>
                    <td>{p.title}</td>
                    <td>{p.phase}</td>
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
            </div>
          </div>
        </div>
      </main>

      {showModal && selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={closeProject}
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