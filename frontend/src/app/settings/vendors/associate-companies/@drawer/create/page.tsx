"use client";

import { useRouter } from "next/navigation";

export default function CreateCompanyDrawer() {
  const router = useRouter();

  return (
    <div style={drawer}>
      <div style={drawerHeader}>
        <h3>Create Company</h3>
        <button style={closeBtn} onClick={() => router.back()}>
          ✕
        </button>
      </div>

      <div style={form}>
        <label>Company Name*</label>
        <input style={input} />

        <label>Discount Rate*</label>
        <input type="number" style={input} defaultValue={0} />
      </div>

      <div style={actions}>
        <button style={cancelBtn} onClick={() => router.back()}>
          CANCEL
        </button>
        <button style={saveBtn}>SAVE</button>
      </div>
    </div>
  );
}

/* ---------------- styles ---------------- */

const drawer = {
  position: "fixed" as const,
  top: 0,
  right: 0,
  width: 420,
  height: "100vh",
  background: "#fff",
  padding: 24,
  boxShadow: "-4px 0 20px rgba(0,0,0,0.15)",
  zIndex: 50,
};

const drawerHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 20,
};

const closeBtn = {
  background: "transparent",
  border: "none",
  fontSize: 18,
  cursor: "pointer",
};

const form = {
  display: "flex",
  flexDirection: "column" as const,
  gap: 10,
};

const input = {
  padding: 10,
  borderRadius: 6,
  border: "1px solid #d1d5db",
};

const actions = {
  display: "flex",
  justifyContent: "flex-end",
  gap: 10,
  marginTop: 24,
};

const cancelBtn = {
  background: "transparent",
  border: "1px solid #16a34a",
  color: "#16a34a",
  padding: "8px 16px",
  borderRadius: 6,
  cursor: "pointer",
};

const saveBtn = {
  background: "#16a34a",
  color: "#fff",
  border: "none",
  padding: "8px 18px",
  borderRadius: 6,
  cursor: "pointer",
};
