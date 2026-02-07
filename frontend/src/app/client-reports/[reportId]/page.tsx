"use client";

import { useParams, useSearchParams } from "next/navigation";

export default function ClientReportView() {
  const { reportId } = useParams();
  const password = useSearchParams().get("p");

  // later: validate password from backend
  if (!password) {
    return <div style={{ padding: 40 }}>Invalid access</div>;
  }

  return (
    <div style={page}>
      {/* Header */}
      <div style={header}>
        <h2>GM Diagnostic Lab Pvt. Ltd.</h2>
        <div>Quality You Can Trust</div>
      </div>

      <hr />

      {/* Patient Info */}
      <div style={infoGrid}>
        <div><b>Report Code:</b> {reportId}</div>
        <div><b>Patient:</b> Ram Kumar</div>
        <div><b>Age / Gender:</b> 35 / Male</div>
        <div><b>Date:</b> 2026-01-14</div>
      </div>

      {/* Test Table */}
      <table style={table}>
        <thead>
          <tr>
            <th>Test</th>
            <th>Parameter</th>
            <th>Result</th>
            <th>Unit</th>
            <th>Normal Range</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Fasting Blood Sugar</td>
            <td>Glucose</td>
            <td>98</td>
            <td>mg/dl</td>
            <td>70 – 110</td>
          </tr>
        </tbody>
      </table>

      {/* Footer */}
      <div style={footer}>
        <div>Report should be clinically correlated</div>
        <div style={{ marginTop: 40 }}>
          Authorized Signatory<br />
          <b>Lab Incharge</b>
        </div>
      </div>
    </div>
  );
}

/* ---------- styles ---------- */

const page = {
  maxWidth: 900,
  margin: "40px auto",
  background: "#fff",
  padding: 32,
};

const header = {
  textAlign: "center" as const,
};

const infoGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 8,
  margin: "20px 0",
};

const table = {
  width: "100%",
  borderCollapse: "collapse" as const,
};

const footer = {
  marginTop: 40,
  fontSize: 13,
};
