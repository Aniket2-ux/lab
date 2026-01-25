"use client";

import { useRouter } from "next/navigation";

export default function CreateReferrerDrawer() {
  const router = useRouter();

  return (
    <div style={overlay}>
      <div style={drawer}>
        {/* Header */}
        <div style={header}>
          <h3 style={title}>Create Referrer</h3>
          <button onClick={() => router.back()} style={closeBtn}>✕</button>
        </div>

        {/* Form */}
        <div style={body}>
          <Input label="Name*" />
          <Input label="Email" />
          <Input label="Phone*" prefix="+977" />
          <Input label="Address" />

          <div style={row}>
            <Input label="TDS (%)" />
            <Input label="Rate (%)" />
          </div>

          <Divider />

          {/* Pricing Section */}
          <div style={priceBox}>
            <h4 style={sectionTitle}>
              Assign Referrer Specific Prices To Products And Services
            </h4>

            <div style={priceHeader}>
              <span>Product</span>
              <span>Price Per Unit</span>
              <span>Original Price</span>
            </div>

            <div style={priceRow}>
              <select style={inputStyle}>
                <option>Products Or Services</option>
              </select>

              <input style={inputStyle} placeholder="Custom Price" />
              <span style={{ paddingTop: 10 }}>Rs -</span>
              <button style={removeBtn}>✕</button>
            </div>

            <button style={addPriceBtn}>
              Add Product Or Service Price
            </button>
          </div>
        </div>

        {/* Footer */}
        <div style={footer}>
          <button onClick={() => router.back()} style={cancelBtn}>
            Cancel
          </button>
          <button style={saveBtn}>Save</button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Components ---------- */

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
  width: 460,
  height: "100%",
  background: "#fff",
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

const title = {
  fontSize: 18,
  fontWeight: 600,
};

const body = {
  paddingBottom: 90,
};

const row = {
  display: "flex",
  gap: 12,
};

const footer = {
  position: "sticky" as const,
  bottom: 0,
  background: "#fff",
  borderTop: "1px solid #e5e7eb",
  paddingTop: 12,
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

const divider = {
  height: 1,
  background: "#e5e7eb",
  margin: "18px 0",
};

const sectionTitle = {
  fontSize: 14,
  fontWeight: 600,
  marginBottom: 12,
};

const priceBox = {
  background: "#f9fafb",
  padding: 14,
  borderRadius: 8,
  border: "1px solid #e5e7eb",
};

const priceHeader = {
  display: "grid",
  gridTemplateColumns: "2fr 1fr 1fr",
  fontSize: 12,
  fontWeight: 600,
  marginBottom: 8,
};

const priceRow = {
  display: "grid",
  gridTemplateColumns: "2fr 1fr 1fr auto",
  gap: 8,
  alignItems: "center",
};

const addPriceBtn = {
  marginTop: 12,
  fontSize: 13,
  color: "#16a34a",
  background: "transparent",
  border: "none",
  cursor: "pointer",
};

const removeBtn = {
  background: "transparent
