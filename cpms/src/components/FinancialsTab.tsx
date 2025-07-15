"use client";

import { useState, useEffect, useMemo } from "react";
import useInvoices from "@/lib/invoices";
import { toast } from "react-toastify";
import styles from "../styles/ProjectModal.module.css";
import financialStyles from "../styles/FinancialsTab.module.css";
import { useSession, signIn } from "next-auth/react";
import type { Session } from "next-auth";
import type { Project } from "@/types/Project";


type InvoiceStatusForm = "PAID" | "NOT_PAID";

interface InvoiceFormState {
  date: string;
  invoiceNumber: string;
  amount: string;
  status: InvoiceStatusForm;
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
  /* Animation  */
  const [isCalculating, setIsCalculating] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  /* User role check */
  const { data: session, status } = useSession();
  const [isSessionLoaded, setIsSessionLoaded] = useState(false);

  const [isCollaborator, setIsCollaborator] = useState(false);
  const [isUnauthorized, setIsUnauthorized] = useState(false);

  useEffect(() => {
    console.log("Session status:", status);
    console.log("Session data:", session);
    console.log("User role:", session?.user?.accountRole);

    if (status === "authenticated") {
      setIsSessionLoaded(true);

      if (!session?.user?.accountRole) {
        // User has no role defined
        console.error("User has no role defined in session");
        setIsUnauthorized(true);
        setIsCollaborator(false);
      } else {
        // Set Collaborator status based on role (COLLABORATOR == Collaborator in UI terms)
        const isCollaborator = session.user.accountRole === "COLLABORATOR";
        setIsCollaborator(isCollaborator);
        setIsUnauthorized(false);

        console.log("User is Collaborator:", isCollaborator);
        console.log("Full session details:", JSON.stringify(session, null, 2));
      }
    } else if (status === "unauthenticated") {
      // Handle unauthenticated state
      setIsSessionLoaded(true);
      setIsCollaborator(false);
      setIsUnauthorized(true);
      console.log("User is not authenticated");
    } else {
      console.log("Session is loading...");
    }
    // Loading state is handled by not setting isSessionLoaded to true
  }, [session, status]);

  /* Project-level financial values  */
  const [financialValues, setFinancialValues] = useState({
    forecast: 0,
    budget: 0,
    actuals: 0,
  });

  console.log('Test actuals', financialValues.actuals, 'budget', financialValues.budget);

  const [animatedValues, setAnimatedValues] = useState(financialValues);
  const [financialHistory, setFinancialHistory] = useState<HistoryItem[]>([]);

  /* UI state  */
  const [showAddInvoice, setShowAddInvoice] = useState(false);
  const [showActualsPopup, setShowActualsPopup] = useState(false);
  const [showHistoryPopup, setShowHistoryPopup] = useState(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);

  /* Invoices (SWR)  */
  const {
    invoices,
    isLoading: invLoading,
    mutate: refreshInvoices,
  } = useInvoices(project.id);

  const paidTotal = useMemo(
    () =>
      invoices
        .filter((inv) => inv.status === "PAID")
        .reduce((sum, inv) => sum + Number(inv.amount), 0),
    [invoices]
  );

  const unpaidTotal = useMemo(
    () =>
      invoices
        .filter((inv) => inv.status === "NOT_PAID")
        .reduce((sum, inv) => sum + Number(inv.amount), 0),
    [invoices]
  );

  // test 
  console.log('actuals', financialValues.actuals, 'budget', financialValues.budget);

  const actualsProgress =
    financialValues.actuals > 0
      ? Math.min(
        (financialValues.actuals / financialValues.budget) * 100,
        100,
      )
      : 0;

  /* Add-invoice form  */
  const [invoiceForm, setInvoiceForm] = useState<InvoiceFormState>({
    date: "",
    invoiceNumber: "",
    amount: "",
    status: "NOT_PAID",
    vendor: "",
  });

  const handleInvoiceFormChange = (
    field: keyof InvoiceFormState,
    value: string
  ) => setInvoiceForm((prev) => ({ ...prev, [field]: value }));

