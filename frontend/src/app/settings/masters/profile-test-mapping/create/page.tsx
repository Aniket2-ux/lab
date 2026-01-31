"use client";

import { useRouter } from "next/navigation";

export default function CreateProfileTestMapping() {
  const router = useRouter();

  return (
    <div style={drawer}>
      <div style={header}>
        <h3>Map Tests to Profile</h3>
        <button onClick={() => router.back()} style={closeBtn}>
          ✕
        </button>
      </div>

      <div style={{ marginBottom: 16 }}>
        <label>Profile *</label>
        <select style={input}>
          <option>Select Profile</option>
          <option>CBC — Complete Blood Count</option>
          <option>LFT — Liver Function Test</option>
          <option>KFT — Kidney Function Test</option>
        </select>
      </div>

      <div style={{ marginBottom: 16 }}>
        <label>Tests *</label>

        <div style={testList}>
          <label><input type="checkbox" /> Hb</label>
          <label><input type="checkbox" /> TLC</label>
          <label><input type="checkbox" /> DLC</label>
          <label><input type="checkbox" /> Platelet</label>
          <label><input type="checkbox" /> RBC</label>
        </div>
      </div>

      <div style={hint}>
        Selected tests will auto-load parameters during reporting.
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
  width: 520,
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

const testList = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 8,
  marginTop: 8,
};

const hint = {
  fontSize: 12,
  color: "#6b7280",
  marginBottom: 20,
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
