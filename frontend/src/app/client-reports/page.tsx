"use client";

import { useState } from "react";

/* ---------------------------------
   TEMP REPORT DATA (DEMO)
   Later this will come from backend
---------------------------------- */
const REPORTS = [
  {
    id: "RPT-001",
    patientName: "Rahul Sharma",
    testName: "Blood Test",
    result: "All values are normal.",
    password: "1234",
  },
  {
    id: "RPT-002",
    patientName: "Anita Verma",
    testName: "X-Ray Chest",
    result: "No abnormal findings.",
    password: "5678",
  },
];

export default function ClientReportsPage() {
  const [reportId, setReportId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [report, setReport] = useState<any>(null);

  function handleViewReport() {
    setError("");

    const found = REPORTS.find(
      (r) => r.id === reportId && r.password === password
    );

    if (!found) {
      setError("Invalid Report ID or Password");
      return;
    }

    setReport(found);
  }

  return (
    <div
      style={{
        maxWidth: 480,
        margin: "60px auto",
        background: "#fff",
        padding: 24,
        borderRadius: 10,
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      }}
    >
      <h2 style={{ marginBottom: 20 }}>Client Report Access</h2>

      {!report ? (
        <>
          <div style={{ marginBottom: 12 }}>
            <label>Report ID</label>
            <input
              value={reportId}
              onChange={(e) => setReportId(e.target.value)}
              placeholder="e.g. RPT-001"
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: 12 }}>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Report password"
              style={inputStyle}
            />
          </div>

          {error && (
            <div style={{ color: "red", marginBottom: 12 }}>{error}</div>
          )}

          <button onClick={handleViewReport} style={buttonStyle}>
            View Report
          </button>
        </>
      ) : (
        <>
          <h3 style={{ marginBottom: 10 }}>Report Details</h3>

          <Field label="Report ID" value={report.id} />
          <Field label="Patient Name" value={report.patientName} />
          <Field label="Test Name" value={report.testName} />
          <Field label="Result" value={report.result} />

          <button
            style={{ ...buttonStyle, marginTop: 20 }}
            onClick={() => {
              setReport(null);
              setReportId("");
              setPassword("");
            }}
          >
            Back
          </button>
        </>
      )}
    </div>
  );
}

/* ---------------------------------
   SMALL HELPERS
---------------------------------- */

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ fontSize: 12, color: "#666" }}>{label}</div>
      <div style={{ fontWeight: 600 }}>{value}</div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "8px 10px",
  marginTop: 4,
  borderRadius: 6,
  border: "1px solid #ccc",
};

const buttonStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px",
  background: "#00854b",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
  fontWeight: 600,
};
