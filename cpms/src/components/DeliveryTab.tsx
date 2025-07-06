"use client";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import styles from "../styles/DeliveryTab.module.css";
import type { Project } from "@/types/Project";

/* Types */
interface RiskRegister {
  id: number;
  riskID?: string;
  riskName?: string;
  riskDescription?: string;
  dateCaptured?: string;
  riskOwner?: string;
  currentImpact?: number;
  currentLikelihood?: number;
  currentScore?: number;
  riskResponse?: string;
  operationalOrProjectRisk?: string;
}

interface LessonsLearned {
  id: number;
  topic?: string;
  experience?: string;
  impactRecurrence?: string;
  lessonsLearned?: string;
  bestPractice?: string;
  assignedTo?: string;
}

interface Props {
  project: Project;
  registerChangeHandler?: (fn: () => Partial<Project>) => void;
}

/* date formatting */
const formatDateForDisplay = (dateString?: string) => {
  if (!dateString) return "N/A";
  try {
    const [datePart] = dateString.split("T");
    const [y, m, d] = datePart.split("-").map(Number);
    return new Date(y, m - 1, d).toLocaleDateString("en-CA", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return dateString;
  }
};

const MessageDisplay: React.FC<{
  message: string;
  type: "loading" | "error" | "info";
}> = ({ message, type }) => (
  <div className={`${styles.message} ${styles[type]}`}>
    <p>{message}</p>
  </div>
);

export default function DeliveryTab({ project }: Props) {

  /* sub-tabs */
  const [activeTab, setActiveTab] = useState<"risk" | "lessons">("risk");

  /* data state */
  const [risks, setRisks] = useState<RiskRegister[]>([]);
  const [lessons, setLessons] = useState<LessonsLearned[]>([]);

  const [loadingRisks, setLoadingRisks] = useState(false);
  const [loadingLessons, setLoadingLessons] = useState(false);

  const [errorRisks, setErrorRisks] = useState<string | null>(null);
  const [errorLessons, setErrorLessons] = useState<string | null>(null);

  const [showAddRisk, setShowAddRisk] = useState(false);
  const [draftRisk, setDraftRisk] = useState<RiskRegister>({
    id: 0,
    riskName: "",
    riskDescription: "",
    riskOwner: "",
    currentImpact: 1,
    currentLikelihood: 1,
  });

  /* fetch data */
  useEffect(() => {
    if (!project?.id) return;

    const fetchRisks = async () => {
      try {
        setLoadingRisks(true);
        setErrorRisks(null);
        const res = await fetch(`/api/projects/${project.id}/risks`);
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const data = await res.json();
        setRisks(data || []);
      } catch {
        setErrorRisks("Failed to load risks");
      } finally {
        setLoadingRisks(false);
      }
    };

    const fetchLessons = async () => {
      try {
        setLoadingLessons(true);
        setErrorLessons(null);
        const res = await fetch(`/api/projects/${project.id}/lessons`);
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const data = await res.json();
        setLessons(data || []);
      } catch {
        setErrorLessons("Failed to load lessons learned");
      } finally {
        setLoadingLessons(false);
      }
    };

    fetchRisks();
    fetchLessons();
  }, [project.id]);

  /* form handlers */
  const handleRiskField = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setDraftRisk({ ...draftRisk, [e.target.name]: e.target.value });
  };

  const saveRisk = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/projects/${project.id}/risks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draftRisk),
      });
      if (!res.ok) throw new Error("save failed");
      const created = await res.json();
      setRisks([...risks, created]);
      setDraftRisk({
        id: 0,
        riskName: "",
        riskDescription: "",
        riskOwner: "",
        currentImpact: 1,
        currentLikelihood: 1,
      });
      setShowAddRisk(false);
    } catch {
      alert("Could not add risk");
    }
  };

  /* risk table */
  const renderRiskTable = () => {
    if (loadingRisks) return <MessageDisplay message="Loading Risk Matrix…" type="loading" />;
    if (errorRisks) return <MessageDisplay message={errorRisks} type="error" />;
    if (risks.length === 0) return <MessageDisplay message="No risk data available." type="info" />;

    return (
      <>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Risk&nbsp;ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Owner</th>
                <th>Impact</th>
                <th>Likelihood</th>
                <th>Score</th>
                <th>Response</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {risks.map((r) => (
                <tr key={r.id}>
                  <td>{r.riskID || "—"}</td>
                  <td>{r.riskName || "—"}</td>
                  <td>{r.riskDescription || "—"}</td>
                  <td>{r.riskOwner || "—"}</td>
                  <td>{r.currentImpact ?? "—"}</td>
                  <td>{r.currentLikelihood ?? "—"}</td>
                  <td>{r.currentScore ?? "—"}</td>
                  <td>{r.riskResponse || "—"}</td>
                  <td>{r.operationalOrProjectRisk || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button
          type="button"
          className={styles.addButton}
          onClick={() => setShowAddRisk(!showAddRisk)}
        >
          {showAddRisk ? "Cancel" : "Add Risk"}
        </button>

        {showAddRisk && (
          <form onSubmit={saveRisk} className={styles.addForm}>
            <input
              required
              name="riskName"
              placeholder="Risk Name"
              value={draftRisk.riskName}
              onChange={handleRiskField}
            />
            <textarea
              required
              name="riskDescription"
              placeholder="Description"
              value={draftRisk.riskDescription}
              onChange={handleRiskField}
            />
            <input
              required
              name="riskOwner"
              placeholder="Owner"
              value={draftRisk.riskOwner}
              onChange={handleRiskField}
            />
            <input
              type="number"
              min={1}
              max={5}
              name="currentImpact"
              placeholder="Impact (1-5)"
              value={draftRisk.currentImpact}
              onChange={handleRiskField}
            />
            <input
              type="number"
              min={1}
              max={5}
              name="currentLikelihood"
              placeholder="Likelihood (1-5)"
              value={draftRisk.currentLikelihood}
              onChange={handleRiskField}
            />
            <button type="submit">Save</button>
          </form>
        )}
      </>
    );
  };

  /* lessons table */
  const renderLessonsTable = () => {
    if (loadingLessons) return <MessageDisplay message="Loading Lessons Learned…" type="loading" />;
    if (errorLessons) return <MessageDisplay message={errorLessons} type="error" />;
    if (lessons.length === 0) return <MessageDisplay message="No lessons learned data available." type="info" />;

    return (
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Topic</th>
              <th>Experience</th>
              <th>Impact&nbsp;&amp;&nbsp;Recurrence</th>
              <th>Lesson</th>
              <th>Best&nbsp;Practice</th>
              <th>Assigned&nbsp;To</th>
            </tr>
          </thead>
          <tbody>
            {lessons.map((l) => (
              <tr key={l.id}>
                <td>{l.topic || "—"}</td>
                <td>{l.experience || "—"}</td>
                <td>{l.impactRecurrence || "—"}</td>
                <td>{l.lessonsLearned || "—"}</td>
                <td>{l.bestPractice || "—"}</td>
                <td>{l.assignedTo || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  /* jsx */
  return (
    <div className={styles.container}>
      <div className={styles.subTabHeader}>
        <button
          className={`${styles.subTabButton} ${activeTab === "risk" ? styles.activeSubTab : ""}`}
          onClick={() => setActiveTab("risk")}
        >
          Risk Matrix
        </button>
        <button
          className={`${styles.subTabButton} ${activeTab === "lessons" ? styles.activeSubTab : ""}`}
          onClick={() => setActiveTab("lessons")}
        >
          Lessons Learned
        </button>
      </div>
      {activeTab === "risk" ? renderRiskTable() : renderLessonsTable()}
    </div >
  );
}
