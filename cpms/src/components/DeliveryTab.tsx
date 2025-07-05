"use client";
import { useEffect, useState } from "react";
import styles from "../styles/ProjectModal.module.css";
import type { Project } from "@/types/Project";

// Define the type for a single lesson learned item
type LessonLearnedItem = {
  id: number;
  topic: string;
  experience: string;
  impactRecurrence: string;
  lessonLearned: string;
  bestPractice: string;
  assignedTo: string;
};

// Define the type for a single risk item
type RiskItem = {
  id: number;
  riskId: string;
  riskDescription: string;
  category: string;
  impact: string;
  likelihood: string;
  riskScore: number;
  mitigationPlan: string;
  contingencyPlan: string;
  owner: string;
  status: "Open" | "Closed" | "Mitigated"; // Example statuses, adjust as needed
  dateIdentified: string;
  dateClosed: string | null;
};

// Props for the DeliveryTab component
type Props = {
  project: Project;
};

export default function DeliveryTab({ project }: Props) {
  // State to manage the active sub-tab, defaulting to 'lessonsLearned'
  const [activeTab, setActiveTab] = useState<"lessonsLearned" | "riskRegister">(
    "lessonsLearned"
  );

  // State for Lessons Learned
  const [lessonsLearned, setLessonsLearned] = useState<LessonLearnedItem[]>([]);
  const [showAddLessonForm, setShowAddLessonForm] = useState(false);
  const [loadingLessons, setLoadingLessons] = useState(false);
  const [errorLessons, setErrorLessons] = useState<string | null>(null);
  const [newLessonLearned, setNewLessonLearned] = useState<Omit<LessonLearnedItem, "id">>({
    topic: "",
    experience: "",
    impactRecurrence: "",
    lessonLearned: "",
    bestPractice: "",
    assignedTo: "",
  });
  // State to track which lesson is being edited
  const [editingLessonId, setEditingLessonId] = useState<number | null>(null);
  const [currentEditingLesson, setCurrentEditingLesson] = useState<LessonLearnedItem | null>(null);

  // State for Risk Register
  const [riskItems, setRiskItems] = useState<RiskItem[]>([]);
  const [showAddRiskForm, setShowAddRiskForm] = useState(false);
  const [loadingRisks, setLoadingRisks] = useState(false);
  const [errorRisks, setErrorRisks] = useState<string | null>(null);
  const [newRiskItem, setNewRiskItem] = useState<Omit<RiskItem, "id" | "riskScore">>({
    riskId: "",
    riskDescription: "",
    category: "",
    impact: "",
    likelihood: "",
    mitigationPlan: "",
    contingencyPlan: "",
    owner: "",
    status: "Open", // Default status
    dateIdentified: "",
    dateClosed: null,
  });
  // State to track which risk is being edited
  const [editingRiskId, setEditingRiskId] = useState<number | null>(null);
  const [currentEditingRisk, setCurrentEditingRisk] = useState<RiskItem | null>(null);


  // Utility to format date for display
  const formatDateForDisplay = (dateString: string | null) => {
    if (!dateString) return "N/A";
    try {
      const [datePart] = dateString.split("T");
      // Create a date object in the local timezone to avoid off-by-one day issues
      const [year, month, day] = datePart.split("-").map(Number);
      const displayDate = new Date(year, month - 1, day);
      return displayDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateString; // Return original if parsing fails
    }
  };

  // Utility to format date for input type="date" (YYYY-MM-DD)
  const formatDateForInput = (dateString: string | null) => {
    if (!dateString) return "";
    try {
      return dateString.split("T")[0];
    } catch {
      return dateString;
    }
  };

  // Utility to create date string with UTC noon to avoid timezone shift
  const createDateString = (dateInput: string) => {
    if (dateInput && !dateInput.includes("T")) {
      return `${dateInput}T12:00:00Z`;
    }
    return dateInput;
  };

  // Effect to fetch Lessons Learned data
  useEffect(() => {
    const fetchLessonsLearned = async () => {
      if (!project.id) return;
      try {
        setLoadingLessons(true);
        setErrorLessons(null);
        const response = await fetch(`/api/projects/${project.id}/lessons-learned`);
        if (!response.ok) throw new Error(`Status: ${response.status}`);
        const data = await response.json();
        setLessonsLearned(data.lessonsLearned || []);
      } catch (err) {
        console.error("Fetch lessons learned error:", err);
        setErrorLessons("Failed to load lessons learned data");
      } finally {
        setLoadingLessons(false);
      }
    };
    if (activeTab === "lessonsLearned") {
      fetchLessonsLearned();
    }
  }, [project.id, activeTab]);

  // Effect to fetch Risk Register data
  useEffect(() => {
    const fetchRiskItems = async () => {
      if (!project.id) return;
      try {
        setLoadingRisks(true);
        setErrorRisks(null);
        const response = await fetch(`/api/projects/${project.id}/risk-register`);
        if (!response.ok) throw new Error(`Status: ${response.status}`);
        const data = await response.json();
        setRiskItems(data.riskItems || []);
      } catch (err) {
        console.error("Fetch risk items error:", err);
        setErrorRisks("Failed to load risk register data");
      } finally {
        setLoadingRisks(false);
      }
    };
    if (activeTab === "riskRegister") {
      fetchRiskItems();
    }
  }, [project.id, activeTab]);

  // --- Lessons Learned Handlers ---

  const handleAddLessonLearned = async () => {
    const { topic, experience, impactRecurrence, lessonLearned, bestPractice, assignedTo } = newLessonLearned;

    if (!topic || !experience || !impactRecurrence || !lessonLearned || !bestPractice || !assignedTo) {
      alert("Please fill in all required fields for Lessons Learned");
      return;
    }

    try {
      setLoadingLessons(true);
      setErrorLessons(null);
      const response = await fetch(`/api/projects/${project.id}/lessons-learned`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newLessonLearned),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Unknown error");
      }

      const savedItem = await response.json();
      setLessonsLearned((prev) => [...prev, savedItem]);
      setNewLessonLearned({
        topic: "", experience: "", impactRecurrence: "",
        lessonLearned: "", bestPractice: "", assignedTo: "",
      });
      setShowAddLessonForm(false);
    } catch (err) {
      console.error("Add lesson learned error:", err);
      setErrorLessons("Failed to add lesson learned. Please try again.");
    } finally {
      setLoadingLessons(false);
    }
  };

  const handleEditLesson = (lesson: LessonLearnedItem) => {
    setEditingLessonId(lesson.id);
    setCurrentEditingLesson({ ...lesson }); // Create a mutable copy for editing
  };

  const handleCancelEditLesson = () => {
    setEditingLessonId(null);
    setCurrentEditingLesson(null);
  };

  const handleChangeEditingLesson = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof LessonLearnedItem) => {
    if (currentEditingLesson) {
      setCurrentEditingLesson({
        ...currentEditingLesson,
        [field]: e.target.value,
      });
    }
  };

  const handleUpdateLessonLearned = async (lessonId: number) => {
    if (!currentEditingLesson) return;

    const { topic, experience, impactRecurrence, lessonLearned, bestPractice, assignedTo } = currentEditingLesson;
    if (!topic || !experience || !impactRecurrence || !lessonLearned || !bestPractice || !assignedTo) {
      alert("Please fill in all required fields for Lessons Learned");
      return;
    }

    try {
      setLoadingLessons(true);
      setErrorLessons(null);
      const response = await fetch(`/api/projects/${project.id}/lessons-learned/${lessonId}`, { // Assuming /api/projects/:projectId/lessons-learned/:id for PATCH
        method: "PATCH", // Use PATCH for partial updates
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentEditingLesson),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Unknown error");
      }

      const updatedItem = await response.json();
      setLessonsLearned((prev) =>
        prev.map((item) => (item.id === lessonId ? updatedItem : item))
      );
      setEditingLessonId(null);
      setCurrentEditingLesson(null);
    } catch (err) {
      console.error("Update lesson learned error:", err);
      setErrorLessons("Failed to update lesson learned. Please try again.");
    } finally {
      setLoadingLessons(false);
    }
  };

  const handleDeleteLesson = async (lessonId: number) => {
    if (!confirm("Are you sure you want to delete this lesson learned item?")) {
      return;
    }

    try {
      setLoadingLessons(true);
      setErrorLessons(null);
      const response = await fetch(`/api/projects/${project.id}/lessons-learned/${lessonId}`, { // Assuming /api/projects/:projectId/lessons-learned/:id for DELETE
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Unknown error");
      }

      setLessonsLearned((prev) => prev.filter((item) => item.id !== lessonId));
    } catch (err) {
      console.error("Delete lesson learned error:", err);
      setErrorLessons("Failed to delete lesson learned. Please try again.");
    } finally {
      setLoadingLessons(false);
    }
  };

  // --- Risk Register Handlers ---

  const handleAddRiskItem = async () => {
    const {
      riskId, riskDescription, category, impact, likelihood,
      mitigationPlan, contingencyPlan, owner, status, dateIdentified, dateClosed,
    } = newRiskItem;

    if (!riskId || !riskDescription || !category || !impact || !likelihood || !mitigationPlan || !owner || !dateIdentified) {
      alert("Please fill in all required fields for Risk Register");
      return;
    }

    const calculatedRiskScore = 0; // Placeholder: Implement actual calculation based on your risk matrix

    try {
      setLoadingRisks(true);
      setErrorRisks(null);
      const response = await fetch(`/api/projects/${project.id}/risk-register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newRiskItem,
          riskScore: calculatedRiskScore,
          dateIdentified: createDateString(dateIdentified),
          dateClosed: dateClosed ? createDateString(dateClosed) : null,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Unknown error");
      }

      const savedItem = await response.json();
      setRiskItems((prev) => [...prev, savedItem]);
      setNewRiskItem({
        riskId: "", riskDescription: "", category: "", impact: "", likelihood: "",
        mitigationPlan: "", contingencyPlan: "", owner: "", status: "Open",
        dateIdentified: "", dateClosed: null,
      });
      setShowAddRiskForm(false);
    } catch (err) {
      console.error("Add risk item error:", err);
      setErrorRisks("Failed to add risk item. Please try again.");
    } finally {
      setLoadingRisks(false);
    }
  };

  const handleEditRisk = (risk: RiskItem) => {
    setEditingRiskId(risk.id);
    setCurrentEditingRisk({ ...risk }); // Create a mutable copy for editing
  };

  const handleCancelEditRisk = () => {
    setEditingRiskId(null);
    setCurrentEditingRisk(null);
  };

  const handleChangeEditingRisk = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, field: keyof RiskItem) => {
    if (currentEditingRisk) {
      setCurrentEditingRisk({
        ...currentEditingRisk,
        [field]: e.target.value,
      });
    }
  };

  const handleUpdateRiskItem = async (riskId: number) => {
    if (!currentEditingRisk) return;

    const {
      riskId: rId, riskDescription, category, impact, likelihood,
      mitigationPlan, owner, dateIdentified,
    } = currentEditingRisk;

    if (!rId || !riskDescription || !category || !impact || !likelihood || !mitigationPlan || !owner || !dateIdentified) {
      alert("Please fill in all required fields for Risk Register");
      return;
    }

    // Recalculate risk score if impact/likelihood changed (example)
    const updatedRiskScore = currentEditingRisk.riskScore; // Or recalculate based on updated impact/likelihood

    try {
      setLoadingRisks(true);
      setErrorRisks(null);
      const response = await fetch(`/api/projects/${project.id}/risk-register/${riskId}`, { // Assuming /api/projects/:projectId/risk-register/:id for PATCH
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...currentEditingRisk,
          riskScore: updatedRiskScore,
          dateIdentified: createDateString(currentEditingRisk.dateIdentified),
          dateClosed: currentEditingRisk.dateClosed ? createDateString(currentEditingRisk.dateClosed) : null,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Unknown error");
      }

      const updatedItem = await response.json();
      setRiskItems((prev) =>
        prev.map((item) => (item.id === riskId ? updatedItem : item))
      );
      setEditingRiskId(null);
      setCurrentEditingRisk(null);
    } catch (err) {
      console.error("Update risk item error:", err);
      setErrorRisks("Failed to update risk item. Please try again.");
    } finally {
      setLoadingRisks(false);
    }
  };

  const handleDeleteRisk = async (riskId: number) => {
    if (!confirm("Are you sure you want to delete this risk item?")) {
      return;
    }

    try {
      setLoadingRisks(true);
      setErrorRisks(null);
      const response = await fetch(`/api/projects/${project.id}/risk-register/${riskId}`, { // Assuming /api/projects/:projectId/risk-register/:id for DELETE
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Unknown error");
      }

      setRiskItems((prev) => prev.filter((item) => item.id !== riskId));
    } catch (err) {
      console.error("Delete risk item error:", err);
      setErrorRisks("Failed to delete risk item. Please try again.");
    } finally {
      setLoadingRisks(false);
    }
  };

  // Function to get status class for styling (for Risk Register)
  const getRiskStatusClass = (status: string) => {
    switch (status) {
      case "Open":
        return styles.statusNotPaid;
      case "Mitigated":
        return styles.statusInProgress;
      case "Closed":
        return styles.statusPaid;
      default:
        return "";
    }
  };

  return (
    <div className={styles.generalContent}>
      {/* Sub-tab navigation */}
      <div className={styles.tabNavigation}>
        <button
          className={`${styles.subTabButton} ${
            activeTab === "lessonsLearned" ? styles.activeSubTab : ""
          }`}
          onClick={() => {
            setActiveTab("lessonsLearned");
            setShowAddLessonForm(false); // Hide add form when switching tabs
            setEditingLessonId(null); // Exit edit mode
            setCurrentEditingLesson(null);
          }}
        >
          Lessons Learned
        </button>
        <button
          className={`${styles.subTabButton} ${
            activeTab === "riskRegister" ? styles.activeSubTab : ""
          }`}
          onClick={() => {
            setActiveTab("riskRegister");
            setShowAddRiskForm(false); // Hide add form when switching tabs
            setEditingRiskId(null); // Exit edit mode
            setCurrentEditingRisk(null);
          }}
        >
          Risk Register
        </button>
      </div>

      <div className={styles.divider}></div>

      {/* Conditional rendering for Lessons Learned Tab */}
      {activeTab === "lessonsLearned" && (
        <div className={styles.actualsSection}>
          {errorLessons && (
            <div
              style={{
                background: "#fee", color: "#c33", padding: "10px",
                marginBottom: "20px", borderRadius: "4px", border: "1px solid #fcc",
              }}
            >
              {errorLessons}
            </div>
          )}

          <div className={styles.fieldGroup}>
            <div className={styles.actualsHeader}>
              <label>Lessons Learned</label>
              <button
                className={styles.addInvoiceButton}
                onClick={() => setShowAddLessonForm(!showAddLessonForm)}
                disabled={loadingLessons}
              >
                {loadingLessons ? "Loading..." : showAddLessonForm ? "Cancel" : "Add Lesson Learned"}
              </button>
            </div>

            {showAddLessonForm && (
              <div className={styles.invoiceForm}>
                <div className={styles.formRow}>
                  <div className={styles.formField}>
                    <label>Topic *</label>
                    <input
                      type="text"
                      className={styles.formInput}
                      value={newLessonLearned.topic}
                      onChange={(e) => setNewLessonLearned({ ...newLessonLearned, topic: e.target.value })}
                      placeholder="Enter topic"
                      required
                    />
                  </div>
                  <div className={styles.formField}>
                    <label>Experience *</label>
                    <input
                      type="text"
                      className={styles.formInput}
                      value={newLessonLearned.experience}
                      onChange={(e) => setNewLessonLearned({ ...newLessonLearned, experience: e.target.value })}
                      placeholder="Enter experience"
                      required
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formField}>
                    <label>Impact & Recurrence *</label>
                    <input
                      type="text"
                      className={styles.formInput}
                      value={newLessonLearned.impactRecurrence}
                      onChange={(e) => setNewLessonLearned({ ...newLessonLearned, impactRecurrence: e.target.value })}
                      placeholder="Enter impact and recurrence"
                      required
                    />
                  </div>
                  <div className={styles.formField}>
                    <label>Lessons Learned *</label>
                    <input
                      type="text"
                      className={styles.formInput}
                      value={newLessonLearned.lessonLearned}
                      onChange={(e) => setNewLessonLearned({ ...newLessonLearned, lessonLearned: e.target.value })}
                      placeholder="Enter lessons learned"
                      required
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formField}>
                    <label>Best Practice *</label>
                    <input
                      type="text"
                      className={styles.formInput}
                      value={newLessonLearned.bestPractice}
                      onChange={(e) => setNewLessonLearned({ ...newLessonLearned, bestPractice: e.target.value })}
                      placeholder="Enter best practice"
                      required
                    />
                  </div>
                  <div className={styles.formField}>
                    <label>Assigned To *</label>
                    <input
                      type="text"
                      className={styles.formInput}
                      value={newLessonLearned.assignedTo}
                      onChange={(e) => setNewLessonLearned({ ...newLessonLearned, assignedTo: e.target.value })}
                      placeholder="Enter assigned person"
                      required
                    />
                  </div>
                </div>

                <div className={styles.formActions}>
                  <button
                    className={styles.saveInvoiceButton}
                    onClick={handleAddLessonLearned}
                    disabled={loadingLessons}
                  >
                    {loadingLessons ? "Saving..." : "Save Lesson Learned"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddLessonForm(false)}
                    style={{ marginLeft: "10px", background: "#ccc" }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className={styles.tableContainer}>
              <table className={styles.actualsTable}>
                <thead>
                  <tr>
                    <th>Topic</th>
                    <th>Experience</th>
                    <th>Impact & Recurrence</th>
                    <th>Lessons Learned</th>
                    <th>Best Practice</th>
                    <th>Assigned To</th>
                    <th style={{ width: "120px" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loadingLessons ? (
                    <tr>
                      <td colSpan={7} style={{ textAlign: "center", padding: "20px" }}>
                        Loading lessons learned...
                      </td>
                    </tr>
                  ) : lessonsLearned.length === 0 ? (
                    <tr>
                      <td colSpan={7} style={{ textAlign: "center", padding: "20px" }}>
                        No lessons learned found. Add your first lesson!
                      </td>
                    </tr>
                  ) : (
                    lessonsLearned.map((item) => (
                      <tr key={item.id}>
                        {editingLessonId === item.id && currentEditingLesson ? (
                          // Edit Mode
                          <>
                            <td><input type="text" value={currentEditingLesson.topic} onChange={(e) => handleChangeEditingLesson(e, "topic")} className={styles.formInput} /></td>
                            <td><input type="text" value={currentEditingLesson.experience} onChange={(e) => handleChangeEditingLesson(e, "experience")} className={styles.formInput} /></td>
                            <td><input type="text" value={currentEditingLesson.impactRecurrence} onChange={(e) => handleChangeEditingLesson(e, "impactRecurrence")} className={styles.formInput} /></td>
                            <td><input type="text" value={currentEditingLesson.lessonLearned} onChange={(e) => handleChangeEditingLesson(e, "lessonLearned")} className={styles.formInput} /></td>
                            <td><input type="text" value={currentEditingLesson.bestPractice} onChange={(e) => handleChangeEditingLesson(e, "bestPractice")} className={styles.formInput} /></td>
                            <td><input type="text" value={currentEditingLesson.assignedTo} onChange={(e) => handleChangeEditingLesson(e, "assignedTo")} className={styles.formInput} /></td>
                            <td className={styles.actionsCell}>
                              <button onClick={() => handleUpdateLessonLearned(item.id)} className={styles.actionButton} disabled={loadingLessons}>Save</button>
                              <button onClick={handleCancelEditLesson} className={styles.actionButton} disabled={loadingLessons}>Cancel</button>
                            </td>
                          </>
                        ) : (
                          // View Mode
                          <>
                            <td style={{ fontWeight: "600" }}>{item.topic}</td>
                            <td>{item.experience}</td>
                            <td>{item.impactRecurrence}</td>
                            <td>{item.lessonLearned}</td>
                            <td>{item.bestPractice}</td>
                            <td>{item.assignedTo}</td>
                            <td className={styles.actionsCell}>
                              <button onClick={() => handleEditLesson(item)} className={styles.actionButton}>Edit</button>
                              <button onClick={() => handleDeleteLesson(item.id)} className={styles.actionButton} style={{ background: "#dc3545" }}>Delete</button>
                            </td>
                          </>
                        )}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Conditional rendering for Risk Register Tab */}
      {activeTab === "riskRegister" && (
        <div className={styles.actualsSection}>
          {errorRisks && (
            <div
              style={{
                background: "#fee", color: "#c33", padding: "10px",
                marginBottom: "20px", borderRadius: "4px", border: "1px solid #fcc",
              }}
            >
              {errorRisks}
            </div>
          )}

          <div className={styles.fieldGroup}>
            <div className={styles.actualsHeader}>
              <label>Risk Register</label>
              <button
                className={styles.addInvoiceButton}
                onClick={() => setShowAddRiskForm(!showAddRiskForm)}
                disabled={loadingRisks}
              >
                {loadingRisks ? "Loading..." : showAddRiskForm ? "Cancel" : "Add Risk"}
              </button>
            </div>

            {showAddRiskForm && (
              <div className={styles.invoiceForm}>
                <div className={styles.formRow}>
                  <div className={styles.formField}>
                    <label>Risk ID *</label>
                    <input
                      type="text"
                      className={styles.formInput}
                      value={newRiskItem.riskId}
                      onChange={(e) => setNewRiskItem({ ...newRiskItem, riskId: e.target.value })}
                      placeholder="Enter Risk ID"
                      required
                    />
                  </div>
                  <div className={styles.formField}>
                    <label>Risk Description *</label>
                    <input
                      type="text"
                      className={styles.formInput}
                      value={newRiskItem.riskDescription}
                      onChange={(e) => setNewRiskItem({ ...newRiskItem, riskDescription: e.target.value })}
                      placeholder="Enter description"
                      required
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formField}>
                    <label>Category *</label>
                    <input
                      type="text"
                      className={styles.formInput}
                      value={newRiskItem.category}
                      onChange={(e) => setNewRiskItem({ ...newRiskItem, category: e.target.value })}
                      placeholder="Enter category"
                      required
                    />
                  </div>
                  <div className={styles.formField}>
                    <label>Impact *</label>
                    <input
                      type="text"
                      className={styles.formInput}
                      value={newRiskItem.impact}
                      onChange={(e) => setNewRiskItem({ ...newRiskItem, impact: e.target.value })}
                      placeholder="Enter impact"
                      required
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formField}>
                    <label>Likelihood *</label>
                    <input
                      type="text"
                      className={styles.formInput}
                      value={newRiskItem.likelihood}
                      onChange={(e) => setNewRiskItem({ ...newRiskItem, likelihood: e.target.value })}
                      placeholder="Enter likelihood"
                      required
                    />
                  </div>
                  <div className={styles.formField}>
                    <label>Owner *</label>
                    <input
                      type="text"
                      className={styles.formInput}
                      value={newRiskItem.owner}
                      onChange={(e) => setNewRiskItem({ ...newRiskItem, owner: e.target.value })}
                      placeholder="Enter owner"
                      required
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formField}>
                    <label>Mitigation Plan *</label>
                    <input
                      type="text"
                      className={styles.formInput}
                      value={newRiskItem.mitigationPlan}
                      onChange={(e) => setNewRiskItem({ ...newRiskItem, mitigationPlan: e.target.value })}
                      placeholder="Enter mitigation plan"
                      required
                    />
                  </div>
                  <div className={styles.formField}>
                    <label>Contingency Plan</label>
                    <input
                      type="text"
                      className={styles.formInput}
                      value={newRiskItem.contingencyPlan || ""}
                      onChange={(e) => setNewRiskItem({ ...newRiskItem, contingencyPlan: e.target.value })}
                      placeholder="Enter contingency plan (optional)"
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formField}>
                    <label>Date Identified *</label>
                    <input
                      type="date"
                      className={styles.formInput}
                      value={newRiskItem.dateIdentified}
                      onChange={(e) => setNewRiskItem({ ...newRiskItem, dateIdentified: e.target.value })}
                      required
                    />
                  </div>
                  <div className={styles.formField}>
                    <label>Date Closed</label>
                    <input
                      type="date"
                      className={styles.formInput}
                      value={newRiskItem.dateClosed ? formatDateForInput(newRiskItem.dateClosed) : ""}
                      onChange={(e) => setNewRiskItem({ ...newRiskItem, dateClosed: e.target.value || null })}
                      min={newRiskItem.dateIdentified}
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formField}>
                    <label>Status</label>
                    <select
                      className={styles.formSelect}
                      value={newRiskItem.status}
                      onChange={(e) => setNewRiskItem({ ...newRiskItem, status: e.target.value as RiskItem["status"] })}
                    >
                      <option value="Open">Open</option>
                      <option value="Mitigated">Mitigated</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </div>
                </div>

                <div className={styles.formActions}>
                  <button
                    className={styles.saveInvoiceButton}
                    onClick={handleAddRiskItem}
                    disabled={loadingRisks}
                  >
                    {loadingRisks ? "Saving..." : "Save Risk"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddRiskForm(false)}
                    style={{ marginLeft: "10px", background: "#ccc" }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className={styles.tableContainer}>
              <table className={styles.actualsTable}>
                <thead>
                  <tr>
                    <th>Risk ID</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Impact</th>
                    <th>Likelihood</th>
                    <th>Score</th>
                    <th>Mitigation Plan</th>
                    <th>Contingency Plan</th>
                    <th>Owner</th>
                    <th>Status</th>
                    <th>Date Identified</th>
                    <th>Date Closed</th>
                    <th style={{ width: "120px" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loadingRisks ? (
                    <tr>
                      <td colSpan={13} style={{ textAlign: "center", padding: "20px" }}>
                        Loading risk register...
                      </td>
                    </tr>
                  ) : riskItems.length === 0 ? (
                    <tr>
                      <td colSpan={13} style={{ textAlign: "center", padding: "20px" }}>
                        No risks found. Add your first risk!
                      </td>
                    </tr>
                  ) : (
                    riskItems.map((item) => (
                      <tr key={item.id}>
                        {editingRiskId === item.id && currentEditingRisk ? (
                          // Edit Mode for Risk Register
                          <>
                            <td><input type="text" value={currentEditingRisk.riskId} onChange={(e) => handleChangeEditingRisk(e, "riskId")} className={styles.formInput} /></td>
                            <td><input type="text" value={currentEditingRisk.riskDescription} onChange={(e) => handleChangeEditingRisk(e, "riskDescription")} className={styles.formInput} /></td>
                            <td><input type="text" value={currentEditingRisk.category} onChange={(e) => handleChangeEditingRisk(e, "category")} className={styles.formInput} /></td>
                            <td><input type="text" value={currentEditingRisk.impact} onChange={(e) => handleChangeEditingRisk(e, "impact")} className={styles.formInput} /></td>
                            <td><input type="text" value={currentEditingRisk.likelihood} onChange={(e) => handleChangeEditingRisk(e, "likelihood")} className={styles.formInput} /></td>
                            <td>{currentEditingRisk.riskScore}</td> {/* Risk score is calculated, not directly editable here */}
                            <td><input type="text" value={currentEditingRisk.mitigationPlan} onChange={(e) => handleChangeEditingRisk(e, "mitigationPlan")} className={styles.formInput} /></td>
                            <td><input type="text" value={currentEditingRisk.contingencyPlan || ""} onChange={(e) => handleChangeEditingRisk(e, "contingencyPlan")} className={styles.formInput} /></td>
                            <td><input type="text" value={currentEditingRisk.owner} onChange={(e) => handleChangeEditingRisk(e, "owner")} className={styles.formInput} /></td>
                            <td>
                              <select
                                value={currentEditingRisk.status}
                                onChange={(e) => handleChangeEditingRisk(e, "status")}
                                className={styles.formSelect}
                              >
                                <option value="Open">Open</option>
                                <option value="Mitigated">Mitigated</option>
                                <option value="Closed">Closed</option>
                              </select>
                            </td>
                            <td><input type="date" value={formatDateForInput(currentEditingRisk.dateIdentified)} onChange={(e) => handleChangeEditingRisk(e, "dateIdentified")} className={styles.formInput} /></td>
                            <td><input type="date" value={formatDateForInput(currentEditingRisk.dateClosed)} onChange={(e) => handleChangeEditingRisk(e, "dateClosed")} className={styles.formInput} /></td>
                            <td className={styles.actionsCell}>
                              <button onClick={() => handleUpdateRiskItem(item.id)} className={styles.actionButton} disabled={loadingRisks}>Save</button>
                              <button onClick={handleCancelEditRisk} className={styles.actionButton} disabled={loadingRisks}>Cancel</button>
                            </td>
                          </>
                        ) : (
                          // View Mode for Risk Register
                          <>
                            <td style={{ fontWeight: "600" }}>{item.riskId}</td>
                            <td>{item.riskDescription}</td>
                            <td>{item.category}</td>
                            <td>{item.impact}</td>
                            <td>{item.likelihood}</td>
                            <td>{item.riskScore}</td>
                            <td>{item.mitigationPlan}</td>
                            <td>{item.contingencyPlan}</td>
                            <td>{item.owner}</td>
                            <td>
                              <span className={`${styles.statusDisplay} ${getRiskStatusClass(item.status)}`}>
                                {item.status}
                              </span>
                            </td>
                            <td>{formatDateForDisplay(item.dateIdentified)}</td>
                            <td>{formatDateForDisplay(item.dateClosed)}</td>
                            <td className={styles.actionsCell}>
                              <button onClick={() => handleEditRisk(item)} className={styles.actionButton}>Edit</button>
                              <button onClick={() => handleDeleteRisk(item.id)} className={styles.actionButton} style={{ background: "#dc3545" }}>Delete</button>
                            </td>
                          </>
                        )}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
