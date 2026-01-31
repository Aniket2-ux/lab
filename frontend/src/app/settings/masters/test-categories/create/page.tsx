"use client";

import { useRouter } from "next/navigation";

export default function CreateTestCategory() {
  const router = useRouter();

  return (
    <div
      style={{
        position: "fixed",
        right: 0,
        top: 0,
        height: "100vh",
        width: 420,
        background: "#fff",
        boxShadow: "-4px 0 12px rgba(0,0,0,0.1)",
        padding: 24,
        zIndex: 50,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24 }}>
        <h3>Create Test Category</h3>
        <button onClick={() => router.back()} style={{ border: "none", background: "none" }}>
          ✕
        </button>
      </div>

      <label style={{ fontSize: 14 }}>Category Name *</label>
      <input
        placeholder="Biochemistry"
        style={{
          width: "100%",
          padding: 10,
          marginTop: 6,
          marginBottom: 20,
          borderRadius: 6,
          border: "1px solid #ccc",
        }}
      />

      <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
        <button
          onClick={() => router.back()}
          style={{
            padding: "8px 14px",
            borderRadius: 6,
            border: "1px solid #16a34a",
            background: "#fff",
            color: "#16a34a",
            fontWeight: 600,
          }}
        >
          CANCEL
        </button>

        <button
          style={{
            padding: "8px 16px",
            borderRadius: 6,
            border: "none",
            background: "#16a34a",
            color: "#fff",
            fontWeight: 600,
          }}
        >
          SAVE
        </button>
      </div>
    </div>
  );
}
