"use client";
import { useState, useEffect } from "react";
import { mutate } from "swr";
import useSWR from "swr";
import styles from "../styles/ProjectModal.module.css";
import type {
  ProjectFinancials,
  FinancialHistoryEntry,
} from "@/types/ProjectFinancials";

/* ─────────────────────────── Types ─────────────────────────── */
type Props = {
  projectId: string;
  projectFinancials?: ProjectFinancials | null; // may be undefined on first paint
};

type UpdateForm = {
  field:
    | "Total Project Forecast"
    | "Total Project Budget"
    | "Total Project Actuals to Date";
  currentValue: string;
  newValue: string;
  reason: string;
};

/* ───────────────────────── Component ───────────────────────── */
export default function FinancialsTab({
  projectId,
  projectFinancials,
}: Props) {
  console.log("projectFinancials prop:", projectFinancials);

  /* ---------- EARLY RETURN WHILE DATA IS LOADING ---------- */
  if (!projectFinancials) {
    return <div className={styles.loading}>Loading…</div>;
  }

  /* ------------------------- State ------------------------- */
  const [showHistoryPopup, setShowHistoryPopup] = useState(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);

  const [financialValues, setFinancialValues] = useState(() => ({
    forecast: Number(projectFinancials?.forecast ?? 0),
    budget: Number(projectFinancials?.budget ?? 0),
    actuals: Number(projectFinancials?.actuals ?? 0),
  }));

  const [updateForm, setUpdateForm] = useState<UpdateForm>({
    field: "Total Project Forecast",
    currentValue: "",
    newValue: "",
    reason: "",
  });

  const [financialHistory, setFinancialHistory] = useState<
    FinancialHistoryEntry[]
  >(projectFinancials.history);

  /* ----- keep state in sync if parent passes new data ----- */
  useEffect(() => {
    setFinancialValues({
      forecast:
        typeof projectFinancials.forecast === "object" &&
        typeof projectFinancials.forecast.toNumber === "function"
          ? projectFinancials.forecast.toNumber()
          : Number(projectFinancials.forecast),
      budget:
        typeof projectFinancials.budget === "object" &&
        typeof projectFinancials.budget.toNumber === "function"
          ? projectFinancials.budget.toNumber()
          : Number(projectFinancials.budget),
      actuals:
        typeof projectFinancials.actuals === "object" &&
        typeof projectFinancials.actuals.toNumber === "function"
          ? projectFinancials.actuals.toNumber()
          : Number(projectFinancials.actuals),
    });
    setFinancialHistory(projectFinancials.history);
  }, [projectFinancials]);

  /* ------------------------ Helpers ------------------------ */
  function handleUpdateFieldChange(field: UpdateForm["field"]) {
    const currentValue =
      field === "Total Project Forecast"
        ? toCurrency(financialValues.forecast)
        : field === "Total Project Budget"
        ? toCurrency(financialValues.budget)
        : toCurrency(financialValues.actuals);

    setUpdateForm({ field, currentValue, newValue: "", reason: "" });
  }

  /* --------------------- Save to backend ------------------- */
  async function handleSaveUpdate() {
    const key =
      updateForm.field === "Total Project Forecast"
        ? "forecast"
        : updateForm.field === "Total Project Budget"
        ? "budget"
        : "actuals";

    const newValueNum = Number(updateForm.newValue);
    if (Number.isNaN(newValueNum)) {
      alert("Please enter a valid number.");
      return;
    }

    // optimistic update
    setFinancialValues((prev) => ({ ...prev, [key]: newValueNum }));

    const todayStr = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    const fieldMap: Record<UpdateForm["field"], FinancialHistoryEntry["field"]> =
      {
        "Total Project Forecast": "FORECAST",
        "Total Project Budget": "BUDGET",
        "Total Project Actuals to Date": "ACTUALS",
      };

    const historyEntry: FinancialHistoryEntry = {
      id: crypto.randomUUID
        ? crypto.randomUUID()
        : Math.random().toString(36).slice(2),
      date: todayStr,
      field: fieldMap[updateForm.field],
      oldValue: updateForm.currentValue,
      newValue: toCurrency(newValueNum),
      changedBy: "Current User",
      reason: updateForm.reason,
    };
    setFinancialHistory((prev) => [historyEntry, ...prev]);

    await fetch(`/api/projects/${projectId}/financials`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key, value: newValueNum, reason: updateForm.reason }),
    });

    mutate("/api/projects");

    setUpdateForm({
      field: "Total Project Forecast",
      currentValue: "",
      newValue: "",
      reason: "",
    });
    setShowUpdatePopup(false);
  }

  /* ------------------------- UI ---------------------------- */
  return (
    <>
      {/* ─────────── Financial Summary ─────────── */}
      <div className={styles.financialsContent}>
        <div className={styles.actualsHeader} style={{ marginBottom: 16 }}>
          <label>Financial Summary</label>
          <button
            className={styles.addInvoiceButton}
            onClick={() => {
              handleUpdateFieldChange(updateForm.field);
              setShowUpdatePopup(true);
            }}
          >
            Update Values
          </button>
        </div>

        <div className={styles.topSection}>
          <div className={styles.leftColumn}>
            <FieldGroup
              label="Total Project Forecast"
              value={toCurrency(financialValues.forecast)}
            />
            <FieldGroup
              label="Total Project Budget"
              value={toCurrency(financialValues.budget)}
            />
          </div>
          <div className={styles.rightColumn}>
            <FieldGroup
              label="Total Project Actuals to Date"
              value={toCurrency(financialValues.actuals)}
            />
          </div>
        </div>

        <div className={styles.divider} />

        {/* ─────────── History Summary ─────────── */}
        <div className={styles.historySection}>
          <div className={styles.fieldGroup}>
            <div className={styles.actualsHeader}>
              <label>Financial History</label>
              <button
                className={styles.viewDetailsButton}
                onClick={() => setShowHistoryPopup(true)}
              >
                View History
              </button>
            </div>
            <div className={styles.summaryCard}>
              <SummaryItem label="Total Changes" value={financialHistory.length} />
              <SummaryItem
                label="Last Updated"
                value={financialHistory[0]?.date || "N/A"}
              />
              <SummaryItem
                label="Updated By"
                value={financialHistory[0]?.changedBy || "N/A"}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ─────────── History Popup ─────────── */}
      {showHistoryPopup && (
        <Popup title="Financial History" onClose={() => setShowHistoryPopup(false)}>
          <div className={styles.tableContainer}>
            <table className={styles.historyTable}>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Field</th>
                  <th>Old Value</th>
                  <th>New Value</th>
                  <th>Changed By</th>
                  <th>Reason</th>
                </tr>
              </thead>
              <tbody>
                {financialHistory.map((entry, idx) => (
                  <tr key={idx}>
                    <td>{entry.date}</td>
                    <td>{entry.field}</td>
                    <td className={styles.oldValue}>{entry.oldValue}</td>
                    <td className={styles.newValue}>{entry.newValue}</td>
                    <td>{entry.changedBy}</td>
                    <td>{entry.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Popup>
      )}

      {/* ─────────── Update Values Popup ─────────── */}
      {showUpdatePopup && (
        <Popup title="Update Financial Values" onClose={() => setShowUpdatePopup(false)}>
          <div className={styles.invoiceForm}>
            <div className={styles.formRow}>
              <div className={styles.formField}>
                <label>Field to Update</label>
                <select
                  className={styles.formSelect}
                  value={updateForm.field}
                  onChange={(e) =>
                    handleUpdateFieldChange(
                      e.target.value as UpdateForm["field"]
                    )
                  }
                  aria-label="Field to Update"
                >
                  <option value="Total Project Forecast">Total Project Forecast</option>
                  <option value="Total Project Budget">Total Project Budget</option>
                  <option value="Total Project Actuals to Date">
                    Total Project Actuals to Date
                  </option>
                </select>
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formField}>
                <label>Current Value</label>
                <input
                  type="text"
                  className={styles.formInput}
                  value={updateForm.currentValue}
                  disabled
                  style={{ backgroundColor: "#f0f0f0", color: "#666" }}
                />
              </div>

              <div className={styles.formField}>
                <label>New Value</label>
                <input
                  type="text"
                  className={styles.formInput}
                  value={updateForm.newValue}
                  onChange={(e) =>
                    setUpdateForm((p) => ({ ...p, newValue: e.target.value }))
                  }
                  placeholder="125000.00"
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formField}>
                <label>Reason for Change</label>
                <input
                  type="text"
                  className={styles.formInput}
                  value={updateForm.reason}
                  onChange={(e) =>
                    setUpdateForm((p) => ({ ...p, reason: e.target.value }))
                  }
                  placeholder="Explain why this value is being updated..."
                />
              </div>

              <div className={styles.formActions}>
                <button
                  className={styles.saveInvoiceButton}
                  onClick={handleSaveUpdate}
                  disabled={!updateForm.newValue || !updateForm.reason}
                  style={{
                    opacity:
                      !updateForm.newValue || !updateForm.reason ? 0.5 : 1,
                    cursor:
                      !updateForm.newValue || !updateForm.reason
                        ? "not-allowed"
                        : "pointer",
                  }}
                >
                  Save Update
                </button>
              </div>
            </div>
          </div>
        </Popup>
      )}
    </>
  );
}

