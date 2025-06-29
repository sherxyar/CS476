"use client";

import { useState } from "react";
import useSWR from "swr";
import { Combobox } from "@headlessui/react";

type User = { id: number; name: string; email: string };
const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function UserPicker({
  value,
  onChange,
}: {
  value: number | null;
  onChange: (id: number | null) => void;
}) {
  const [query, setQuery] = useState("");
  const { data: users = [] } = useSWR<User[]>(`/api/users?query=${query}`, fetcher);

  return (
    <Combobox value={value} onChange={onChange}>
      <Combobox.Input
        className="border p-2 rounded w-full"
        displayValue={(id: number | null) =>
          id ? users.find(u => u.id === id)?.name ?? "" : ""
        }
        onChange={e => setQuery(e.target.value)}
        placeholder="Select a Project Manager"
      />

      <Combobox.Options className="border mt-1 rounded max-h-60 overflow-y-auto bg-white">
        {users.map(u => (
          <Combobox.Option
            key={u.id}
            value={u.id}
            className="p-2 hover:bg-gray-100 cursor-pointer"
          >
            <div className="font-medium">{u.name}</div>
            <div className="text-xs text-gray-500">{u.email}</div>
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
  );
}
