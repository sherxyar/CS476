// this is needed since invoices might be bulk updated or deleted

import useSWR from "swr";
import { Invoice } from "@prisma/client";

export default function useInvoices(projectId: string) {
  const fetcher = (url: string) => fetch(url).then((r) => r.json());

  const { data, error, mutate } = useSWR<Invoice[]>(
    projectId ? `/api/projects/${projectId}/invoices` : null,
    fetcher
  );

  return {
    invoices: data ?? [],
    isLoading: !error && !data,
    isError: error,
    mutate,               
  };
}
