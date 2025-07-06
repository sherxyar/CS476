"use client";
import {
  useEffect,
  useState,
  ChangeEvent,
  KeyboardEvent,
} from "react";
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
  registerChangeHandler?: (fn: () => Partial<Project>) => void; // (kept for future use)
}

/* Helper */
const MessageDisplay: React.FC<{
  message: string;
  type: "loading" | "error" | "info";
}> = ({ message, type }) => (
  <div className={`${styles.message} ${styles[type]}`}>
    <p>{message}</p>
  </div>
);

/* Component */
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

  /* add-risk UI state */
  const [showAddRisk, setShowAddRisk] = useState(false);
  const [loadingRiskSave, setLoadingRiskSave] = useState(false);
  const [newRisk, setNewRisk] = useState({
    riskName: "",
    riskDescription: "",
    riskOwner: "",
    currentImpact: 1,
    currentLikelihood: 1,
  });

  /* fetch data on mount / project-id change */
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
        setErrorRisks("Failed to load risks.");
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
        setErrorLessons("Failed to load lessons learned.");
      } finally {
        setLoadingLessons(false);
      }
    };

    fetchRisks();
    fetchLessons();
  }, [project.id]);

  /* Handlers */
  const handleRiskField = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewRisk({ ...newRisk, [e.target.name]: e.target.value });
  };

  const handleNumberField = (field: "currentImpact" | "currentLikelihood") => (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const val = e.target.valueAsNumber;
    if (val >= 1 && val <= 5) setNewRisk({ ...newRisk, [field]: val });
  };

  const handleAddRisk = async () => {
    const {
      riskName,
      riskDescription,
      riskOwner,
      currentImpact,
      currentLikelihood,
    } = newRisk;

    if (!riskName || !riskDescription || !riskOwner) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      setLoadingRiskSave(true);

      const res = await fetch(`/api/projects/${project.id}/risks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newRisk,
          currentImpact,
          currentLikelihood,
        }),
      });
      if (!res.ok) throw new Error("Save failed");

      const saved = await res.json();
      setRisks((prev) => [...prev, saved]);

      /* reset */
      setNewRisk({
        riskName: "",
        riskDescription: "",
        riskOwner: "",
        currentImpact: 1,
        currentLikelihood: 1,
      });
      setShowAddRisk(false);
    } catch {
      alert("Could not add risk. Please try again.");
    } finally {
      setLoadingRiskSave(false);
    }
  };

  /* Renderers */
  const renderRiskTable = () => {
    let body: React.ReactNode;

    if (loadingRisks)
      body = <MessageDisplay message="Loading Risk Matrix…" type="loading" />;
    else if (errorRisks)
      body = <MessageDisplay message={errorRisks} type="error" />;
    else if (risks.length === 0)
      body = (
        <MessageDisplay
          message="No risks yet. Click “Add Risk” to create one."
          type="info"
        />
      );
    else
      body = (
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
      );

    return (
      <>
        {body}

        {/* Add Risk Button */}
        <button
          className={styles.addRiskButton}
          onClick={() => setShowAddRisk(!showAddRisk)}
          disabled={loadingRisks}
        >
          {showAddRisk ? "Cancel" : "Add Risk"}
        </button>

        {/* Inline Add Form */}
        {showAddRisk && (
          <div className={styles.riskForm}>
            <div className={styles.formField} style={{ gridColumn: "1 / -1" }}>
              <label>Name *</label>
              <input
                className={styles.formInput}
                name="riskName"
                value={newRisk.riskName}
                onChange={handleRiskField}
                placeholder="Risk title"
                required
              />
            </div>

            <div className={styles.formField} style={{ gridColumn: "1 / -1" }}>
              <label>Description *</label>
              <textarea
                className={styles.formInput}
                name="riskDescription"
                value={newRisk.riskDescription}
                onChange={handleRiskField}
                placeholder="Brief description"
                required
              />
            </div>

            <div className={styles.formField}>
              <label>Owner *</label>
              <input
                className={styles.formInput}
                name="riskOwner"
                value={newRisk.riskOwner}
                onChange={handleRiskField}
                placeholder="Person responsible"
                required
              />
            </div>

            <div className={styles.formField}>
              <label>Impact (1-5)</label>
              <input
                type="number"
                min={1}
                max={5}
                className={styles.formInput}
                value={newRisk.currentImpact}
                onChange={handleNumberField("currentImpact")}
              />
            </div>

            <div className={styles.formField}>
              <label>Likelihood (1-5)</label>
              <input
                type="number"
                min={1}
                max={5}
                className={styles.formInput}
                value={newRisk.currentLikelihood}
                onChange={handleNumberField("currentLikelihood")}
              />
            </div>

            <div
              className={styles.formActions}
              style={{ gridColumn: "1 / -1" }}
            >
              <button
                className={styles.saveRiskButton}
                onClick={handleAddRisk}
                disabled={loadingRiskSave}
              >
                {loadingRiskSave ? "Saving…" : "Save Risk"}
              </button>
            </div>
          </div>
        )}
      </>
    );
  };

  const renderLessonsTable = () => {
    if (loadingLessons)
      return <MessageDisplay message="Loading Lessons…" type="loading" />;
    if (errorLessons)
      return <MessageDisplay message={errorLessons} type="error" />;
    if (lessons.length === 0)
      return (
        <MessageDisplay
          message="No lessons learned data available."
          type="info"
        />
      );

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

  /* JSX */
  return (
    <div className={styles.container}>
      {/* sub-tabs */}
      <div className={styles.subTabHeader}>
        <button
          className={`${styles.subTabButton} ${
            activeTab === "risk" ? styles.activeSubTab : ""
          }`}
          onClick={() => setActiveTab("risk")}
        >
          Risk Matrix
        </button>
        <button
          className={`${styles.subTabButton} ${
            activeTab === "lessons" ? styles.activeSubTab : ""
          }`}
          onClick={() => setActiveTab("lessons")}
        >
          Lessons Learned
        </button>
      </div>

      {/* content */}
      {activeTab === "risk" ? renderRiskTable() : renderLessonsTable()}
    </div>
  );
}
