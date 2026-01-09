"use client";

import { useState } from "react";

export default function StockSettingsPage() {
  const [discountBasedOn, setDiscountBasedOn] = useState<"invoiceTotal" | "invoiceLine">(
    "invoiceLine"
  );

  const [discountType, setDiscountType] = useState<"percentage" | "amount">(
    "amount"
  );

  const [category, setCategory] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isInternal, setIsInternal] = useState(false);

  const categories = [
    "Medicine",
    "Cosmetics",
    "Supplements",
    "Kits",
    "MedicalItems",
    "Derma",
    "Surgical",
  ];

  return (
    <div style={wrapper}>
      <h2 style={title}>Stock Settings</h2>

      {/* Discount Based On */}
      <section style={section}>
        <p style={label}>Discount Based On</p>
        <RadioOption
          label="Invoice total"
          active={discountBasedOn === "invoiceTotal"}
          onClick={() => setDiscountBasedOn("invoiceTotal")}
        />
        <RadioOption
          label="Invoice line"
          active={discountBasedOn === "invoiceLine"}
          onClick={() => setDiscountBasedOn("invoiceLine")}
        />
      </section>

      {/* Discount Type */}
      <section style={section}>
        <p style={label}>Discount Type</p>
        <RadioOption
          label="Percentage (%)"
          active={discountType === "percentage"}
          onClick={() => setDiscountType("percentage")}
        />
        <RadioOption
          label="Amount (Nrs)"
          active={discountType === "amount"}
          onClick={() => setDiscountType("amount")}
        />
      </section>

      {/* Product Category */}
      <section style={section}>
        <p style={label}>Product Category</p>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Dropdown */}
          <div style={{ flex: 1, position: "relative" }}>
            <input
              style={dropdownInput}
              placeholder="Sellable"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              onClick={() => setIsOpen((prev) => !prev)}
            />
            <div style={caretIcon}>⌃</div>

            {isOpen && (
              <div style={dropdownList}>
                {categories.map((cat) => (
                  <div
                    key={cat}
                    style={dropdownItem}
                    onClick={() => {
                      setCategory(cat);
                      setIsOpen(false);
                    }}
                  >
                    {cat}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Checkbox */}
          <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <input
              type="checkbox"
              checked={isInternal}
              onChange={() => setIsInternal(!isInternal)}
            />
            Is Internal Category
          </label>
        </div>
      </section>

      {/* Save/Cancel */}
      <div style={footer}>
        <button style={cancelBtn}>Cancel</button>
        <button style={saveBtn}>Save</button>
      </div>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function RadioOption({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <label
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        marginBottom: 6,
      }}
    >
      <input type="radio" checked={active} readOnly />
      <span style={{ marginLeft: 8 }}>{label}</span>
    </label>
  );
}

/* ---------------- STYLES ---------------- */

const wrapper: React.CSSProperties = {
  background: "#fff",
  padding: 24,
  borderRadius: 12,
  width: "100%",
  maxWidth: 600,
  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
};

const title: React.CSSProperties = {
  marginBottom: 20,
  fontWeight: 600,
  fontSize: 20,
};

const section: React.CSSProperties = {
  marginBottom: 24,
};

const label: React.CSSProperties = {
  fontWeight: 600,
  marginBottom: 8,
};

const dropdownInput: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  border: "1px solid #198754",
  borderRadius: 6,
  outline: "none",
};

const caretIcon: React.CSSProperties = {
  position: "absolute",
  right: 12,
  top: 12,
  pointerEvents: "none",
  fontSize: 14,
  color: "#444",
};

const dropdownList: React.CSSProperties = {
  position: "absolute",
  top: 46,
  left: 0,
  width: "100%",
  maxHeight: 200,
  background: "#fff",
  border: "1px solid #ccc",
  borderRadius: 6,
  overflowY: "auto",
  zIndex: 20,
};

const dropdownItem: React.CSSProperties = {
  padding: "10px 12px",
  cursor: "pointer",
  borderBottom: "1px solid #f0f0f0",
};

const footer: React.CSSProperties = {
  marginTop: 20,
  display: "flex",
  justifyContent: "flex-end",
  gap: 10,
};

const cancelBtn: React.CSSProperties = {
  padding: "10px 16px",
  background: "#ddd",
  border: "none",
  borderRadius: 6,
};

const saveBtn: React.CSSProperties = {
  padding: "10px 16px",
  background: "#198754",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
};
