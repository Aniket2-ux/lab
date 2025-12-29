"use client";

import { useState } from "react";

export default function CalendarClientSettingsPage() {
  const [defaultView, setDefaultView] = useState<"MONTHLY" | "LIST">("MONTHLY");

  return (
    <div style={{ padding: 24, maxWidth: 900 }}>
      <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 20 }}>
        Calendar And Client Settings
      </h2>

      {/* ---------------- Calendar ---------------- */}
      <section style={{ marginBottom: 30 }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 10 }}>
          Calendar
        </h3>

        <div style={{ display: "flex", gap: 20, marginBottom: 10 }}>
          <label>
            <input
              type="radio"
              checked={defaultView === "MONTHLY"}
              onChange={() => setDefaultView("MONTHLY")}
            />{" "}
            Monthly
          </label>

          <label>
            <input
              type="radio"
              checked={defaultView === "LIST"}
              onChange={() => setDefaultView("LIST")}
            />{" "}
            List
          </label>
        </div>

        <label style={{ display: "block", marginBottom: 10 }}>
          <input type="checkbox" /> Require Referrer
        </label>

        <div style={{ display: "flex", gap: 20 }}>
          <select style={selectStyle}>
            <option>Primary Calendar</option>
            <option>Bikram Sambat (BS)</option>
          </select>

          <select style={selectStyle}>
            <option>Starting Month</option>
            <option>Shrawan</option>
          </select>
        </div>

        <div style={{ marginTop: 10 }}>
          <select style={{ ...selectStyle, width: "100%" }}>
            <option>Default service for booking</option>
          </select>
        </div>
      </section>

      {/* ---------------- Client ---------------- */}
      <section style={{ marginBottom: 30 }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 10 }}>
          Client
        </h3>

        <label style={checkboxStyle}>
          <input type="checkbox" defaultChecked /> Allow Client Duplication
        </label>

        <label style={checkboxStyle}>
          <input type="checkbox" /> Require Email
        </label>

        <label style={checkboxStyle}>
          <input type="checkbox" /> Require Date of Birth
        </label>

        <label style={checkboxStyle}>
          <input type="checkbox" /> Require Phone Number
        </label>
      </section>

      {/* ---------------- Client & Calendar ---------------- */}
      <section>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 10 }}>
          Client And Calendar
        </h3>

        <label style={checkboxStyle}>
          <input type="checkbox" /> Require Known Us From
        </label>
      </section>
    </div>
  );
}

const selectStyle: React.CSSProperties = {
  padding: 8,
  minWidth: 200,
  borderRadius: 6,
  border: "1px solid #ccc",
};

const checkboxStyle: React.CSSProperties = {
  display: "block",
  marginBottom: 8,
};
