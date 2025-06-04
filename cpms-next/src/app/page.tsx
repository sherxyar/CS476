'use client'; 

import { useState } from "react";
import Head from "next/head"; // Import Head
import styles from "./page.module.css";
import ProjectModal from "../components/ProjectModal_Popup";

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Head>
        <title>Construction Project Management Software</title>
        <meta name="description" content="Manage your construction projects efficiently." />
      </Head>
      <div className={styles.page}>
        <main className={styles.main}>
          <h1>Construction Project Management Software</h1>

          <table className={styles.projectTable}>
            <thead>
              <tr>
                <th>Project Name</th>
              </tr>
            </thead>
            <tbody>
              <tr onClick={() => setShowModal(true)} className={styles.clickableRow}>
                <td>Regina School</td>
              </tr>
            </tbody>
          </table>

          {showModal && (
            <ProjectModal onClose={() => setShowModal(false)} />
          )}
        </main>
      </div>
    </>
  );
}
