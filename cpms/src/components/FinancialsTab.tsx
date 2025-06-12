
"use client";
import { useState } from "react";
import styles from "../styles/ProjectModal.module.css";

type Props = {
  project: any;
};

export default function FinancialsTab({ project }: Props) {
  const [showAddInvoice, setShowAddInvoice] = useState(false);
  const [showActualsPopup, setShowActualsPopup] = useState(false);
  const [showHistoryPopup, setShowHistoryPopup] = useState(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [invoiceForm, setInvoiceForm] = useState({
    date: "",
    invoiceNumber: "",
    amount: "",
    status: "Not Paid",
    vendor: ""
  });
  const [invoices, setInvoices] = useState([
    {
      date: "Jan 5, 2025",
      invoiceNumber: "INV-2025-001",
      amount: "$15,400.00",
      status: "Paid",
      vendor: "ABC Construction"
    },
    {
      date: "Jan 8, 2025",
      invoiceNumber: "INV-2025-002",
      amount: "$12,830.50",
      status: "Paid",
      vendor: "Regina Materials Co."
    },
    {
      date: "Jan 12, 2025",
      invoiceNumber: "INV-2025-003",
      amount: "$17,000.00",
      status: "Not Paid",
      vendor: "Equipment Rental Plus"
    }
  ]);
  
  const [financialValues, setFinancialValues] = useState({
    forecast: 125000.00,
    budget: 120000.00,
    actuals: 45230.50
  });

  const [updateForm, setUpdateForm] = useState({
    field: "Total Project Forecast",
    currentValue: "",
    newValue: "",
    reason: ""
  });

  const [financialHistory, setFinancialHistory] = useState([
    {
      date: "Jan 1, 2025",
      field: "Total Project Forecast",
      oldValue: "$120,000.00",
      newValue: "$125,000.00",
      changedBy: "John Doe",
      reason: "Updated material costs estimate"
    },
    {
      date: "Dec 28, 2024",
      field: "Total Project Budget",
      oldValue: "$115,000.00",
      newValue: "$120,000.00",
      changedBy: "Jane Smith",
      reason: "Added contingency for weather delays"
    },
    {
      date: "Dec 20, 2024",
      field: "Total Project Forecast",
      oldValue: "$115,000.00",
      newValue: "$120,000.00",
      changedBy: "John Doe",
      reason: "Initial forecast adjustment"
    }
  ]);

  const handleAddInvoice = () => {
    if (invoiceForm.date && invoiceForm.invoiceNumber && invoiceForm.amount && invoiceForm.vendor) {
      const newInvoice = {
        date: invoiceForm.date,
        invoiceNumber: invoiceForm.invoiceNumber,
        amount: invoiceForm.amount.startsWith('$') ? invoiceForm.amount : `$${invoiceForm.amount}`,
        status: invoiceForm.status,
        vendor: invoiceForm.vendor
      };
      setInvoices([...invoices, newInvoice]);
      setInvoiceForm({
        date: "",
        invoiceNumber: "",
        amount: "",
        status: "Not Paid",
        vendor: ""
      });
      setShowAddInvoice(false);
    }
  };

  const handleFormChange = (field: string, value: string) => {
    setInvoiceForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleUpdateFieldChange = (field: string) => {
    let currentValue = "";
    switch (field) {
      case "Total Project Forecast":
        currentValue = `$${financialValues.forecast.toFixed(2)}`;
        break;
      case "Total Project Budget":
        currentValue = `$${financialValues.budget.toFixed(2)}`;
        break;
      case "Total Project Actuals to Date":
        currentValue = `$${financialValues.actuals.toFixed(2)}`;
        break;
    }
    setUpdateForm({
      field,
      currentValue,
      newValue: "",
      reason: ""
    });
  };

  const handleSaveUpdate = () => {
    if (!updateForm.newValue || !updateForm.reason) return;

    const newValueNum = parseFloat(updateForm.newValue.replace('$', '').replace(',', ''));
    const oldValue = updateForm.currentValue;
    const newValue = `$${newValueNum.toFixed(2)}`;

    // Update financial values
    const updatedValues = { ...financialValues };
    switch (updateForm.field) {
      case "Total Project Forecast":
        updatedValues.forecast = newValueNum;
        break;
      case "Total Project Budget":
        updatedValues.budget = newValueNum;
        break;
      case "Total Project Actuals to Date":
        updatedValues.actuals = newValueNum;
        break;
    }
    setFinancialValues(updatedValues);

    // Add to history
    const historyEntry = {
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      field: updateForm.field,
      oldValue: oldValue,
      newValue: newValue,
      changedBy: "Current User", // This would come from auth in real app
      reason: updateForm.reason
    };
    setFinancialHistory([historyEntry, ...financialHistory]);

    // Reset form and close popup
    setUpdateForm({
      field: "Total Project Forecast",
      currentValue: "",
      newValue: "",
      reason: ""
    });
    setShowUpdatePopup(false);
  };

  return (
    <>
      <div className={styles.financialsContent}>
        <div className={styles.actualsHeader} style={{ marginBottom: '16px' }}>
          <label>Financial Summary</label>
          <button 
            className={styles.addInvoiceButton}
            onClick={() => setShowUpdatePopup(true)}
          >
            Update Values
          </button>
        </div>

        <div className={styles.topSection}>
          <div className={styles.leftColumn}>
            <div className={styles.fieldGroup}>
              <label>Total Project Forecast</label>
              <div className={styles.fieldValue}>${financialValues.forecast.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
            </div>

            <div className={styles.fieldGroup}>
              <label>Total Project Budget</label>
              <div className={styles.fieldValue}>${financialValues.budget.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
            </div>
          </div>

          <div className={styles.rightColumn}>
            <div className={styles.fieldGroup}>
              <label>Total Project Actuals to Date</label>
              <div className={styles.fieldValue}>${financialValues.actuals.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
            </div>
          </div>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.actualsSection}>
          <div className={styles.fieldGroup}>
            <div className={styles.actualsHeader}>
              <label>Actuals Summary</label>
              <div className={styles.buttonGroup}>
                <button 
                  className={styles.viewDetailsButton}
                  onClick={() => setShowActualsPopup(true)}
                >
                  View Details
                </button>
              </div>
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

        <div className={styles.divider}></div>

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
                <span className={styles.summaryValue}>Jan 1, 2025</span>
              </div>
              <div className={styles.summaryItem}>
                <span className={styles.summaryLabel}>Updated By:</span>
                <span className={styles.summaryValue}>John Doe</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actuals Popup */}
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
              
              {showAddInvoice && (
                <div className={styles.invoiceForm}>
                  <div className={styles.formRow}>
                    <div className={styles.formField}>
                      <label>Date</label>
                      <input
                        type="date"
                        value={invoiceForm.date}
                        onChange={(e) => handleFormChange('date', e.target.value)}
                        className={styles.formInput}
                      />
                    </div>
                    <div className={styles.formField}>
                      <label>Invoice Number</label>
                      <input
                        type="text"
                        value={invoiceForm.invoiceNumber}
                        onChange={(e) => handleFormChange('invoiceNumber', e.target.value)}
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
                        onChange={(e) => handleFormChange('amount', e.target.value)}
                        placeholder="15000.00"
                        className={styles.formInput}
                      />
                    </div>
                    <div className={styles.formField}>
                      <label>Status</label>
                      <select
                        value={invoiceForm.status}
                        onChange={(e) => handleFormChange('status', e.target.value)}
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
                        onChange={(e) => handleFormChange('vendor', e.target.value)}
                        placeholder="Vendor Name"
                        className={styles.formInput}
                      />
                    </div>
                    <div className={styles.formActions}>
                      <button 
                        className={styles.saveInvoiceButton}
                        onClick={handleAddInvoice}
                      >
                        Add Invoice
                      </button>
                    </div>
                  </div>
                </div>
              )}

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
                    {invoices.map((invoice, index) => (
                      <tr key={index}>
                        <td>{invoice.date}</td>
                        <td>{invoice.invoiceNumber}</td>
                        <td>{invoice.amount}</td>
                        <td>
                          <span className={invoice.status === "Paid" ? styles.statusPaid : styles.statusNotPaid}>
                            {invoice.status}
                          </span>
                        </td>
                        <td>{invoice.vendor}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Financial History Popup */}
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
                    {financialHistory.map((entry, index) => (
                      <tr key={index}>
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
            </div>
          </div>
        </div>
      )}

      {/* Update Financial Values Popup */}
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
                      <option value="Total Project Actuals to Date">Total Project Actuals to Date</option>
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
                      style={{ backgroundColor: '#f0f0f0', color: '#666' }}
                    />
                  </div>
                  <div className={styles.formField}>
                    <label>New Value</label>
                    <input
                      type="text"
                      className={styles.formInput}
                      value={updateForm.newValue}
                      onChange={(e) => setUpdateForm({ ...updateForm, newValue: e.target.value })}
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
                      onChange={(e) => setUpdateForm({ ...updateForm, reason: e.target.value })}
                      placeholder="Explain why this value is being updated..."
                    />
                  </div>
                  <div className={styles.formActions}>
                    <button 
                      className={styles.saveInvoiceButton}
                      onClick={handleSaveUpdate}
                      disabled={!updateForm.newValue || !updateForm.reason}
                      style={{ 
                        opacity: (!updateForm.newValue || !updateForm.reason) ? 0.5 : 1,
                        cursor: (!updateForm.newValue || !updateForm.reason) ? 'not-allowed' : 'pointer'
                      }}
                    >
                      Save Update
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
