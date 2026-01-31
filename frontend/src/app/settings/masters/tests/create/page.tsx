"use client";

import { useRouter } from "next/navigation";

export default function CreateTest() {
  const router = useRouter();

  return (
    <div style={drawer}>
      <div style={header}>
        <h3>Create Test / Investigation</h3>
        <button onClick={() => router.back()} style={closeBtn}>
          ✕
        </button>
      </div>

      <div style={{ marginBottom: 12 }}>
        <label>Test Code *</label>
        <input placeholder="GLU-F" style={input} />
      </div>

      <div style={{ marginBottom: 12 }}>
        <label>Test Name *</label>
        <input placeholder="Fasting Blood Sugar" style={input} />
      </div>

      <div style={{ marginBottom: 12 }}>
        <label>Category *</label>
        <select style={input}>
          <option>Select Category</option>
          <option>Biochemistry</option>
          <option>Hematology</option>
        </select>
      </div>

      <div style={{ marginBottom: 12 }}>
        <label>Sample Type *</label>
        <select style={input}>
          <option>Select Sample Type</option>
          <option>Serum</option>
          <option>Plasma</option>
        </select>
      </div>

      <div style={{ marginBottom: 12 }}>
        <label>Method *</label>
        <select style={input}>
          <option>Select Method</option>
          <option>GOD-POD</option>
          <option>IFCC</option>
        </select>
      </div>

      <div style={{ marginBottom: 12 }}>
        <label>Unit *</label>
        <input placeholder="mg/dl" style={input} />
      </div>

      <div style={{ marginBottom: 20 }}>
        <label>Price *</label>
        <input type="number" placeholder="150" style={input} />
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
  width: 460,
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