  const handleAddInvoice = async () => {
    // Double-check that the user is authenticated and has appropriate permissions
    if (!isSessionLoaded || !session) {
      toast.error("You must be logged in to add invoices.");
      return;
    }

    // Only admins and Collaborators can add invoices
    if (isUnauthorized) {
      toast.error("You don't have permission to add invoices.");
      return;
    }

    const { date, invoiceNumber, amount, status, vendor } = invoiceForm;
    if (!date || !invoiceNumber || !amount || !vendor) {
      toast.error("Please fill all required fields.");
      return;
    }

    try {
      const response = await fetch(`/api/projects/${project.id}/invoices`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dateIssued: date,
          invoiceNumber,
          amount: parseFloat(amount.replace(/[$,]/g, "")),
          status,
          vendor,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Error ${response.status}`);
      }

      await refreshInvoices();
      setInvoiceForm({
        date: "",
        invoiceNumber: "",
        amount: "",
        status: "NOT_PAID",
        vendor: "",
      });
      setShowAddInvoice(false);
      toast.success("Invoice added");
    } catch (err) {
      console.error("Add invoice failed:", err);
      toast.error(err instanceof Error ? err.message : "Could not add invoice");
    }
  };

  // GET 
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `/api/projects/${project.id}/financials`

        );
        if (!res.ok) throw new Error("Failed to fetch project");
        const fullProject = await res.json();
        // Check for unauthorized users

        const target = {
          forecast: fullProject.forecast ?? 0,
          budget: fullProject.budget ?? 0,
          actuals: fullProject.actuals ?? 0,
        };

        setIsCalculating(true);
        setFinancialValues(target);
        setAnimatedValues(target);
        setIsCalculating(false);

        const formattedHistory: HistoryItem[] =
          (fullProject.financialHistory ?? []).map(
            (entry: RawHistoryEntry) => ({
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
            })
          );

        setFinancialHistory(formattedHistory);
      } catch (err) {
        console.error("Error loading financials:", err);
      }
    })();
  }, [project.id]);

  // Patch 

  const fieldMap: Record<string, "forecast" | "budget"> = {
    "Total Project Forecast": "forecast",
    "Total Project Budget": "budget",
  };

  const [updateForm, setUpdateForm] = useState({
    field: "Total Project Forecast",
    currentValue: "",
    newValue: "",
    reason: "",
  });

  const handleUpdateFieldChange = (field: string) => {
    // Check if session is still loading
    if (!isSessionLoaded) {
      toast.info("Loading user session...");
      return;
    }

    // Check for unauthorized users
    if (isUnauthorized) {
      toast.error("You don't have permission to update Budget and Forecast values.");
      return;
    }

    // If user is a Collaborator, show toast notification and return
    if (isCollaborator) {
      toast.info("Collaborators can only add invoices. You cannot update Budget and Forecast values.");
      return;
    }

    const currentValue =
      field === "Total Project Forecast"
        ? `$${financialValues.forecast.toFixed(2)}`
        : `$${financialValues.budget.toFixed(2)}`;

    setUpdateForm({ field, currentValue, newValue: "", reason: "" });
  };

  const handleSaveUpdate = async () => {
    if (!updateForm.newValue || !updateForm.reason) return;

    // Check if session is still loading
    if (!isSessionLoaded) {
      toast.info("Loading user session...");
      return;
    }

    // Check for unauthorized users
    if (isUnauthorized) {
      toast.error("You don't have permission to update financial values.");
      return;
    }

    if (isCollaborator) {
      toast.info("Collaborators can only add invoices. You cannot update Budget and Forecast values.");
      return;
    }

    setIsUpdating(true);
    const newValueNum = parseFloat(
      updateForm.newValue.replace(/[$,]/g, "")
    );
    const fieldKey = fieldMap[updateForm.field];

    try {
      const res = await fetch(`/api/projects/${project.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          field: fieldKey,
          newValue: newValueNum,
          reason: updateForm.reason,
          userId: session?.user?.id || 0, 
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || `Error ${res.status}`);
      }

      const updated = { ...financialValues, [fieldKey]: newValueNum };
      setFinancialValues(updated);
      setAnimatedValues(updated);

      setFinancialHistory((prev) => [
        {
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
        },
        ...prev,
      ]);

      toast.success(`${updateForm.field} updated`);
      setShowUpdatePopup(false);
    } catch {
      toast.error("Update failed");
    } finally {
      setIsUpdating(false);
    }
  };

