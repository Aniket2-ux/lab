"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { API_BASE } from "@/lib/apiBase";

type Test = {
  id: number;
  code: string;
  name: string;
  unit: string;
  price: number;
  TestCategory: { name: string };
  SampleType: { name: string };
  Method: { name: string };
};

export default function TestPage() {
  const router = useRouter();
  const [data, setData] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const res = await fetch(`${API_BASE}/api/tests`);
    const json = await res.json();
    setData(json);
    setLoading(false);
  }

  return (
    <div style={{ padding: 24 }}>
      <div style={header}>
        <h2>Tests</h2>
        <button
          style={createBtn}
          onClick={() =>
            router.push("/settings/masters/tests/create")
          }
        >
          CREATE TEST
        </button>
      </div>

      <div style={box}>
        {loading ? (
          "Loading..."
        ) : (
          <table style={table}>
            <thead>
              <tr>
                <th>Code</th>
                <th>Name</th>
                <th>Category</th>
                <th>Sample</th>
                <th>Method</th>
                <th>Unit</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {data.map((t) => (
                <tr key={t.id}>
                  <td>{t.code}</td>
                  <td>{t.name}</td>
                  <td>{t.TestCategory?.name}</td>
                  <td>{t.SampleType?.name}</td>
                  <td>{t.Method?.name}</td>
                  <td>{t.unit}</td>
                  <td>{t.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
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
  border: "none",
  padding: "10px 16px",
  borderRadius: 6,
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
