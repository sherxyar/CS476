
"use client";
import { useState } from "react";
import styles from "../styles/ProjectModal.module.css";
import type { Project } from "@/types/Project";



type Props = {
 project: Project;
};




type RiskEntry = {
  id: string;
  date: string;
  riskDescription: string;
  category: "Technical" | "Financial" | "Schedule" | "Resource" | "External" | "Safety" | "Environmental" | "Regulatory" | "Quality" | "Procurement";
  probability: "Very Low" | "Low" | "Medium" | "High" | "Very High";
  impact: "Very Low" | "Low" | "Medium" | "High" | "Very High";
  riskLevel: "Low" | "Medium" | "High" | "Critical";
  mitigation: string;
  contingency: string;
  owner: string;
  status: "Identified" | "Assessed" | "Planned" | "Monitoring" | "Closed" | "Escalated";
  dueDate: string;
  responseStrategy: "Avoid" | "Mitigate" | "Transfer" | "Accept";
};

type LessonEntry = {
  id: string;
  date: string;
  category: "Process" | "Technical" | "Communication" | "Planning" | "Resource Management";
  title: string;
  description: string;
  impact: "Positive" | "Negative";
  recommendation: string;
  applicablePhases: string[];
  priority: "Low" | "Medium" | "High";
  documentedBy: string;
};


