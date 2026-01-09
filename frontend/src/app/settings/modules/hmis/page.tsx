"use client";

import { useState } from "react";

/* ================================
     HMIS SETTINGS PAGE
================================== */

export default function HMISSettingsPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [orgUnit, setOrgUnit] = useState("");
  const [hmisElement, setHmisElement] = useState("");

  const hmisOptions = [
    "OPD Register",
    "Lab Register",
    "IPD Register",
    "Maternal Health",
    "Child Health",
    "Vaccination",
  ];

  return (
    <div style={container}>
      <h2 style={header}>HMIS Settings</h2>

      <div style={inputRow}>
        <InputField
          label="Username"
          value={username}
          onChange={setUsername}
          placeholder="Enter username"
        />

        <InputField
          label="Password"
          value={password}
          onChange={setPassword}
          placeholder="Enter password"
          type="password"
        />

        <InputField
          label="OrgUnit"
          value={orgUnit}
          onChange={setOrgUnit}
          placeholder="Enter org unit"
        />
      </div>

      <div style={{ marginTop: 20 }}>
        <label style={labelStyle}>Hmis Elements</label>
        <select
          value={hmisElement}
          onChange={(e) => setHmisElement(e.target.value)}
          style={dropdown}
        >
          <option value="">Type form data</option>
          {hmisOptions.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </div>

      <button style={submitBtn}>GENERATE TEST REPORT</button>
    </div>
  );
}

/* ================================
      INPUT COMPONENT
================================== */

function InputField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <div style={{ flex: 1 }}>
      <label style={labelStyle}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={inputBox}
      />
    </div>
  );
}

/* ================================
             STYLES
================================== */

const container: React.CSSProperties = {
  background: "#fff",
  padding: 24,
  borderRadius: 10,
  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  maxWidth: 900,
};

const header: React.CSSProperties = {
  marginBottom: 20,
  fontWeight: 600,
  fontSize: 20,
};

const inputRow: React.CSSProperties = {
  display: "flex",
  gap: 16,
  marginBottom: 20,
};

const labelStyle: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 500,
  marginBottom: 6,
  display: "block",
};

const inputBox: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  border: "1px solid #ccc",
  borderRadius: 6,
  outline: "none",
};

const dropdown: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 6,
  border: "1px solid #ccc",
  outline: "none",
  marginTop: 6,
};

const submitBtn: React.CSSProperties = {
  marginTop: 30,
  background: "#198754",
  color: "#fff",
  padding: "12px 20px",
  borderRadius: 6,
  border: "none",
  cursor: "pointer",
  width: 220,
  fontWeight: 600,
};
