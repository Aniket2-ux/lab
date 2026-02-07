"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { API_BASE } from "@/lib/apiBase";

type Category = {
  id: number;
  name: string;
};

export default function TestCategoryPage() {
  const router = useRouter();
  const [data, setData] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    try {
      const res = await fetch(`${API_BASE}/api/test-categories`);
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("Failed to load categories", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 24, width: "100%" }}>
      <div style={header}>
        <h2>Test Categories</h2>

        <button
          onClick={() =>
            router.push("/settings/masters/test-categories/create")
          }
          style={createBtn}
        >
          CREATE CATEGORY
        </button>
      </div>

      <div style={box}>
        {loading ? (
          <p>Loading...</p>
        ) : data.length === 0 ? (
          <p>No categories added yet.</p>
        ) : (
          <table style={table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Category Name</th>
              </tr>
            </thead>
            <tbody>
              {data.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

/* ---------- styles ---------- */

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
  cursor: "pointer",
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
