"use client";

import { useEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "@/styles/HomePage.module.css";
import ProjectModal from "@/components/ProjectModal";
import CreateProjectModal from "@/components/CreateProjectModal";

/* ───────────────────────────────────────────
   Minimal front-end type for table rows
─────────────────────────────────────────── */
type ProjectRow = {
  id: string;
  title: string;
  phase: string;
  projectManagerId: number | null;
  description: string;
  forecast: number;
  actuals: number;
  budget: number;
  plannedStartDate: string;
  plannedEndDate: string;
  dateCreated: string;
};

const Home: NextPage = () => {
  /* --------------- local state --------------- */
  const [projects, setProjects] = useState<ProjectRow[]>([]);
  const [selectedProject, setSelectedProject] = useState<ProjectRow | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  /* -------- fetch existing projects once -------- */
  useEffect(() => {
    (async () => {
      const res = await fetch("/api/projects");
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    })();
  }, []);

  /* -------- create-project callback (passed to modal) -------- */
  async function handleCreate(draft: {
    title: string;
    projectManagerId: string;   // comes in as a string from the input
    description: string;
    forecast: string;
    actuals: string;
    budget: string;
    startDate: string;
    endDate: string;
  }) {
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: draft.title,
          description: draft.description,
          phase: "Planning",
          projectManagerId: Number(draft.projectManagerId),
          forecast: Number(draft.forecast),
          actuals: Number(draft.actuals),
          budget: Number(draft.budget),
          plannedStartDate: draft.startDate,
          plannedEndDate: draft.endDate,
        }),
      });

      if (!res.ok) throw new Error("API error");

      const saved: ProjectRow = await res.json();
      setProjects(prev => [saved, ...prev]);   // prepend newest
    } catch (err) {
      console.error(err);
      alert("Could not save project – check console for details.");
    }
  }

  /* --------------- UI helpers --------------- */
  const openProject = (p: ProjectRow) => {
    setSelectedProject(p);
    setShowModal(true);
  };
  const closeProject = () => {
    setSelectedProject(null);
    setShowModal(false);
  };

  /* --------------- render --------------- */
  return (
    <>
      <Head>
        <title>Planova – Home</title>
        <meta name="description" content="Planova Project Management Dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className={styles.body}>
        {/* -------------- side-bar / top-bar unchanged -------------- */}
        <div className={styles.sidebar}>
          <img src="/PlanovaLogo.png" alt="Logo" className={styles.sidebarLogo} />
          {/* ...navigation list trimmed... */}
        </div>

        <div className={styles.topbar}>
          <div className={styles.logoText}>Planova</div>
          {/* ...rest of top-bar unchanged... */}
        </div>

        {/* ---------------- main card ---------------- */}
        <div className={styles.main}>
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
                    <th>Manager&nbsp;ID</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map(p => (
                    <tr
                      key={p.id}
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
                        />{" "}
                        {p.phase}
                      </td>
                      <td>{p.projectManagerId ?? "—"}</td>
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
        </div>
      </div>

      {/* -------- modals -------- */}
      {showModal && selectedProject && (
        <ProjectModal project={selectedProject} onClose={closeProject} />
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
