"use client";

import { useRouter } from "next/navigation";

export default function CreateParameter() {
  const router = useRouter();

  return (
    <div style={drawer}>
      <div style={header}>
        <h3>Add Test Parameter</h3>
        <button onClick={() => router.back()} style={closeBtn}>
          ✕
        </button>
      </div>

      <div style={{ marginBottom: 12 }}>
        <label>Test *</label>
        <select style={input}>
          <option>Select Test</option>
          <option>GLU-F — Fasting Blood Sugar</option>
          <option>UREA — Urea</option>
        </select>
      </div>

      <div style={{ marginBottom: 12 }}>
        <label>Parameter Name *</label>
        <input placeholder="Glucose" style={input} />
      </div>

      <div style={{ marginBottom: 12 }}>
        <label>Unit *</label>
        <input placeholder="mg/dl" style={input} />
      </div>

      <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
        <div style={{ flex: 1 }}>
          <label>Normal Min *</label>
          <input type="number" placeholder="70" style={input} />
        </div>
        <div style={{ flex: 1 }}>
          <label>Normal Max *</label>
          <input type="number" placeholder="110" style={input} />
        </div>
      </div>

      <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
        <div style={{ flex: 1 }}>
          <label>Critical Low</label>
          <input type="number" placeholder="50" style={input} />
        </div>
        <div style={{ flex: 1 }}>
          <label>Critical High</label>
          <input type="number" placeholder="300" style={input} />
        </div>
      </div>

      <div style={actions}>
        <button onClick={() => router.back()} style={cancelBtn}>
          CANCEL
        </button>
        <button style={saveBtn}>SAVE</button>
      </div>
    </div>
  );
}

/* ---------- styles ---------- */

const drawer = {
  position: "fixed" as const,
  right: 0,
  top: 0,
  width: 480,
  height: "100vh",
  background: "#fff",
  padding: 24,
  boxShadow: "-4px 0 12px rgba(0,0,0,0.1)",
  zIndex: 50,
  overflowY: "auto" as const,
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: 24,
};

const input = {
  width: "100%",
  padding: 10,
  marginTop: 6,
  borderRadius: 6,
  border: "1px solid #ccc",
};

const actions = {
  display: "flex",
  justifyContent: "flex-end",
  gap: 12,
};

const cancelBtn = {
  border: "1px solid #16a34a",
  background: "#fff",
  color: "#16a34a",
  padding: "8px 14px",
  borderRadius: 6,
  fontWeight: 600,
};

const saveBtn = {
  border: "none",
  background: "#16a34a",
  color: "#fff",
  padding: "8px 16px",
  borderRadius: 6,
  fontWeight: 600,
};

const closeBtn = {
  background: "none",
  border: "none",
  fontSize: 18,
};
