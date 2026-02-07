"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { API_BASE } from "@/lib/apiBase";

export default function ParameterPage() {
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${API_BASE}/api/test-parameters`)
      .then((r) => r.json())
      .then(setData);
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <div style={header}>
        <h2>Test Parameters</h2>
        <button
          style={createBtn}
          onClick={() =>
            router.push("/settings/masters/parameters/create")
          }
        >
          ADD PARAMETER
        </button>
      </div>

      <table style={table}>
        <thead>
          <tr>
            <th>Test</th>
            <th>Parameter</th>
            <th>Unit</th>
            <th>Normal</th>
            <th>Critical</th>
          </tr>
        </thead>
        <tbody>
          {data.map((p) => (
            <tr key={p.id}>
              <td>{p.Test?.code}</td>
              <td>{p.name}</td>
              <td>{p.unit}</td>
              <td>
                {p.normal_min} – {p.normal_max}
              </td>
              <td>
                {p.critical_low ?? "-"} / {p.critical_high ?? "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const header = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: 16,
};

const createBtn = {
  background: "#16a34a",
  color: "#fff",
  padding: "10px 16px",
  border: "none",
  borderRadius: 6,
};

const table = {
  width: "100%",
  borderCollapse: "collapse" as const,
};
