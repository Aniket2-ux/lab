"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { API_BASE } from "@/lib/apiBase";

type SampleType = {
  id: number;
  name: string;
};

export default function SampleTypePage() {
  const router = useRouter();
  const [data, setData] = useState<SampleType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const res = await fetch(`${API_BASE}/api/sample-types`);
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 24, width: "100%" }}>
      <div style={header}>
        <h2>Sample Types</h2>

        <button
          onClick={() =>
            router.push("/settings/masters/sample-types/create")
          }
          style={createBtn}
        >
          CREATE SAMPLE TYPE
        </button>
      </div>

      <div style={box}>
        {loading ? (
          <p>Loading...</p>
        ) : data.length === 0 ? (
          <p>No sample types added yet.</p>
        ) : (
          <table style={table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Sample Type</th>
              </tr>
            </thead>
            <tbody>
              {data.map((s) => (
                <tr key={s.id}>
                  <td>{s.id}</td>
                  <td>{s.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

/* styles */

const header = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: 16,
};

const createBtn = {
  background: "#16a34a",
  color: "#fff",
  border: "none",
  padding: "10px 16px",
  borderRadius: 6,
  fontWeight: 600,
};

const box = {
  background: "#fff",
  padding: 16,
  borderRadius: 8,
};

const table = {
  width: "100%",
  borderCollapse: "collapse" as const,
};
