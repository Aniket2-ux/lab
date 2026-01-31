"use client";

import { useRouter } from "next/navigation";

export default function CreateDoctor() {
  const router = useRouter();

  return (
    <div style={drawer}>
      <div style={header}>
        <h3>Add Doctor / Referral</h3>
        <button onClick={() => router.back()} style={closeBtn}>
          ✕
        </button>
      </div>

      <div style={{ marginBottom: 12 }}>
        <label>Doctor Name *</label>
        <input placeholder="Dr. R. Sharma" style={input} />
      </div>

      <div style={{ marginBottom: 12 }}>
        <label>Qualification *</label>
        <input placeholder="MD Medicine" style={input} />
      </div>

      <div style={{ marginBottom: 20 }}>
        <label>Hospital / Clinic</label>
        <input placeholder="City Hospital" style={input} />
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
