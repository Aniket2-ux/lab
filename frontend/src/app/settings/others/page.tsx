"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

const tabs = [
  { key: "general", label: "GENERAL PRINT" },
  { key: "department", label: "DEPARTMENT" },
  { key: "service", label: "SERVICE TYPE" },
  { key: "vitals", label: "VITALS" },
  { key: "sms", label: "SMS / EMAIL" },
  { key: "survey", label: "SURVEY FORM" },
  { key: "ssf", label: "SSF" },
];

export default function OthersSettingsPage() {
  const [active, setActive] = useState("general");

  return (
    <div style={card}>
      {/* Tabs */}
      <div style={tabRow}>
        {tabs.map((t) => (
          <div
            key={t.key}
            onClick={() => setActive(t.key)}
            style={{
              ...tab,
              borderBottom:
                active === t.key ? "2px solid #16a34a" : "2px solid transparent",
              color: active === t.key ? "#16a34a" : "#555",
            }}
          >
            {t.label}
          </div>
        ))}
      </div>

      {/* Content */}
      <div style={{ marginTop: 24 }}>
        {active === "general" && <GeneralPrint />}
        {active !== "general" && (
          <div style={{ color: "#777" }}>Coming soon</div>
        )}
      </div>
    </div>
  );
}

function GeneralPrint() {
  return (
    <div style={{ maxWidth: 520 }}>
      <label style={row}>
        <input type="checkbox" defaultChecked /> Centralized Header
      </label>

      <label style={row}>
        <input type="checkbox" defaultChecked /> Enable letterhead color
      </label>

      <input placeholder="Hex value" style={input} />

      <div style={{ marginTop: 16 }}>
        <div style={{ fontSize: 12 }}>
          Clinic Name Font Size Scale (0.5 – 2)
        </div>
        <input type="number" step="0.1" defaultValue={1.8} style={input} />
      </div>

      <div style={{ marginTop: 24, display: "flex", gap: 10 }}>
        <Button label="SAVE" />
      </div>
    </div>
  );
}

const card = {
  background: "#fff",
  borderRadius: 10,
  padding: 24,
  maxWidth: 1100,
};

const tabRow = {
  display: "flex",
  gap: 24,
  borderBottom: "1px solid #e5e7eb",
};

const tab = {
  paddingBottom: 8,
  cursor: "pointer",
  fontSize: 13,
  fontWeight: 600,
};

const row = {
  display: "flex",
  gap: 10,
  marginBottom: 12,
};

const input = {
  width: 220,
  padding: 8,
  marginTop: 10,
};
