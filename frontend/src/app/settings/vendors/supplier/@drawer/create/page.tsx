"use client";

import { useRouter } from "next/navigation";

export default function CreateSupplierDrawer() {
  const router = useRouter();

  return (
    <div style={overlay}>
      <div style={drawer}>
        {/* Header */}
        <div style={header}>
          <h3 style={{ fontSize: 18, fontWeight: 600 }}>
            Create Supplier
          </h3>

          <button onClick={() => router.back()} style={closeBtn}>
            ✕
          </button>
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

          <Divider />

          <Section title="Account Information">
            <Input label="Opening Balance" />
            <Select label="Type" options={["Credit", "Debit"]} />
            <Input label="Aging Days" />
          </Section>

          <Divider />

          <Section title="Bank Information">
            <Input label="Name of Beneficiary" />
            <Input label="Bank Name" />
            <Input label="Bank Branch" />
            <Input label="Bank Account Number" />
            <Input label="IFSC Code" />
            <Input label="Swift Code" />
          </Section>
        </div>

        {/* Footer */}
        <div style={footer}>
          <button
            onClick={() => router.back()}
            style={cancelBtn}
          >
            Cancel
          </button>

          <button style={createBtn}>
            Create Supplier
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- UI Components ---------- */

function Input({ label, prefix }: any) {
  return (
    <div style={{ marginBottom: 14 }}>
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
    <div style={{ marginBottom: 14 }}>
      <label style={labelStyle}>{label}</label>
      <textarea style={{ ...inputStyle, height: 90 }} />
    </div>
  );
}

function Select({ label, options }: any) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={labelStyle}>{label}</label>
      <select style={inputStyle}>
        {options.map((o: string) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

function Section({ title, children }: any) {
  return (
    <div style={{ marginTop: 10 }}>
      <h4 style={sectionTitle}>{title}</h4>
      {children}
    </div>
  );
}

function Divider() {
  return <div style={divider} />;
}

/* ---------- Styles ---------- */

const overlay = {
  position: "fixed" as const,
  inset: 0,
  background: "rgba(0,0,0,0.35)",
  backdropFilter: "blur(2px)",
  display: "flex",
  justifyContent: "flex-end",
  zIndex: 50,
};

const drawer = {
  width: 440,
  background: "#fff",
  height: "100%",
  padding: 22,
  overflowY: "auto" as const,
  boxShadow: "-10px 0 25px rgba(0,0,0,0.15)",
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: "1px solid #e5e7eb",
  paddingBottom: 12,
  marginBottom: 16,
};

const body = {
  paddingBottom: 90,
};

const footer = {
  position: "sticky" as const,
  bottom: 0,
  background: "#fff",
  paddingTop: 12,
  borderTop: "1px solid #e5e7eb",
  display: "flex",
  justifyContent: "flex-end",
  gap: 12,
};

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  border: "1px solid #d1d5db",
  borderRadius: 6,
  outline: "none",
};

const labelStyle = {
  fontSize: 12,
  color: "#374151",
  marginBottom: 6,
  display: "block",
};

const prefixStyle = {
  padding: "10px 12px",
  background: "#f3f4f6",
  border: "1px solid #d1d5db",
  borderRight: "none",
  borderRadius: "6px 0 0 6px",
};

const cancelBtn = {
  padding: "10px 18px",
  border: "1px solid #16a34a",
  color: "#16a34a",
  borderRadius: 8,
  background: "#fff",
  fontWeight: 500,
};

const createBtn = {
  padding: "10px 18px",
  background: "#16a34a",
  color: "#fff",
  borderRadius: 8,
  fontWeight: 600,
  boxShadow: "0 4px 10px rgba(22,163,74,0.35)",
};

const closeBtn = {
  fontSize: 18,
  background: "transparent",
  border: "none",
  cursor: "pointer",
};

const sectionTitle = {
  fontSize: 14,
  fontWeight: 600,
  marginBottom: 10,
};

const divider = {
  height: 1,
  background: "#e5e7eb",
  margin: "18px 0",
};
