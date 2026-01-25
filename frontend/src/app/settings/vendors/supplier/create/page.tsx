"use client";

import { useRouter } from "next/navigation";

export default function CreateSupplier() {
  const router = useRouter();

  return (
    <div style={drawer}>
      {/* Header */}
      <div style={header}>
        <h3>Create Supplier</h3>
        <button onClick={() => router.back()} style={closeBtn}>✕</button>
      </div>

      {/* Form */}
      <div style={body}>
        <Input label="Supplier Name*" />
        <Input label="Address" />
        <Input label="Email" />
        <Input label="Phone" prefix="+977" />
        <Input label="Landline" />
        <Input label="PAN No." />
        <Textarea label="Details" />

        <div style={{ marginTop: 12, color: "#16a34a", cursor: "pointer" }}>
          Show More
        </div>

        <div style={{ marginTop: 24 }}>
          <h4>Account Information</h4>
          <Input label="Opening Balance" />
          <Input label="Type" />
          <Input label="Opening Balance Date" />
          <Input label="Aging Days" />
        </div>

        <div style={{ marginTop: 24 }}>
          <h4>Bank Information</h4>
          <Input label="Name of Beneficiary" />
          <Input label="Bank Name" />
          <Input label="Bank Branch" />
          <Input label="Account Number" />
          <Input label="Account Type" />
          <Input label="IFSC Code" />
          <Input label="Swift Code" />
        </div>
      </div>

      {/* Footer */}
      <div style={footer}>
        <button onClick={() => router.back()} style={cancelBtn}>CANCEL</button>
        <button style={createBtn}>CREATE</button>
      </div>
    </div>
  );
}

/* ---------- SMALL COMPONENTS ---------- */

function Input({ label, prefix }: { label: string; prefix?: string }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={labelStyle}>{label}</div>
      <div style={{ display: "flex", gap: 8 }}>
        {prefix && <span style={prefixStyle}>{prefix}</span>}
        <input style={input} />
      </div>
    </div>
  );
}

function Textarea({ label }: { label: string }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={labelStyle}>{label}</div>
      <textarea style={{ ...input, height: 80 }} />
    </div>
  );
}

/* ---------- STYLES ---------- */

const drawer = {
  position: "fixed" as const,
  top: 0,
  right: 0,
  width: 420,
  height: "100vh",
  background: "#fff",
  boxShadow: "-4px 0 10px rgba(0,0,0,0.08)",
  display: "flex",
  flexDirection: "column" as const,
};

const header = {
  padding: "16px 20px",
  borderBottom: "1px solid #e5e7eb",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const body = {
  padding: 20,
  overflowY: "auto" as const,
  flex: 1,
};

const footer = {
  padding: 16,
  borderTop: "1px solid #e5e7eb",
  display: "flex",
  justifyContent: "flex-end",
  gap: 12,
};

const input = {
  width: "100%",
  padding: "8px 10px",
  borderRadius: 4,
  border: "1px solid #d1d5db",
};

const labelStyle = {
  fontSize: 12,
  marginBottom: 4,
  color: "#374151",
};

const prefixStyle = {
  padding: "8px 10px",
  background: "#f3f4f6",
  border: "1px solid #d1d5db",
  borderRadius: 4,
};

const closeBtn = {
  background: "transparent",
  border: "none",
  fontSize: 18,
  cursor: "pointer",
};

const cancelBtn = {
  padding: "8px 16px",
  borderRadius: 6,
  border: "1px solid #16a34a",
  background: "#fff",
  color: "#16a34a",
  cursor: "pointer",
};

const createBtn = {
  padding: "8px 16px",
  borderRadius: 6,
  border: "none",
  background: "#16a34a",
  color: "#fff",
  cursor: "pointer",
};
