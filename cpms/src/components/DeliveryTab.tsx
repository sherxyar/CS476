"use client";
import { useEffect, useState } from "react";
import styles from "../styles/ProjectModal.module.css";
import type { Project } from "@/types/Project";

/** -------------------------------
 * Types
 * --------------------------------*/
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

type Props = {
  project: Project;
};

/** -------------------------------
 *  Helper for local‑timezone‑safe dates
 * --------------------------------*/
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

const MessageDisplay: React.FC<{ message: string; type: "loading" | "error" | "info" }> = ({ message, type }) => (
  <div
    className={`p-4 rounded-lg text-center ${
      type === "loading"
        ? "bg-blue-100 text-blue-800"
        : type === "error"
        ? "bg-red-100 text-red-800"
        : "bg-gray-100 text-gray-800"
    } shadow-sm`}
  >
    <p className="font-semibold">{message}</p>
  </div>
);

export default function DeliveryTab({ project }: Props) {
  /** ------------------------------
   * State
   * ------------------------------*/
  const [activeTab, setActiveTab] = useState<"risk" | "lessons">("risk");

  const [risks, setRisks] = useState<RiskRegister[]>([]);
  const [lessons, setLessons] = useState<LessonsLearned[]>([]);

  const [loadingRisks, setLoadingRisks] = useState(false);
  const [loadingLessons, setLoadingLessons] = useState(false);

  const [errorRisks, setErrorRisks] = useState<string | null>(null);
  const [errorLessons, setErrorLessons] = useState<string | null>(null);

  /** ------------------------------
   * Data fetch
   * ------------------------------*/
  useEffect(() => {
    if (!project?.id) return;

    // Fetch risk register
    const fetchRisks = async () => {
      try {
        setLoadingRisks(true);
        setErrorRisks(null);
        const res = await fetch(`/api/projects/${project.id}/risks`);
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const data = await res.json();
        setRisks(data || []);
      } catch (err) {
        console.error("Risk fetch error", err);
        setErrorRisks("Failed to load risks");
      } finally {
        setLoadingRisks(false);
      }
    };

    // Fetch lessons learned
    const fetchLessons = async () => {
      try {
        setLoadingLessons(true);
        setErrorLessons(null);
        const res = await fetch(`/api/projects/${project.id}/lessons`);
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const data = await res.json();
        setLessons(data || []);
      } catch (err) {
        console.error("Lessons fetch error", err);
        setErrorLessons("Failed to load lessons learned");
      } finally {
        setLoadingLessons(false);
      }
    };

    fetchRisks();
    fetchLessons();
  }, [project.id]);

  /** ------------------------------
   * Render helpers
   * ------------------------------*/
  const renderRiskTable = () => {
    if (loadingRisks) return <MessageDisplay message="Loading Risk Matrix…" type="loading" />;
    if (errorRisks) return <MessageDisplay message={errorRisks} type="error" />;
    if (risks.length === 0) return <MessageDisplay message="No risk data available." type="info" />;

    return (
      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full bg-white rounded-lg text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-4 text-left font-semibold text-gray-600 rounded-tl-lg">Risk ID</th>
              <th className="py-3 px-4 text-left font-semibold text-gray-600">Name</th>
              <th className="py-3 px-4 text-left font-semibold text-gray-600">Description</th>
              <th className="py-3 px-4 text-left font-semibold text-gray-600">Owner</th>
              <th className="py-3 px-4 text-left font-semibold text-gray-600">Impact</th>
              <th className="py-3 px-4 text-left font-semibold text-gray-600">Likelihood</th>
              <th className="py-3 px-4 text-left font-semibold text-gray-600">Score</th>
              <th className="py-3 px-4 text-left font-semibold text-gray-600">Response</th>
              <th className="py-3 px-4 text-left font-semibold text-gray-600 rounded-tr-lg">Type</th>
            </tr>
          </thead>
          <tbody>
            {risks.map((r) => (
              <tr key={r.id} className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50">
                <td className="py-3 px-4 text-gray-700">{r.riskID || "—"}</td>
                <td className="py-3 px-4 text-gray-700">{r.riskName || "—"}</td>
                <td className="py-3 px-4 text-gray-700">{r.riskDescription || "—"}</td>
                <td className="py-3 px-4 text-gray-700">{r.riskOwner || "—"}</td>
                <td className="py-3 px-4 text-gray-700">{r.currentImpact ?? "—"}</td>
                <td className="py-3 px-4 text-gray-700">{r.currentLikelihood ?? "—"}</td>
                <td className="py-3 px-4 text-gray-700">{r.currentScore ?? "—"}</td>
                <td className="py-3 px-4 text-gray-700">{r.riskResponse || "—"}</td>
                <td className="py-3 px-4 text-gray-700">{r.operationalOrProjectRisk || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderLessonsTable = () => {
    if (loadingLessons)
      return <MessageDisplay message="Loading Lessons Learned…" type="loading" />;
    if (errorLessons) return <MessageDisplay message={errorLessons} type="error" />;
    if (lessons.length === 0)
      return <MessageDisplay message="No lessons learned data available." type="info" />;

    return (
      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full bg-white rounded-lg text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-4 text-left font-semibold text-gray-600 rounded-tl-lg">Topic</th>
              <th className="py-3 px-4 text-left font-semibold text-gray-600">Experience</th>
              <th className="py-3 px-4 text-left font-semibold text-gray-600">Impact & Recurrence</th>
              <th className="py-3 px-4 text-left font-semibold text-gray-600">Lesson</th>
              <th className="py-3 px-4 text-left font-semibold text-gray-600">Best Practice</th>
              <th className="py-3 px-4 text-left font-semibold text-gray-600 rounded-tr-lg">Assigned To</th>
            </tr>
          </thead>
          <tbody>
            {lessons.map((l) => (
              <tr key={l.id} className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50">
                <td className="py-3 px-4 text-gray-700">{l.topic || "—"}</td>
                <td className="py-3 px-4 text-gray-700">{l.experience || "—"}</td>
                <td className="py-3 px-4 text-gray-700">{l.impactRecurrence || "—"}</td>
                <td className="py-3 px-4 text-gray-700">{l.lessonsLearned || "—"}</td>
                <td className="py-3 px-4 text-gray-700">{l.bestPractice || "—"}</td>
                <td className="py-3 px-4 text-gray-700">{l.assignedTo || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  /** ------------------------------
   * UI
   * ------------------------------*/
  return (
    <div className="p-6 bg-white rounded-lg shadow-xl font-sans max-w-5xl mx-auto my-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Delivery Overview</h2>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-3 px-6 text-lg font-medium rounded-t-lg transition-all duration-200 ${
            activeTab === "risk"
              ? "border-b-2 border-blue-600 text-blue-600 bg-blue-50"
              : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
          }`}
          onClick={() => setActiveTab("risk")}
        >
          Risk Matrix
        </button>
        <button
          className={`py-3 px-6 text-lg font-medium rounded-t-lg transition-all duration-200 ${
            activeTab === "lessons"
              ? "border-b-2 border-blue-600 text-blue-600 bg-blue-50"
              : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
          }`}
          onClick={() => setActiveTab("lessons")}
        >
          Lessons Learned
        </button>
      </div>

      {/* Content */}
      {activeTab === "risk" ? renderRiskTable() : renderLessonsTable()}
    </div>
  );
}
