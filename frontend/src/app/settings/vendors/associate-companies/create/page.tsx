"use client";

import { useRouter } from "next/navigation";

export default function CreateCompany() {
  const router = useRouter();

  return (
    <div style={overlay}>
      <div style={drawer}>
        <div style={header}>
          <h3>Create Company</h3>
          <button style={closeBtn} onClick={() => router.back()}>
            ✕
          </button>
        </div>

        <div style={form}>
          <label>Company Name*</label>
          <input style={input} placeholder="Company Name" />

          <label>Discount Rate*</label>
          <input style={input} type="number" defaultValue={0} />
        </div>

        <div style={actions}>
          <button style={cancelBtn} onClick={() => router.back()}>
            CANCEL
          </button>
          <button style={saveBtn} disabled>
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- styles ---------- */

const overlay = {
  position: "fixed" as const,
  inset: 0,
  background: "rgba(0,0,0,0.25)",
  zIndex: 40,
};

const drawer = {
  position: "absolute" as const,
  top: 0,
  right: 0,
  width: 420,
  height: "100%",
  background: "#fff",
  padding: 24,
};

const header = {
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
  opacity: 0.5,
};
