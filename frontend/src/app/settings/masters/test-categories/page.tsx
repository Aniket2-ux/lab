"use client";

import { useRouter } from "next/navigation";

export default function TestCategoryPage() {
  const router = useRouter();

  return (
    <div style={{ padding: 24, width: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <h2>Test Categories</h2>

        <button
          onClick={() => router.push("/settings/masters/test-categories/create")}
          style={{
            background: "#16a34a",
            color: "#fff",
            border: "none",
            padding: "10px 16px",
            borderRadius: 6,
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          CREATE CATEGORY
        </button>
      </div>

      <div style={{ background: "#fff", borderRadius: 8, padding: 16 }}>
        <p>No categories added yet.</p>
      </div>
    </div>
  );
}
