"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import styles from "../styles/ProjectModal.module.css";

import type { Project } from "@/types/Project";

/* Local helper types                                                 */

type InvoiceStatus = "Paid" | "Not Paid";

interface Invoice {
  date: string;
  invoiceNumber: string;

  // i have formatted as "$12,345.67"
  amount: string;                
  status: InvoiceStatus;
  vendor: string;
}

interface RawHistoryEntry {
  changedAt: string;
  field: "forecast" | "budget" | "actuals";
  oldValue: number;
  newValue: number;
  reason?: string | null;
  changedBy: { name?: string } | null;
}

interface HistoryItem {
  date: string;
  field: string;
  oldValue: string;
  newValue: string;
  changedBy: string;
  reason: string;
}


interface Props {
  project: Project;
  registerChangeHandler: (getChanges: () => Partial<Project>) => void;
}


export default function FinancialsTab({ project }: Props) {
  /*  Animation / loading flags  */
  const [isCalculating, setIsCalculating] = useState(true);
  const [isUpdating, setIsUpdating]       = useState(false);

  /*  Server data  */
  const [financialValues, setFinancialValues] = useState({
    forecast: 0,
    budget: 0,
    actuals: 0,
  });
  const [animatedValues, setAnimatedValues] = useState(financialValues);
  const [financialHistory, setFinancialHistory] = useState<HistoryItem[]>([]);

  /*  UI state  */
  const [showAddInvoice,   setShowAddInvoice]   = useState(false);
  const [showActualsPopup, setShowActualsPopup] = useState(false);
  const [showHistoryPopup, setShowHistoryPopup] = useState(false);
  const [showUpdatePopup,  setShowUpdatePopup]  = useState(false);

  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      date: "Jan 5, 2025",
      invoiceNumber: "INV-2025-001",
      amount: "$15,400.00",
      status: "Paid",
      vendor: "ABC Construction",
    },
    {
      date: "Jan 8, 2025",
      invoiceNumber: "INV-2025-002",
      amount: "$12,830.50",
      status: "Paid",
      vendor: "Regina Materials Co.",
    },
    {
      date: "Jan 12, 2025",
      invoiceNumber: "INV-2025-003",
      amount: "$17,000.00",
      status: "Not Paid",
      vendor: "Equipment Rental Plus",
    },
  ]);

  /*  Forms  */
  const [invoiceForm, setInvoiceForm] = useState({
    date: "",
    invoiceNumber: "",
    amount: "",
    status: "Not Paid" as InvoiceStatus,
    vendor: "",
  });

  const [updateForm, setUpdateForm] = useState({
    field: "Total Project Forecast",
    currentValue: "",
    newValue: "",
    reason: "",
  });

  // get latest financials through API
   
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/projects/${project.id}/financials`);
        if (!res.ok) throw new Error("Failed to fetch project");
        const fullProject = await res.json();

        const target = {
          forecast: fullProject.forecast ?? 0,
          budget: fullProject.budget ?? 0,
          actuals: fullProject.actuals ?? 0,
        };

        setIsCalculating(true);         
        setFinancialValues(target);
        setAnimatedValues(target);       
        setIsCalculating(false);

        /*  Map history to a display-friendly shape  */
        const formattedHistory: HistoryItem[] =
          (fullProject.financialHistory ?? []).map((entry: RawHistoryEntry) => ({
            date: new Date(entry.changedAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            }),
            field:
              entry.field === "forecast"
                ? "Total Project Forecast"
                : entry.field === "budget"
                ? "Total Project Budget"
                : "Total Project Actuals to Date",
            oldValue: `$${entry.oldValue.toFixed(2)}`,
            newValue: `$${entry.newValue.toFixed(2)}`,
            changedBy: entry.changedBy?.name ?? "Unknown",
            reason: entry.reason ?? "—",
          }));

        setFinancialHistory(formattedHistory);
      } catch (err) {
        console.error("Error loading financials:", err);
      }
    })();
  }, [project.id]);

  
   // Invoice helpers
  
  const handleInvoiceFormChange = (field: keyof typeof invoiceForm, value: string) => {
    setInvoiceForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddInvoice = () => {
    if (invoiceForm.date && invoiceForm.invoiceNumber && invoiceForm.amount && invoiceForm.vendor) {
      const newInvoice: Invoice = {
        ...invoiceForm,
        amount: invoiceForm.amount.startsWith("$")
          ? invoiceForm.amount
          : `$${invoiceForm.amount}`,
      };
      setInvoices((prev) => [...prev, newInvoice]);
      setInvoiceForm({
        date: "",
        invoiceNumber: "",
        amount: "",
        status: "Not Paid",
        vendor: "",
      });
      setShowAddInvoice(false);
    }
  };

   // Update financial values (PATCH)

  const fieldMap: Record<string, "forecast" | "budget"> = {
    "Total Project Forecast": "forecast",
    "Total Project Budget": "budget",
  };

  const handleUpdateFieldChange = (field: string) => {
    let currentValue = "";
    if (field === "Total Project Forecast") currentValue = `$${financialValues.forecast.toFixed(2)}`;
    if (field === "Total Project Budget")   currentValue = `$${financialValues.budget.toFixed(2)}`;

    setUpdateForm({ field, currentValue, newValue: "", reason: "" });
  };

  const handleSaveUpdate = async () => {
    if (!updateForm.newValue || !updateForm.reason) return;

    setIsUpdating(true);
    const userId = 1; // TODO: Replace with real user ID
    const newValueNum = parseFloat(updateForm.newValue.replace(/[$,]/g, ""));
    const fieldKey = fieldMap[updateForm.field];

    try {
      const res = await fetch(`/api/projects/${project.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          field: fieldKey,
          newValue: newValueNum,
          reason: updateForm.reason,
          userId,
        }),
      });
      if (!res.ok) throw new Error("Failed to update financials");

      // Update UI state 
      const updatedValues = { ...financialValues, [fieldKey]: newValueNum };
      setFinancialValues(updatedValues);
      setAnimatedValues(updatedValues);

      const historyEntry: HistoryItem = {
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        field: updateForm.field,
        oldValue: updateForm.currentValue,
        newValue: `$${newValueNum.toFixed(2)}`,
        changedBy: "Current User",
        reason: updateForm.reason,
      };
      setFinancialHistory((prev) => [historyEntry, ...prev]);

      toast.success(`${updateForm.field} updated successfully!`);
      setShowUpdatePopup(false);
    } catch (err) {
      console.error("Financial update failed:", err);
      toast.error("Something went wrong while updating.");
    } finally {
      setIsUpdating(false);
    }
  };

 // renderr
  return (
    <>
      {/* Financial summary */}
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
            {[
              ["Total Project Forecast", animatedValues.forecast],
              ["Total Project Budget", animatedValues.budget],
            ].map(([label, val]) => (
              <div className={styles.fieldGroup} key={label}>
                <label>{label}</label>
                <div className={styles.fieldValue}>
                  {isCalculating ? (
                    <span className={styles.calculating}>Calculating...</span>
                  ) : (
                    `$${val.toLocaleString("en-US", { minimumFractionDigits: 2 })}`
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className={styles.rightColumn}>
            <div className={styles.fieldGroup}>
              <label>Total Project Actuals to Date</label>
              <div className={styles.fieldValue}>
                {isCalculating ? (
                  <span className={styles.calculating}>Calculating...</span>
                ) : (
                  `$${animatedValues.actuals.toLocaleString("en-US", { minimumFractionDigits: 2 })}`
                )}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.divider} />

        {/* Actuals summary */}
        <div className={styles.actualsSection}>
          <div className={styles.fieldGroup}>
            <div className={styles.actualsHeader}>
              <label>Actuals Summary</label>
              <button
                className={styles.viewDetailsButton}
                onClick={() => setShowActualsPopup(true)}
              >
                View Details
              </button>
            </div>
            <div className={styles.summaryCard}>
              <div className={styles.summaryItem}>
                <span className={styles.summaryLabel}>Total Invoices:</span>
                <span className={styles.summaryValue}>{invoices.length}</span>
              </div>
              <div className={styles.summaryItem}>
                <span className={styles.summaryLabel}>Paid Amount:</span>
                <span className={styles.summaryValue}>$28,230.50</span>
              </div>
              <div className={styles.summaryItem}>
                <span className={styles.summaryLabel}>Pending Amount:</span>
                <span className={styles.summaryValue}>$17,000.00</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.divider} />

        {/* Financial history */}
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
              <div className={styles.summaryItem}>
                <span className={styles.summaryLabel}>Total Changes:</span>
                <span className={styles.summaryValue}>{financialHistory.length}</span>
              </div>
              <div className={styles.summaryItem}>
                <span className={styles.summaryLabel}>Last Updated:</span>
                <span className={styles.summaryValue}>
                  {financialHistory[0]?.date ?? "—"}
                </span>
              </div>
              <div className={styles.summaryItem}>
                <span className={styles.summaryLabel}>Updated By:</span>
                <span className={styles.summaryValue}>
                  {financialHistory[0]?.changedBy ?? "—"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actuals popup */}
      {showActualsPopup && (
        <div className={styles.popupOverlay} onClick={() => setShowActualsPopup(false)}>
          <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
            <div className={styles.popupHeader}>
              <h3>Project Actuals</h3>
              <button
                className={styles.popupCloseButton}
                onClick={() => setShowActualsPopup(false)}
              >
                ✖
              </button>
            </div>

            <div className={styles.popupContent}>
              <div className={styles.actualsHeader}>
                <label>Invoice Management</label>
                <button
                  className={styles.addInvoiceButton}
                  onClick={() => setShowAddInvoice(!showAddInvoice)}
                >
                  {showAddInvoice ? "Cancel" : "+ Add Invoice"}
                </button>
              </div>

              {/*  Add-invoice form  */}
              {showAddInvoice && (
                <div className={styles.invoiceForm}>
                  <div className={styles.formRow}>
                    <div className={styles.formField}>
                      <label>Date</label>
                      <input
                        type="date"
                        value={invoiceForm.date}
                        onChange={(e) =>
                          handleInvoiceFormChange("date", e.target.value)
                        }
                        className={styles.formInput}
                      />
                    </div>
                    <div className={styles.formField}>
                      <label>Invoice Number</label>
                      <input
                        type="text"
                        value={invoiceForm.invoiceNumber}
                        onChange={(e) =>
                          handleInvoiceFormChange("invoiceNumber", e.target.value)
                        }
                        placeholder="INV-2025-004"
                        className={styles.formInput}
                      />
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formField}>
                      <label>Amount</label>
                      <input
                        type="text"
                        value={invoiceForm.amount}
                        onChange={(e) =>
                          handleInvoiceFormChange("amount", e.target.value)
                        }
                        placeholder="15000.00"
                        className={styles.formInput}
                      />
                    </div>
                    <div className={styles.formField}>
                      <label>Status</label>
                      <select
                        value={invoiceForm.status}
                        onChange={(e) =>
                          handleInvoiceFormChange("status", e.target.value)
                        }
                        className={styles.formSelect}
                      >
                        <option value="Not Paid">Not Paid</option>
                        <option value="Paid">Paid</option>
                      </select>
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formField}>
                      <label>Vendor</label>
                      <input
                        type="text"
                        value={invoiceForm.vendor}
                        onChange={(e) =>
                          handleInvoiceFormChange("vendor", e.target.value)
                        }
                        placeholder="Vendor Name"
                        className={styles.formInput}
                      />
                    </div>

                    <div className={styles.formActions}>
                      <button
                        className={styles.saveInvoiceButton}
                        onClick={handleAddInvoice}
                      >
                        Save Invoice
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/*  Invoice table  */}
              <div className={styles.tableContainer}>
                <table className={styles.actualsTable}>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Invoice Number</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Vendor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.map((inv, idx) => (
                      <tr key={idx}>
                        <td>{inv.date}</td>
                        <td>{inv.invoiceNumber}</td>
                        <td>{inv.amount}</td>
                        <td>
                          <span
                            className={
                              inv.status === "Paid"
                                ? styles.statusPaid
                                : styles.statusNotPaid
                            }
                          >
                            {inv.status}
                          </span>
                        </td>
                        <td>{inv.vendor}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* History popup */}
      {showHistoryPopup && (
        <div className={styles.popupOverlay} onClick={() => setShowHistoryPopup(false)}>
          <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
            <div className={styles.popupHeader}>
              <h3>Financial History</h3>
              <button
                className={styles.popupCloseButton}
                onClick={() => setShowHistoryPopup(false)}
              >
                ✖
              </button>
            </div>

            <div className={styles.popupContent}>
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
                    {financialHistory.map((h, idx) => (
                      <tr key={idx}>
                        <td>{h.date}</td>
                        <td>{h.field}</td>
                        <td className={styles.oldValue}>{h.oldValue}</td>
                        <td className={styles.newValue}>{h.newValue}</td>
                        <td>{h.changedBy}</td>
                        <td>{h.reason}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Update-values popup */}
      {showUpdatePopup && (
        <div className={styles.popupOverlay} onClick={() => setShowUpdatePopup(false)}>
          <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
            <div className={styles.popupHeader}>
              <h3>Update Financial Values</h3>
              <button
                className={styles.popupCloseButton}
                onClick={() => setShowUpdatePopup(false)}
              >
                ✖
              </button>
            </div>

            <div className={styles.popupContent}>
              <div className={styles.invoiceForm}>
                <div className={styles.formRow}>
                  <div className={styles.formField}>
                    <label>Field to Update</label>
                    <select
                      className={styles.formSelect}
                      value={updateForm.field}
                      onChange={(e) => handleUpdateFieldChange(e.target.value)}
                    >
                      <option value="Total Project Forecast">Total Project Forecast</option>
                      <option value="Total Project Budget">Total Project Budget</option>
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
                        setUpdateForm({ ...updateForm, newValue: e.target.value })
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
                        setUpdateForm({ ...updateForm, reason: e.target.value })
                      }
                      placeholder="Explain why this value is being updated..."
                    />
                  </div>

                  <div className={styles.formActions}>
                    <button
                      className={styles.saveInvoiceButton}
                      onClick={handleSaveUpdate}
                      disabled={!updateForm.newValue || !updateForm.reason || isUpdating}
                      style={{
                        opacity:
                          !updateForm.newValue || !updateForm.reason ? 0.5 : 1,
                        cursor:
                          !updateForm.newValue || !updateForm.reason
                            ? "not-allowed"
                            : "pointer",
                      }}
                    >
                      {isUpdating ? "Saving…" : "Save Update"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
