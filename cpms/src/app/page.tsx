"use client";

import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import styles from "@/styles/HomePage.module.css";
import ProjectModal from "@/components/ProjectModal";
import CreateProjectModal from "@/components/CreateProjectModal";

const Home: NextPage = () => {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [projects, setProjects] = useState([
    {
      id: "0001",
      title: "Regina School Pavement Repair",
      phase: "Planning",
      projectmanager: "John Doe"
    },
    {
      id: "0002",
      title: "Saskatoon - 200 Avenue Construction",
      phase: "Construction", 
      projectmanager: "Juhn Joe"
    }
  ]);

  const handleProjectClick = (project: any) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProject(null);
  };

  const handleCreateProject = (newProject: any) => {
    setProjects([...projects, newProject]);
  };

  return (
    <>
      <Head>
        <title>Planova - Home</title>
        <meta name="description" content="Planova Project Management Dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.body}>
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

        <div className={styles.topbar}>
          <div className={styles.logoText}>Planova</div>
          <input type="text" className={styles.searchBox} placeholder="Search" />
          <div className={styles.topbarActions}>
            <a href="/signup" className={styles.topbarButton}>Sign Up</a>
            <a href="/login" className={styles.topbarButton}>Login</a>

            <div className={styles.avatarDropdown}>
              <input type="checkbox" id="dropdown-toggle" />
              <label htmlFor="dropdown-toggle" className={styles.avatar}></label>
              <div className={styles.dropdownMenu}>
                <a href="#">Edit Profile</a>
                <a href="#">Change Profile Picture</a>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.main}>
          <div className={styles.content}>
            <h2>Welcome back, John</h2>

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
                  {projects.map((project) => (
                    <tr 
                      key={project.id} 
                      className={styles.clickableRow}
                      onClick={() => handleProjectClick(project)}
                    >
                      <td>{project.id}</td>
                      <td>{project.title}</td>
                      <td>
                        <span
                          className={
                            `${styles.status} ${
                              (project.phase?.toLowerCase?.() === 'planning')
                                ? styles.planning
                                : styles.construction
                            }`
                          }
                        ></span> {project.phase}
                      </td>
                      <td>{project.projectmanager}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className={styles.buttons}>
                <button className={styles.create} onClick={() => setIsOpen(true)}>+ Create Project</button>
                <button className={styles.view}>View All Projects</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {showModal && selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={handleCloseModal} 
        />
      )}
      <CreateProjectModal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        onCreate={handleCreateProject} 
      />
    </>
  );
};

export default Home;
