"use client";

import { useState } from "react";

export default function VendorForm({ title, onSubmit }: any) {
  const [form, setForm] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    landline: "",
    pan: "",
    details: "",
    openingBalance: "",
    accountType: "Credit",
    bankName: "",
    bankBranch: "",
    bankAccount: "",
    ifsc: "",
    swift: "",
  });

  const update = (key: string, val: string) => {
    setForm({ ...form, [key]: val });
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>{title}</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 500 }}>

        <input placeholder="Supplier Name" onChange={(e) => update("name", e.target.value)} />
        <input placeholder="Address" onChange={(e) => update("address", e.target.value)} />
        <input placeholder="Email" onChange={(e) => update("email", e.target.value)} />
        <input placeholder="Phone" onChange={(e) => update("phone", e.target.value)} />
        <input placeholder="Landline" onChange={(e) => update("landline", e.target.value)} />
        <input placeholder="PAN Number" onChange={(e) => update("pan", e.target.value)} />
        <textarea placeholder="Details" onChange={(e) => update("details", e.target.value)} />

        <h3>Account Information</h3>
        <input placeholder="Opening Balance" onChange={(e) => update("openingBalance", e.target.value)} />

        <select onChange={(e) => update("accountType", e.target.value)}>
          <option value="Credit">Credit</option>
          <option value="Debit">Debit</option>
        </select>

        <h3>Bank Information</h3>
        <input placeholder="Beneficiary Name" onChange={(e) => update("beneficiary", e.target.value)} />
        <input placeholder="Bank Name" onChange={(e) => update("bankName", e.target.value)} />
        <input placeholder="Bank Branch" onChange={(e) => update("bankBranch", e.target.value)} />
        <input placeholder="Bank Account Number" onChange={(e) => update("bankAccount", e.target.value)} />
        <input placeholder="IFSC Code" onChange={(e) => update("ifsc", e.target.value)} />
        <input placeholder="Swift Code" onChange={(e) => update("swift", e.target.value)} />

        <button
          style={{ marginTop: 20, padding: 10, background: "#09a26e", color: "#fff" }}
          onClick={() => onSubmit(form)}
        >
          SAVE
        </button>
      </div>
    </div>
  );
}
