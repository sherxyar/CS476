"use client";
import {
  useEffect,
  useState,
  ChangeEvent,
  KeyboardEvent,
} from "react";
import styles from "../styles/DeliveryTab.module.css";
import type { Project } from "@/types/Project";

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
}

/*modal - used for risk - todo for Lessonslearned  */
const Modal: React.FC<{
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}> = ({ open, title, onClose, children }) => {
  if (!open) return null;
  return (
    <div className={styles.modalOverlay} role="dialog" aria-modal="true">
      <div className={styles.modalContent}>
        <header className={styles.modalHeader}>
          <h2>{title}</h2>
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </header>
        <div className={styles.modalBody}>{children}</div>
      </div>
    </div>
  );
};


export default function DeliveryTab({ project }: Props) {
  /* sub-tabs */
  const [activeTab, setActiveTab] = useState<"risk" | "lessons">("risk");

  /* data */
  const [risks, setRisks] = useState<RiskRegister[]>([]);
  const [lessons, setLessons] = useState<LessonsLearned[]>([]);
  const [loadingRisks, setLoadingRisks] = useState(false);
  const [loadingLessons, setLoadingLessons] = useState(false);
  const [errorRisks, setErrorRisks] = useState<string | null>(null);
  const [errorLessons, setErrorLessons] = useState<string | null>(null);

  /* Add-risk modal */
  const [showRiskModal, setShowRiskModal] = useState(false);
  const [savingRisk, setSavingRisk] = useState(false);
  const [newRisk, setNewRisk] = useState({
    riskID: "",
    riskName: "",
    riskDescription: "",
    riskOwner: "",
    riskResponse: "",
    currentImpact: 1,
    currentLikelihood: 1,
  });

  const [showLessonModal, setShowLessonModal] = useState(false);
  const [savingLesson, setSavingLesson] = useState(false);
  const [newLesson, setNewLesson] = useState({
    topic: "",
    experience: "",
    impactRecurrence: "",
    lessonsLearned: "",
    bestPractice: "",
    assignedTo: "",
  });

  /* fetch data */
  useEffect(() => {
    if (!project?.id) return;

    const fetchRisks = async () => {
      try {
        setLoadingRisks(true);
        setErrorRisks(null);
        const res = await fetch(`/api/projects/${project.id}/risks`);
        if (!res.ok) throw new Error();
        setRisks(await res.json());
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
        if (!res.ok) throw new Error();
        setLessons(await res.json());
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
    setNewRisk((r) => ({ ...r, [e.target.name]: e.target.value }));
  };

  const handleLessonField = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewLesson((l) => ({ ...l, [e.target.name]: e.target.value }));
  };

  // for score
  const handleNumberField =
    (field: "currentImpact" | "currentLikelihood") =>
      (e: ChangeEvent<HTMLInputElement>) => {
        const val = e.target.valueAsNumber;
        if (val >= 1 && val <= 5)
          setNewRisk((r) => ({ ...r, [field]: val }));
      };

  const saveRisk = async () => {
    const { riskName, riskDescription, riskOwner } = newRisk;
    if (!riskName || !riskDescription || !riskOwner) {
      alert("Please fill all required fields.");
      return;
    }
    try {
      setSavingRisk(true);
      const res = await fetch(`/api/projects/${project.id}/risks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRisk),
      });
      if (!res.ok) throw new Error();
      const saved: RiskRegister = await res.json();
      setRisks((prev) => [...prev, saved]);
      /* reset */
      setNewRisk({
        riskID: "",
        riskName: "",
        riskDescription: "",
        riskOwner: "",
        riskResponse: "",
        currentImpact: 1,
        currentLikelihood: 1,
      });
      setShowRiskModal(false);
    } catch {
      alert("Could not add risk. Please try again.");
    } finally {
      setSavingRisk(false);
    }
  };

  //  Save lesson
  const saveLesson = async () => {
    const { topic, lessonsLearned } = newLesson;
    if (!topic && !lessonsLearned) {
      alert("Please fill at least Topic or Lesson.");
      return;
    }
    try {
      setSavingLesson(true);
      const res = await fetch(`/api/projects/${project.id}/lessons`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newLesson),
      });
      if (!res.ok) throw new Error();
      const saved: LessonsLearned = await res.json();
      setLessons((prev) => [...prev, saved]);
      // reset entry
      setNewLesson({
        topic: "",
        experience: "",
        impactRecurrence: "",
        lessonsLearned: "",
        bestPractice: "",
        assignedTo: "",
      });
      setShowLessonModal(false);
    } catch {
      alert("Could not add lesson. Please try again.");
    } finally {
      setSavingLesson(false);
    }
  };

  // render Risk table
  const renderRiskTable = () => {
    if (loadingRisks) return <p className={styles.message}>Loading Risks…</p>;
    if (errorRisks) return <p className={`${styles.message} ${styles.error}`}>{errorRisks}</p>;
    if (risks.length === 0)
      return <p className={`${styles.message} ${styles.info}`}>No risks yet.</p>;

    return (
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Owner</th>
              <th>Impact</th>
              <th>Likelihood</th>
              <th>Score</th>
              <th>Response</th>
            </tr>
          </thead>
          <tbody>
            {risks.map((r) => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.riskName || "—"}</td>
                <td>{r.riskDescription || "—"}</td>
                <td>{r.riskOwner || "—"}</td>
                <td>{r.currentImpact ?? "—"}</td>
                <td>{r.currentLikelihood ?? "—"}</td>
                <td>{r.currentScore ?? "—"}</td>
                <td>{r.riskResponse || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderLessonsTable = () => {
    if (loadingLessons) return <p className={styles.message}>Loading Lessons…</p>;
    if (errorLessons) return <p className={`${styles.message} ${styles.error}`}>{errorLessons}</p>;
    if (lessons.length === 0)
      return <p className={`${styles.message} ${styles.info}`}>No lessons learned entries.</p>;

    return (
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Topic</th>
              <th>Experience</th>
              <th>Impact & Recurrence</th>
              <th>Lesson</th>
              <th>Best Practice</th>
              <th>Assigned To</th>
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

  return (
    <div className={styles.container}>
      {/* sub-tabs */}
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

      {/* content */}
      {activeTab === "risk" ? renderRiskTable() : renderLessonsTable()}

      {activeTab === "risk" && (
        <button
          className={styles.addRiskButton}
          onClick={() => setShowRiskModal(true)}
          disabled={loadingRisks}
        >
          Add Risk
        </button>
      )}
      {activeTab === "lessons" && (
        <button
          className={styles.addRiskButton}   
          onClick={() => setShowLessonModal(true)}
          disabled={loadingLessons}
        >
          Add Lesson
        </button>
      )}



      {/* Modal for adding a risk */}
      <Modal open={showRiskModal} title="Add New Risk" onClose={() => setShowRiskModal(false)}>
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

          <div className={styles.formField} style={{ gridColumn: "1 / -1" }}>
            <label>Response</label>
            <select
              className={styles.formInput}
              name="riskResponse"
              value={newRisk.riskResponse}
              onChange={handleRiskField}
              required
            >
              <option value="" disabled>
                Select response
              </option>
              <option value="Mitigate">Mitigate</option>
              <option value="Avoid">Avoid</option>
              <option value="Transfer">Transfer</option>
              <option value="Accept">Accept</option>
            </select>
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

          <div className={styles.formActions} style={{ gridColumn: "1 / -1" }}>
            <button
              className={styles.saveRiskButton}
              onClick={saveRisk}
              disabled={savingRisk}
            >
              {savingRisk ? "Saving…" : "Save Risk"}
            </button>
            <button
              className={styles.addRiskButton}
              onClick={() => setShowRiskModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        open={showLessonModal}
        title="Add New Lesson"
        onClose={() => setShowLessonModal(false)}
      >
        <div className={styles.riskForm}>  {/* reuse grid styles */}
          <div className={styles.formField} style={{ gridColumn: "1 / -1" }}>
            <label>Topic</label>
            <input
              className={styles.formInput}
              name="topic"
              value={newLesson.topic}
              onChange={handleLessonField}
              placeholder="Short topic heading"
            />
          </div>

          <div className={styles.formField} style={{ gridColumn: "1 / -1" }}>
            <label>Experience</label>
            <textarea
              className={styles.formInput}
              name="experience"
              value={newLesson.experience}
              onChange={handleLessonField}
              placeholder="What happened?"
            />
          </div>

          <div className={styles.formField}>
            <label>Impact & Recurrence</label>
            <input
              className={styles.formInput}
              name="impactRecurrence"
              value={newLesson.impactRecurrence}
              onChange={handleLessonField}
              placeholder="e.g. High / Rare"
            />
          </div>

          <div className={styles.formField} style={{ gridColumn: "1 / -1" }}>
            <label>Lesson Learned</label>
            <textarea
              className={styles.formInput}
              name="lessonsLearned"
              value={newLesson.lessonsLearned}
              onChange={handleLessonField}
              placeholder="Key takeaway"
            />
          </div>

          <div className={styles.formField}>
            <label>Best Practice</label>
            <input
              className={styles.formInput}
              name="bestPractice"
              value={newLesson.bestPractice}
              onChange={handleLessonField}
              placeholder="Recommended approach"
            />
          </div>

          <div className={styles.formField}>
            <label>Assigned To</label>
            <input
              className={styles.formInput}
              name="assignedTo"
              value={newLesson.assignedTo}
              onChange={handleLessonField}
              placeholder="Owner"
            />
          </div>

          <div className={styles.formActions} style={{ gridColumn: "1 / -1" }}>
            <button
              className={styles.saveRiskButton}
              onClick={saveLesson}
              disabled={savingLesson}
            >
              {savingLesson ? "Saving…" : "Save Lesson"}
            </button>
            <button
              className={styles.addRiskButton}
              onClick={() => setShowLessonModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
