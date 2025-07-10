"use client";

import { useState, useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "@/styles/HomePage.module.css";
import ProjectModal from "@/components/ProjectModal";
import CreateProjectModal from "@/components/CreateProjectModal";
import type { Project } from "@/types/Project";
import { Building2, Phone, PhoneCall } from 'lucide-react';
import { Search, House } from 'lucide-react';
import UserMenu from "@/components/UserMenu";
import { cookies } from "next/headers";
import { getServerSession } from "@/lib/auth-session";



import { redirect } from "next/navigation";

// Function to get current user's name
function UserGreeting() {
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((session) => setName(session?.email?.split("@")[0] ?? null))
      .catch(() => setName(null));
  }, []);

  return <h2>Welcome back{name ? `, ${name}!` : "!"}</h2>;
}


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
        <title>InfraPro - Home </title>
        <meta name="description" content="InfraPro Project Management Dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className={styles.sidebar}>
        <nav>
          <div className={styles.logoWrap}>
            <Building2 aria-hidden className={styles.logoIcon} strokeWidth={2} />
            <span className={styles.logoText}>InfraPro</span>
          </div>

          <ul>
            <li className={styles.active}>
              <span className={styles.homeIcon}><House /></span>
              <span style={{ fontSize: "0.8em" }}>HOME</span>
            </li>
          </ul>


          <button
            className={styles.create}
            onClick={() => setIsCreateOpen(true)}
          >
            + Create Project
          </button>

          <button className={styles.supportLink}>
            <Phone />
            Get Support
          </button>
        </nav>
      </div>
      <div className={styles.topbar}>

        <div className={styles.outer}>
          <div className={styles.inner}>

            <Search aria-hidden className={styles.icon} size={16} />
            <input
              type="text"
              placeholder="Search…"
              className={styles.searchBox}
            />
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
                        className={`${styles.status} ${p.phase.toLowerCase() === "planning"
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



export default async function Index() {
  const session = await getServerSession();  

  if (!session) {
    redirect("/auth/login");                 
  }

  return <Home />;                            
}
