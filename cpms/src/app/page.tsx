  "use client";

  import { useState, useEffect } from "react";
  import type { NextPage } from "next";
  import Head from "next/head";
  import styles from "@/styles/HomePage.module.css";
  import ProjectModal from "@/components/ProjectModal";
  import CreateProjectModal from "@/components/CreateProjectModal";

  /* get project data */
  interface ProjectRow {
    id: string;
    projectID: string;
    title: string;
    phase: string;
    projectManagerId: number | null;
    projectManager: {
      id: number;
      name: string;
      email: string;
    } | null;
    description: string;
    forecast: number;
    actuals: number;
    budget: number;
    plannedStartDate: string;
    plannedEndDate: string;
    dateCreated: string;
  }

  const Home: NextPage = () => {
    const [projects, setProjects] = useState<ProjectRow[]>([]);
    const [selectedProject, setSelectedProject] = useState<ProjectRow | null>(null);
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

    const openProject = (p: ProjectRow) => {
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

        if (res.ok == false) throw new Error("API error");

        const saved: ProjectRow = await res.json();
        setProjects(prev => [saved, ...prev]);
        setIsCreateOpen(false);
      } catch (err) {
        console.error(err);
        alert("Could not save project – check console for details.");
      }
    };

    /* -------------------- UI ----------------------- */
    return (
      <>
        <Head>
          <title>Planova – Home</title>
          <meta
            name="description"
            content="Planova Project Management Dashboard"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>

        {/* sidebar */}
        <div className={styles.sidebar}>
          <img src="/PlanovaLogo.png" alt="Logo" className={styles.sidebarLogo} />
          <nav>
            <ul>
              <li className={styles.active}>
                <span className={styles.icon}>🏠</span>HOME
              </li>
              <li>
                <span className={styles.icon}>📁</span>PROJECTS
              </li>
              <li>
                <span className={styles.icon}>👥</span>TEAMS
              </li>
              <li>
                <span className={styles.icon}>⚙️</span>SETTINGS
              </li>
            </ul>
          </nav>
        </div>

        {/* topbar */}
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
                  {projects.map(p => (
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

        {/* Project Modal - this is where the project details are passed on */}
        {showModal && selectedProject && (
          <ProjectModal
            project = {{
              id: selectedProject.id,
              projectID: selectedProject.projectID,
              title: selectedProject.title,
              phase: selectedProject.phase,
              projectManager: selectedProject.projectManager,
              dateCreated: selectedProject.dateCreated,
              description: selectedProject.description,
            }}
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