export default function DeliveryTab({ project: _project }: Props) {
  const [activeSubTab, setActiveSubTab] = useState("Risk");
  const [showAddRisk, setShowAddRisk] = useState(false);
  const [showAddLesson, setShowAddLesson] = useState(false);

  const [risks, setRisks] = useState<RiskEntry[]>([
    {
      id: "RSK-001",
      date: "Jan 10, 2025",
      riskDescription: "Weather delays during asphalt laying operations",
      category: "External",
      probability: "High",
      impact: "Medium",
      riskLevel: "High",
      mitigation: "Monitor weather forecasts daily, maintain flexible scheduling",
      contingency: "Secure indoor storage for materials, have backup dates scheduled",
      owner: "John Doe",
      status: "Monitoring",
      dueDate: "Feb 15, 2025",
      responseStrategy: "Mitigate"
    },
    {
      id: "RSK-002",
      date: "Jan 8, 2025",
      riskDescription: "Asphalt material cost escalation beyond approved budget",
      category: "Financial",
      probability: "Medium",
      impact: "High",
      riskLevel: "High",
      mitigation: "Lock in material prices with suppliers early",
      contingency: "Maintain 8% contingency buffer for material cost variations",
      owner: "Jane Smith",
      status: "Identified",
      dueDate: "Jan 30, 2025",
      responseStrategy: "Transfer"
    },
    {
      id: "RSK-003",
      date: "Jan 12, 2025",
      riskDescription: "Equipment failure during critical paving operations",
      category: "Technical",
      probability: "Low",
      impact: "High",
      riskLevel: "Medium",
      mitigation: "Conduct preventive maintenance, have backup equipment on standby",
      contingency: "Maintain service contracts with equipment rental companies",
      owner: "Mike Johnson",
      status: "Planned",
      dueDate: "Jan 25, 2025",
      responseStrategy: "Mitigate"
    },
    {
      id: "RSK-004",
      date: "Jan 14, 2025",
      riskDescription: "Underground utility conflicts not identified in survey",
      category: "Technical",
      probability: "Medium",
      impact: "Very High",
      riskLevel: "Critical",
      mitigation: "Conduct comprehensive utility location survey before excavation",
      contingency: "Have emergency repair crews and materials on standby",
      owner: "Sarah Wilson",
      status: "Assessed",
      dueDate: "Jan 20, 2025",
      responseStrategy: "Avoid"
    },
    {
      id: "RSK-005",
      date: "Jan 16, 2025",
      riskDescription: "School safety protocols during construction activities",
      category: "Safety",
      probability: "Medium",
      impact: "Very High",
      riskLevel: "Critical",
      mitigation: "Coordinate with school administration, implement safety barriers",
      contingency: "Have safety officer on-site during school hours",
      owner: "Tom Brown",
      status: "Monitoring",
      dueDate: "Feb 20, 2025",
      responseStrategy: "Mitigate"
    }
  ]);

  const [lessons, setLessons] = useState<LessonEntry[]>([
    {
      id: "LL-001",
      date: "Jan 15, 2025",
      category: "Planning",
      title: "Early stakeholder engagement improves approval times",
      description: "Engaging with city planning office 2 weeks earlier than scheduled resulted in faster permit approvals and reduced project delays",
      impact: "Positive",
      recommendation: "Always initiate stakeholder engagement at least 3 weeks before planned start date",
      applicablePhases: ["Planning", "Initiation"],
      priority: "High",
      documentedBy: "Jane Smith"
    },
    {
      id: "LL-002",
      date: "Jan 12, 2025",
      category: "Communication",
      title: "Regular progress updates reduce client concerns",
      description: "Weekly progress reports with photos significantly reduced client inquiries and improved satisfaction",
      impact: "Positive",
      recommendation: "Implement weekly visual progress reports for all projects",
      applicablePhases: ["Execution", "Monitoring"],
      priority: "Medium",
      documentedBy: "John Doe"
    },
    {
      id: "LL-003",
      date: "Jan 10, 2025",
      category: "Technical",
      title: "Soil testing should be more comprehensive",
      description: "Limited soil testing led to unexpected foundation work requirements, causing delays and cost overruns",
      impact: "Negative",
      recommendation: "Conduct comprehensive soil testing across entire project area, not just sample points",
      applicablePhases: ["Planning", "Design"],
      priority: "High",
      documentedBy: "Mike Johnson"
    }
  ]);

  const [newRisk, setNewRisk] = useState<Partial<RiskEntry>>({
    riskDescription: "",
    category: "Technical",
    probability: "Low",
    impact: "Low",
    riskLevel: "Low",
    mitigation: "",
    contingency: "",
    owner: "",
    status: "Identified",
    dueDate: "",
    responseStrategy: "Mitigate"
  });

  const [newLesson, setNewLesson] = useState<Partial<LessonEntry>>({
    category: "Process",
    title: "",
    description: "",
    impact: "Positive",
    recommendation: "",
    applicablePhases: [],
    priority: "Low",
    documentedBy: ""
  });

  const calculateRiskLevel = (probability: string, impact: string): RiskEntry["riskLevel"] => {
    const riskMatrix: { [key: string]: { [key: string]: RiskEntry["riskLevel"] } } = {
      "Very Low": { "Very Low": "Low", "Low": "Low", "Medium": "Low", "High": "Medium", "Very High": "Medium" },
      "Low": { "Very Low": "Low", "Low": "Low", "Medium": "Low", "High": "Medium", "Very High": "High" },
      "Medium": { "Very Low": "Low", "Low": "Low", "Medium": "Medium", "High": "High", "Very High": "High" },
      "High": { "Very Low": "Medium", "Low": "Medium", "Medium": "High", "High": "High", "Very High": "Critical" },
      "Very High": { "Very Low": "Medium", "Low": "High", "Medium": "High", "High": "Critical", "Very High": "Critical" }
    };
    return riskMatrix[probability]?.[impact] || "Low";
  };

  const handleAddRisk = () => {
    if (newRisk.riskDescription && newRisk.mitigation && newRisk.contingency && newRisk.owner && newRisk.dueDate) {
      const riskLevel = calculateRiskLevel(newRisk.probability!, newRisk.impact!);
      const risk: RiskEntry = {
        ...newRisk as RiskEntry,
        id: `RSK-${String(risks.length + 1).padStart(3, '0')}`,
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        riskLevel
      };
      setRisks([...risks, risk]);
      setNewRisk({
        riskDescription: "",
        category: "Technical",
        probability: "Low",
        impact: "Low",
        riskLevel: "Low",
        mitigation: "",
        contingency: "",
        owner: "",
        status: "Identified",
        dueDate: "",
        responseStrategy: "Mitigate"
      });
      setShowAddRisk(false);
    }
  };

  const handleAddLesson = () => {
    if (newLesson.title && newLesson.description && newLesson.recommendation && newLesson.documentedBy) {
      const lesson: LessonEntry = {
        ...newLesson as LessonEntry,
        id: `LL-${String(lessons.length + 1).padStart(3, '0')}`,
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        applicablePhases: newLesson.applicablePhases || []
      };
      setLessons([...lessons, lesson]);
      setNewLesson({
        category: "Process",
        title: "",
        description: "",
        impact: "Positive",
        recommendation: "",
        applicablePhases: [],
        priority: "Low",
        documentedBy: ""
      });
      setShowAddLesson(false);
    }
  };

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case "Low": return styles.statusPaid;
      case "Medium": return styles.statusInProgress;
      case "High": return styles.statusClosed;
      case "Critical": return styles.statusNotPaid;
      default: return "";
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "Positive": return styles.statusPaid;
      case "Negative": return styles.statusNotPaid;
      default: return "";
    }
  };

  const subTabs = ["Risk", "Lessons Learned"];

  return (
    <div className={styles.generalContent}>
      {/* Sub-tab Navigation */}
      <div className={styles.tabHeader} style={{ marginBottom: '24px' }}>
        {subTabs.map((subTab) => (
          <button
            key={subTab}
            onClick={() => setActiveSubTab(subTab)}
            className={`${styles.tabButton} ${activeSubTab === subTab ? styles.activeTab : ""}`}
          >
            {subTab}
          </button>
        ))}
      </div>

      {/* Risk Matrix Tab */}
      {activeSubTab === "Risk" && (
        <div className={styles.actualsSection}>
          <div className={styles.fieldGroup}>
            <div className={styles.actualsHeader}>
              <label>Risk Matrix</label>
              <button 
                className={styles.addInvoiceButton} 
                onClick={() => setShowAddRisk(!showAddRisk)}
              >
                Add Risk
              </button>
            </div>

            {/* Risk Summary */}
            <div className={styles.summaryCard}>
              <div className={styles.summaryItem}>
                <span className={styles.summaryLabel}>Total Risks</span>
                <span className={styles.summaryValue}>{risks.length}</span>
              </div>
              <div className={styles.summaryItem}>
                <span className={styles.summaryLabel}>Critical Risks</span>
                <span className={styles.summaryValue}>{risks.filter(r => r.riskLevel === "Critical").length}</span>
              </div>
              <div className={styles.summaryItem}>
                <span className={styles.summaryLabel}>Identified Risks</span>
                <span className={styles.summaryValue}>{risks.filter(r => r.status === "Identified").length}</span>
              </div>
              <div className={styles.summaryItem}>
                <span className={styles.summaryLabel}>Overdue Risks</span>
                <span className={styles.summaryValue}>{risks.filter(r => new Date(r.dueDate) < new Date() && r.status !== "Closed").length}</span>
              </div>
            </div>

            {showAddRisk && (
              <div className={styles.invoiceForm}>
                <div className={styles.formRow}>
                  <div className={styles.formField}>
                    <label>Risk Description</label>
                    <input
                      type="text"
                      className={styles.formInput}
                      value={newRisk.riskDescription}
                      onChange={(e) => setNewRisk({ ...newRisk, riskDescription: e.target.value })}
                      placeholder="Describe the risk"
                    />
                  </div>
                  <div className={styles.formField}>
                    <label>Category</label>
                    <select
                      className={styles.formSelect}
                      value={newRisk.category}
                      onChange={(e) => setNewRisk({ ...newRisk, category: e.target.value as RiskEntry["category"] })}
                    >
                      <option value="Technical">Technical</option>
                      <option value="Financial">Financial</option>
                      <option value="Schedule">Schedule</option>
                      <option value="Resource">Resource</option>
                      <option value="External">External</option>
                      <option value="Safety">Safety</option>
                      <option value="Environmental">Environmental</option>
                      <option value="Regulatory">Regulatory</option>
                      <option value="Quality">Quality</option>
                      <option value="Procurement">Procurement</option>
                    </select>
                  </div>
                </div>
                <div className={styles.formRow}>
                  <div className={styles.formField}>
                    <label>Probability</label>
                    <select
                      className={styles.formSelect}
                      value={newRisk.probability}
                      onChange={(e) => {
                        const probability = e.target.value as RiskEntry["probability"];
                        setNewRisk({ 
                          ...newRisk, 
                          probability,
                          riskLevel: calculateRiskLevel(probability, newRisk.impact!)
                        });
                      }}
                    >
                      <option value="Very Low">Very Low (0.1)</option>
                      <option value="Low">Low (0.3)</option>
                      <option value="Medium">Medium (0.5)</option>
                      <option value="High">High (0.7)</option>
                      <option value="Very High">Very High (0.9)</option>
                    </select>
                  </div>
                  <div className={styles.formField}>
                    <label>Impact</label>
                    <select
                      className={styles.formSelect}
                      value={newRisk.impact}
                      onChange={(e) => {
                        const impact = e.target.value as RiskEntry["impact"];
                        setNewRisk({ 
                          ...newRisk, 
                          impact,
                          riskLevel: calculateRiskLevel(newRisk.probability!, impact)
                        });
                      }}
                    >
                      <option value="Very Low">Very Low</option>
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="Very High">Very High</option>
                    </select>
                  </div>
                </div>
                <div className={styles.formRow}>
                  <div className={styles.formField}>
                    <label>Mitigation Strategy</label>
                    <input
                      type="text"
                      className={styles.formInput}
                      value={newRisk.mitigation}
                      onChange={(e) => setNewRisk({ ...newRisk, mitigation: e.target.value })}
                      placeholder="Primary mitigation approach"
                    />
                  </div>
                  <div className={styles.formField}>
                    <label>Contingency Plan</label>
                    <input
                      type="text"
                      className={styles.formInput}
                      value={newRisk.contingency}
                      onChange={(e) => setNewRisk({ ...newRisk, contingency: e.target.value })}
                      placeholder="Backup plan if mitigation fails"
                    />
                  </div>
                </div>
                <div className={styles.formRow}>
                  <div className={styles.formField}>
                    <label>Risk Owner</label>
                    <input
                      type="text"
                      className={styles.formInput}
                      value={newRisk.owner}
                      onChange={(e) => setNewRisk({ ...newRisk, owner: e.target.value })}
                      placeholder="Who owns this risk?"
                    />
                  </div>
                  <div className={styles.formField}>
                    <label>Response Strategy</label>
                    <select
                      className={styles.formSelect}
                      value={newRisk.responseStrategy}
                      onChange={(e) => setNewRisk({ ...newRisk, responseStrategy: e.target.value as RiskEntry["responseStrategy"] })}
                    >
                      <option value="Avoid">Avoid</option>
                      <option value="Mitigate">Mitigate</option>
                      <option value="Transfer">Transfer</option>
                      <option value="Accept">Accept</option>
                    </select>
                  </div>
                </div>
                <div className={styles.formRow}>
                  <div className={styles.formField}>
                    <label>Due Date</label>
                    <input
                      type="date"
                      className={styles.formInput}
                      value={newRisk.dueDate}
                      onChange={(e) => setNewRisk({ ...newRisk, dueDate: e.target.value })}
                    />
                  </div>
                  <div className={styles.formField}>
                    <label>Status</label>
                    <select
                      className={styles.formSelect}
                      value={newRisk.status}
                      onChange={(e) => setNewRisk({ ...newRisk, status: e.target.value as RiskEntry["status"] })}
                    >
                      <option value="Identified">Identified</option>
                      <option value="Assessed">Assessed</option>
                      <option value="Planned">Planned</option>
                      <option value="Monitoring">Monitoring</option>
                      <option value="Closed">Closed</option>
                      <option value="Escalated">Escalated</option>
                    </select>
                  </div>
                  <div className={styles.formField}>
                    <label>Calculated Risk Level</label>
                    <div className={`${styles.fieldValue} ${getRiskLevelColor(newRisk.riskLevel!)}`}>
                      {calculateRiskLevel(newRisk.probability!, newRisk.impact!)}
                    </div>
                  </div>
                </div>
                <div className={styles.formActions}>
                  <button className={styles.saveInvoiceButton} onClick={handleAddRisk}>
                    Save Risk
                  </button>
                </div>
              </div>
            )}

            <div className={styles.tableContainer}>
              <table className={styles.actualsTable}>
                <thead>
                  <tr>
                    <th>Risk ID</th>
                    <th>Risk Description</th>
                    <th>Category</th>
                    <th>Probability</th>
                    <th>Impact</th>
                    <th>Risk Score</th>
                    <th>Risk Level</th>
                    <th>Mitigation Strategy</th>
                    <th>Contingency Plan</th>
                    <th>Response Strategy</th>
                    <th>Risk Owner</th>
                    <th>Status</th>
                    <th>Target Date</th>
                    <th>Last Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {risks.map((risk) => (
                    <tr key={risk.id}>
                      <td style={{ fontWeight: '600', color: '#007bff' }}>{risk.id}</td>
                      <td style={{ maxWidth: '200px', fontSize: '12px' }}>{risk.riskDescription}</td>
                      <td>
                        <span style={{ 
                          backgroundColor: '#e9ecef', 
                          padding: '2px 6px', 
                          borderRadius: '4px',
                          fontSize: '11px',
                          fontWeight: '500'
                        }}>
                          {risk.category}
                        </span>
                      </td>
                      <td>
                        <span style={{ 
                          backgroundColor: risk.probability === 'Very High' || risk.probability === 'High' ? '#fff3cd' : '#d1ecf1',
                          color: risk.probability === 'Very High' || risk.probability === 'High' ? '#856404' : '#0c5460',
                          padding: '2px 6px', 
                          borderRadius: '4px',
                          fontSize: '11px',
                          fontWeight: '500'
                        }}>
                          {risk.probability}
                        </span>
                      </td>
                      <td>
                        <span style={{ 
                          backgroundColor: risk.impact === 'Very High' || risk.impact === 'High' ? '#f8d7da' : '#d4edda',
                          color: risk.impact === 'Very High' || risk.impact === 'High' ? '#721c24' : '#155724',
                          padding: '2px 6px', 
                          borderRadius: '4px',
                          fontSize: '11px',
                          fontWeight: '500'
                        }}>
                          {risk.impact}
                        </span>
                      </td>
                      <td style={{ fontWeight: '600', textAlign: 'center' }}>
                        {(() => {
                          const probValue = { "Very Low": 1, "Low": 2, "Medium": 3, "High": 4, "Very High": 5 }[risk.probability] || 1;
                          const impactValue = { "Very Low": 1, "Low": 2, "Medium": 3, "High": 4, "Very High": 5 }[risk.impact] || 1;
                          return probValue * impactValue;
                        })()}
                      </td>
                      <td>
                        <span className={getRiskLevelColor(risk.riskLevel)}>
                          {risk.riskLevel}
                        </span>
                      </td>
                      <td style={{ maxWidth: '150px', fontSize: '12px' }}>{risk.mitigation}</td>
                      <td style={{ maxWidth: '150px', fontSize: '12px' }}>{risk.contingency}</td>
                      <td>
                        <span style={{ 
                          backgroundColor: '#f8f9fa',
                          border: '1px solid #dee2e6',
                          padding: '2px 6px', 
                          borderRadius: '4px',
                          fontSize: '11px',
                          fontWeight: '500'
                        }}>
                          {risk.responseStrategy}
                        </span>
                      </td>
                      <td style={{ fontWeight: '500' }}>{risk.owner}</td>
                      <td>
                        <span style={{ 
                          backgroundColor: risk.status === 'Closed' ? '#d4edda' : risk.status === 'Escalated' ? '#f8d7da' : '#fff3cd',
                          color: risk.status === 'Closed' ? '#155724' : risk.status === 'Escalated' ? '#721c24' : '#856404',
                          padding: '2px 6px', 
                          borderRadius: '4px',
                          fontSize: '11px',
                          fontWeight: '500'
                        }}>
                          {risk.status}
                        </span>
                      </td>
                      <td style={{ fontSize: '12px' }}>{risk.dueDate}</td>
                      <td style={{ fontSize: '12px' }}>{risk.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Lessons Learned Tab */}
      {activeSubTab === "Lessons Learned" && (
        <div className={styles.actualsSection}>
          <div className={styles.fieldGroup}>
            <div className={styles.actualsHeader}>
              <label>Lessons Learned Log</label>
              <button 
                className={styles.addInvoiceButton} 
                onClick={() => setShowAddLesson(!showAddLesson)}
              >
                Add Lesson
              </button>
            </div>

            {/* Lessons Summary */}
            <div className={styles.summaryCard}>
              <div className={styles.summaryItem}>
                <span className={styles.summaryLabel}>Total Lessons</span>
                <span className={styles.summaryValue}>{lessons.length}</span>
              </div>
              <div className={styles.summaryItem}>
                <span className={styles.summaryLabel}>Positive Lessons</span>
                <span className={styles.summaryValue}>{lessons.filter(l => l.impact === "Positive").length}</span>
              </div>
              <div className={styles.summaryItem}>
                <span className={styles.summaryLabel}>Negative Lessons</span>
                <span className={styles.summaryValue}>{lessons.filter(l => l.impact === "Negative").length}</span>
              </div>
              <div className={styles.summaryItem}>
                <span className={styles.summaryLabel}>High Priority</span>
                <span className={styles.summaryValue}>{lessons.filter(l => l.priority === "High").length}</span>
              </div>
            </div>

            {showAddLesson && (
              <div className={styles.invoiceForm}>
                <div className={styles.formRow}>
                  <div className={styles.formField}>
                    <label>Title</label>
                    <input
                      type="text"
                      className={styles.formInput}
                      value={newLesson.title}
                      onChange={(e) => setNewLesson({ ...newLesson, title: e.target.value })}
                      placeholder="Brief title of the lesson"
                    />
                  </div>
                  <div className={styles.formField}>
                    <label>Category</label>
                    <select
                      className={styles.formSelect}
                      value={newLesson.category}
                      onChange={(e) => setNewLesson({ ...newLesson, category: e.target.value as LessonEntry["category"] })}
                    >
                      <option value="Process">Process</option>
                      <option value="Technical">Technical</option>
                      <option value="Communication">Communication</option>
                      <option value="Planning">Planning</option>
                      <option value="Resource Management">Resource Management</option>
                    </select>
                  </div>
                </div>
                <div className={styles.formRow}>
                  <div className={styles.formField}>
                    <label>Description</label>
                    <input
                      type="text"
                      className={styles.formInput}
                      value={newLesson.description}
                      onChange={(e) => setNewLesson({ ...newLesson, description: e.target.value })}
                      placeholder="Detailed description of what happened"
                    />
                  </div>
                  <div className={styles.formField}>
                    <label>Impact</label>
                    <select
                      className={styles.formSelect}
                      value={newLesson.impact}
                      onChange={(e) => setNewLesson({ ...newLesson, impact: e.target.value as LessonEntry["impact"] })}
                    >
                      <option value="Positive">Positive</option>
                      <option value="Negative">Negative</option>
                    </select>
                  </div>
                </div>
                <div className={styles.formRow}>
                  <div className={styles.formField}>
                    <label>Recommendation</label>
                    <input
                      type="text"
                      className={styles.formInput}
                      value={newLesson.recommendation}
                      onChange={(e) => setNewLesson({ ...newLesson, recommendation: e.target.value })}
                      placeholder="What should be done differently next time?"
                    />
                  </div>
                  <div className={styles.formField}>
                    <label>Documented By</label>
                    <input
                      type="text"
                      className={styles.formInput}
                      value={newLesson.documentedBy}
                      onChange={(e) => setNewLesson({ ...newLesson, documentedBy: e.target.value })}
                      placeholder="Who documented this lesson?"
                    />
                  </div>
                </div>
                <div className={styles.formRow}>
                  <div className={styles.formField}>
                    <label>Priority</label>
                    <select
                      className={styles.formSelect}
                      value={newLesson.priority}
                      onChange={(e) => setNewLesson({ ...newLesson, priority: e.target.value as LessonEntry["priority"] })}
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                </div>
                <div className={styles.formActions}>
                  <button className={styles.saveInvoiceButton} onClick={handleAddLesson}>
                    Save Lesson
                  </button>
                </div>
              </div>
            )}

            <div className={styles.tableContainer}>
              <table className={styles.actualsTable}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Impact</th>
                    <th>Recommendation</th>
                    <th>Priority</th>
                    <th>Documented By</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {lessons.map((lesson) => (
                    <tr key={lesson.id}>
                      <td style={{ fontWeight: '600' }}>{lesson.id}</td>
                      <td>{lesson.title}</td>
                      <td>{lesson.category}</td>
                      <td>{lesson.description}</td>
                      <td>
                        <span className={getImpactColor(lesson.impact)}>
                          {lesson.impact}
                        </span>
                      </td>
                      <td>{lesson.recommendation}</td>
                      <td>{lesson.priority}</td>
                      <td>{lesson.documentedBy}</td>
                      <td>{lesson.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