/* ───────────────────────── Utilities ───────────────────────── */
function toCurrency(num: number | { toNumber: () => number }) {
  const value =
    typeof num === "number"
      ? num
      : typeof num === "object" && typeof num.toNumber === "function"
      ? num.toNumber()
      : Number(num);
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

interface FieldGroupProps {
  label: string;
  value: string | number;
}
function FieldGroup({ label, value }: FieldGroupProps) {
  return (
    <div className={styles.fieldGroup}>
      <label>{label}</label>
      <div className={styles.fieldValue}>{value}</div>
    </div>
  );
}

interface SummaryItemProps {
  label: string;
  value: string | number;
}
function SummaryItem({ label, value }: SummaryItemProps) {
  return (
    <div className={styles.summaryItem}>
      <span className={styles.summaryLabel}>{label}:</span>
      <span className={styles.summaryValue}>{value}</span>
    </div>
  );
}

interface PopupProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}
function Popup({ title, children, onClose }: PopupProps) {
  return (
    <div className={styles.popupOverlay} onClick={onClose}>
      <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
        <div className={styles.popupHeader}>
          <h3>{title}</h3>
          <button className={styles.popupCloseButton} onClick={onClose}>
            ✖
          </button>
        </div>
        <div className={styles.popupContent}>{children}</div>
      </div>
    </div>
  );
}