  /*  UI  */
  return (
    <>
      {/*  Financial summary  */}
      <div className={styles.financialsContent}>
        <div className={`${styles.actualsHeader} ${financialStyles.updateButtonSpacing}`}>
          <label>Financial Summary</label>
          <button
            className={`${styles.addInvoiceButton} ${(!isSessionLoaded || isCollaborator) ? financialStyles.disabledButton : ''}`}
            onClick={() => {
              if (!isSessionLoaded) {
                return; 
              }
              if (isCollaborator) {
                toast.info("Collaborators can only add invoices. You cannot update Budget and Forecast values.");
                return;
              }
              handleUpdateFieldChange(updateForm.field);
              setShowUpdatePopup(true);
            }}
          >
            Update Values
          </button>
        </div>

        <div className={styles.topSection}>
          {/* Left column – forecast / budget */}
          <div className={styles.leftColumn}>
            {[
              ["Total Project Forecast", animatedValues.forecast],
              ["Total Project Budget", animatedValues.budget],
            ].map(([label, val]) => (
              <div className={styles.fieldGroup} key={label}>
                <label>{label}</label>
                <div className={styles.fieldValue}>
                  {isCalculating ? (
                    <span className={styles.calculating}>Calculating…</span>
                  ) : (
                    `$${val.toLocaleString("en-US", { minimumFractionDigits: 2 })}`
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Right column – actuals */}
          <div className={styles.rightColumn}>
            <div className={styles.fieldGroup}>
              <label>Total Project Actuals to Date</label>
              <div className={styles.fieldValue}>
                {isCalculating ? (
                  <span className={styles.calculating}>Calculating…</span>
                ) : (
                  `$${paidTotal.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}`
                )}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.divider} />

        {/*  Actuals summary  */}
        <div className={styles.actualsSection}>
          <div className={styles.fieldGroup}>
            <div className={styles.actualsHeader}>
              <label>Actuals Summary</label>
              <button
                className={styles.viewDetailsButton}
                onClick={() => {
                  if (!isSessionLoaded) {
                    toast.info("Loading user session...");
                    return;
                  }
                  if (isUnauthorized) {
                    toast.error("You don't have permission to access this feature.");
                    return;
                  }
                  setShowActualsPopup(true);
                }}
              >
                {isCollaborator ? "Add Invoice" : "View Details"}
              </button>
            </div>
            {/*  Budget-vs-Actuals progress bar  */}
            <div className={styles.progressWrap}>                <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${actualsProgress}%` }}
              />
            </div>
              <span className={styles.progressLabel}>
                {actualsProgress.toFixed(1)}%
              </span>
            </div>
            <div className={styles.summaryCard}>
              <div className={styles.summaryItem}>
                <span className={styles.summaryLabel}>Total Invoices:</span>
                <span className={styles.summaryValue}>
                  {invLoading ? "—" : invoices.length}
                </span>
              </div>

              <div className={styles.summaryItem}>
                <span className={styles.summaryLabel}>Paid Amount:</span>
                <span className={styles.summaryValue}>
                  {invLoading
                    ? "—"
                    : paidTotal.toLocaleString("en-US", {
                      style: "currency",
                      currency: "CAD",
                    })}
                </span>
              </div>

              <div className={styles.summaryItem}>
                <span className={styles.summaryLabel}>Unpaid Amount:</span>
                <span className={styles.summaryValue}>
                  {invLoading
                    ? "—"
                    : unpaidTotal.toLocaleString("en-US", {
                      style: "currency",
                      currency: "CAD",
                    })}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.divider} />

        {/*  Financial history  */}
        <div className={styles.historySection}>
          <div className={styles.fieldGroup}>
            <div className={styles.actualsHeader}>
              <label>Financial History</label>
              <button
                className={`${styles.viewDetailsButton} ${(!isSessionLoaded || isCollaborator || isUnauthorized) ? financialStyles.disabledButton : ''}`}
                onClick={() => {
                  if (!isSessionLoaded) {
                    toast.info("Loading user session...");
                    return;
                  }
                  if (isCollaborator) {
                    toast.info("Collaborators can only add invoices. You cannot view financial history.");
                    return;
                  }
                  if (isUnauthorized) {
                    toast.error("You don't have permission to access this feature.");
                    return;
                  }
                  setShowHistoryPopup(true);
                }}
              >
                View History
              </button>
            </div>

            <div className={styles.summaryCard}>
              <div className={styles.summaryItem}>
                <span className={styles.summaryLabel}>Total Changes:</span>
                <span className={styles.summaryValue}>
                  {financialHistory.length}
                </span>
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

      {/*  Actuals popup  */}
      {showActualsPopup && (
        <div
          className={styles.popupOverlay}
          onClick={() => setShowActualsPopup(false)}
        >
          <div
            className={styles.popup}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.popupHeader}>
              <h3>{isCollaborator ? "Add Invoice" : "Project Actuals"}</h3>
              <button
                className={styles.popupCloseButton}
                onClick={() => setShowActualsPopup(false)}
              >
                ✖
              </button>
            </div>

            <div className={styles.popupContent}>
              {!isCollaborator && !isUnauthorized && (
                <div className={styles.actualsHeader}>
                  <label>Invoice Management</label>
                  <button
                    className={styles.addInvoiceButton}
                    onClick={() => setShowAddInvoice(!showAddInvoice)}
                  >
                    {showAddInvoice ? "Cancel" : "+ Add Invoice"}
                  </button>
                </div>
              )}

              {/*  Add-invoice form  */}
              {(showAddInvoice || isCollaborator) && (
                <div className={styles.invoiceForm}>
                  {isCollaborator && (
                    <div className={financialStyles.CollaboratorMessage}>
                      <p>As a Collaborator, you can add new invoice data to the system.</p>
                    </div>
                  )}
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
                          handleInvoiceFormChange(
                            "status",
                            e.target.value as InvoiceStatusForm
                          )
                        }
                        className={styles.formSelect}
                      >
                        <option value="NOT_PAID">Not Paid</option>
                        <option value="PAID">Paid</option>
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
              {!isCollaborator && (
                <div className={styles.tableContainer}>
                  <table className={styles.actualsTable}>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Invoice #</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Vendor</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invLoading ? (
                        <tr>
                          <td colSpan={5} className={financialStyles.centeredText}>
                            Loading…
                          </td>
                        </tr>
                      ) : (
                        invoices.map((inv) => (
                          <tr key={inv.id}>
                            <td>
                              {new Date(inv.dateIssued).toLocaleDateString("en-CA")}
                            </td>
                            <td>{inv.invoiceNumber}</td>
                            <td>
                              {Number(inv.amount).toLocaleString("en-US", {
                                style: "currency",
                                currency: "USD",
                              })}
                            </td>
                            <td>
                              <span
                                className={
                                  inv.status === "PAID"
                                    ? styles.statusPaid
                                    : styles.statusNotPaid
                                }
                              >
                                {inv.status === "PAID" ? "Paid" : "Not Paid"}
                              </span>
                            </td>
                            <td>{inv.vendor}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/*  History popup  */}
      {showHistoryPopup && (
        <div
          className={styles.popupOverlay}
          onClick={() => setShowHistoryPopup(false)}
        >
          <div
            className={styles.popup}
            onClick={(e) => e.stopPropagation()}
          >
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

      {/*  Update values popup  */}
      {showUpdatePopup && isSessionLoaded && !isCollaborator && !isUnauthorized && (
        <div
          className={styles.popupOverlay}
          onClick={() => setShowUpdatePopup(false)}
        >
          <div
            className={styles.popup}
            onClick={(e) => e.stopPropagation()}
          >
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
                      onChange={(e) =>
                        handleUpdateFieldChange(e.target.value)
                      }
                    >
                      <option value="Total Project Forecast">
                        Total Project Forecast
                      </option>
                      <option value="Total Project Budget">
                        Total Project Budget
                      </option>
                    </select>
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formField}>
                    <label>Current Value</label>
                    <input
                      type="text"
                      className={`${styles.formInput} ${financialStyles.readOnlyInput}`}
                      value={updateForm.currentValue}
                      disabled
                    />
                  </div>
                  <div className={styles.formField}>
                    <label>New Value</label>
                    <input
                      type="text"
                      className={styles.formInput}
                      value={updateForm.newValue}
                      onChange={(e) =>
                        setUpdateForm({
                          ...updateForm,
                          newValue: e.target.value,
                        })
                      }
                      placeholder="$12500.00"
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
                        setUpdateForm({
                          ...updateForm,
                          reason: e.target.value,
                        })
                      }
                      placeholder="Explain why this value is being updated…"
                    />
                  </div>

                  <div className={styles.formActions}>
                    <button
                      className={`${styles.saveInvoiceButton} ${(!updateForm.newValue || !updateForm.reason) ? financialStyles.disabledButton : ''}`}
                      onClick={handleSaveUpdate}
                      disabled={
                        !updateForm.newValue ||
                        !updateForm.reason ||
                        isUpdating
                      }
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
