import { Decimal } from "@prisma/client/runtime/library";


export type FinancialHistoryEntry = {
  id: string;
  date: string; // formatted client‑side
  field: "FORECAST" | "BUDGET" | "ACTUALS";
  oldValue: string;
  newValue: string;
  changedBy: string;
  reason: string;
};

export type Invoice = {
  id: string;
  date: string;
  invoiceNumber: string;
  amount: string;
  status: "PAID" | "NOT_PAID";
  vendor: string;
};

export type ProjectFinancials = {
  id: string;
  forecast: Decimal;
  budget: Decimal;
  actuals: Decimal;
  invoices: Invoice[];
  history: FinancialHistoryEntry[];
};