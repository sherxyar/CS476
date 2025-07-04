// src/lib/invoices.ts
import useSWR from "swr";
import type { Invoice } from "@prisma/client";

export default function useInvoices(projectId: string) {
  const fetcher = (url: string) => fetch(url).then(r => r.json());

  const { data, error, isLoading } = useSWR<Invoice[]>(
    `/api/projects/${projectId}/invoices`,
    fetcher,
  );

  return { invoices: data, isLoading, error };
}
