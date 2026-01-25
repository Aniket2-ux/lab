"use client";

import { useRouter } from "next/navigation";
import { CSSProperties } from "react";

export default function CreateSupplier() {
  const router = useRouter();

  return (
    <div style={drawer}>
      <div style={drawerHeader}>
        <h3>Create Supplier</h3>
        <button onClick={() => router.back()}>✕</button>
      </div>

      <Input label="Supplier Name" />
      <Input label="Address" />
      <Input label="Email" />
      <Input label="Phone" />
      <Input label="Landline" />
      <Input label="PAN No." />
      <Textarea label="Details" />

      <div style={footer}>
        <button onClick={() => router.back()} style={cancelBtn}>
          CANCEL
        </button>
        <button style={greenBtn}>CREATE</button>
      </div>
    </div>
  );
}

/* ---------------- inputs ---------------- */

function Input({ label }: { label: string }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={labelStyle}>{label}</div>
      <input style={inputStyle} />
    </div>
  );
}

function Textarea({ label }: { label: string }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={labelStyle}>{label}</div>
      <textarea style={{ ...inputStyle, height: 80 }} />
    </div>
  );
}

/* ---------------- styles ---------------- */

const drawer: CSSProperties = {
  position: "fixed",
  top: 0,
  right: 0,
  bottom: 0,
  width: 420,
  background: "#fff",
  padding: 24,
  boxShadow: "-8px 0 24px rgba(0,0,0,0.15)",
  display: "flex",
  flexDirection: "column",
  zIndex: 50,
};

const drawerHeader: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 20,
};

const footer: CSSProperties = {
  marginTop: "auto",
  display: "flex",
  gap: 12,
};

const labelStyle: CSSProperties = {
  fontSize: 12,
  color: "#6b7280",
  marginBottom: 4,
};

const inputStyle: CSSProperties = {
  width: "100%",
  padding: "8px 10px",
  border: "1px solid #d1d5db",
  borderRadius: 4,
};

const greenBtn: CSSProperties = {
  flex: 1,
  background: "#16a34a",
  color: "#fff",
  padding: "10px",
  borderRadius: 6,
  border: "none",
  fontWeight: 600,
  cursor: "pointer",
};

const cancelBtn: CSSProperties = {
  flex: 1,
  background: "#fff",
  color: "#16a34a",
  padding: "10px",
  borderRadius: 6,
  border: "1px solid #16a34a",
  fontWeight: 600,
  cursor: "pointer",
};
