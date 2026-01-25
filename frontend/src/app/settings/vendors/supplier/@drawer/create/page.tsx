"use client";

import { useRouter } from "next/navigation";

export default function CreateSupplierDrawer() {
  const router = useRouter();

  return (
    <div style={overlay}>
      <div style={drawer}>
        {/* Header */}
        <div style={header}>
          <h3>Create Supplier</h3>
          <button onClick={() => router.back()} style={closeBtn}>✕</button>
        </div>

        {/* Form */}
        <div style={body}>
          <Input label="Supplier's Name*" />
          <Input label="Address" />
          <Input label="Email" />
          <Input label="Phone*" prefix="+977" />
          <Input label="Landline" />
          <Input label="PAN No." />
          <Textarea label="Details" />

          <h4 style={{ marginTop: 20 }}>Account Information</h4>
          <Input label="Opening Balance" />
          <Select label="Type" options={["Credit", "Debit"]} />
          <Input label="Aging Days" />

          <h4 style={{ marginTop: 20 }}>Bank Information</h4>
          <Input label="Name of Beneficiary" />
          <Input label="Bank Name" />
          <Input label="Bank Branch" />
          <Input label="Bank Account Number" />
          <Input label="IFSC Code" />
          <Input label="Swift Code" />
        </div>

        {/* Footer */}
        <div style={footer}>
          <button onClick={() => router.back()} style={cancelBtn}>
            CANCEL
          </button>
          <button style={createBtn}>CREATE</button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Components ---------- */

function Input({ label, prefix }: any) {
  return (
    <div style={{ marginBottom: 12 }}>
      <label style={labelStyle}>{label}</label>
      <div style={{ display: "flex" }}>
        {prefix && <span style={prefixStyle}>{prefix}</span>}
        <input style={inputStyle} />
      </div>
    </div>
  );
}

function Textarea({ label }: any) {
  return (
    <div style={{ marginBottom: 12 }}>
      <label style={labelStyle}>{label}</label>
      <textarea style={{ ...inputStyle, height: 80 }} />
    </div>
  );
}

function Select({ label, options }: any) {
  return (
    <div style={{ marginBottom: 12 }}>
      <label style={labelStyle}>{label}</label>
      <select style={inputStyle}>
        {options.map((o: string) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

/* ---------- Styles ---------- */

const overlay = {
  position: "fixed" as const,
  inset: 0,
  background: "rgba(0,0,0,0.2)",
  display: "flex",
  justifyContent: "flex-end",
  zIndex: 50,
};

const drawer = {
  width: 420,
  background: "#fff",
  height: "100%",
  padding: 20,
  overflowY: "auto" as const,
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 16,
};

const body = { paddingBottom: 80 };

const footer = {
  position: "sticky" as const,
  bottom: 0,
  background: "#fff",
  paddingTop: 12,
  display: "flex",
  justifyContent: "flex-end",
  gap: 12,
};

const inputStyle = {
  width: "100%",
  padding: 8,
  border: "1px solid #d1d5db",
  borderRadius: 4,
};

const labelStyle = {
  fontSize: 12,
  color: "#555",
  marginBottom: 4,
  display: "block",
};

const prefixStyle = {
  padding: "8px 10px",
  background: "#f3f4f6",
  border: "1px solid #d1d5db",
  borderRight: "none",
};

const cancelBtn = {
  padding: "8px 16px",
  border: "1px solid #16a34a",
  color: "#16a34a",
  borderRadius: 6,
};

const createBtn = {
  padding: "8px 16px",
  background: "#16a34a",
  color: "#fff",
  borderRadius: 6,
};

const closeBtn = {
  fontSize: 18,
};
