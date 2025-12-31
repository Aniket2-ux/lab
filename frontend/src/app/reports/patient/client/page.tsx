"use client";

import { useState } from "react";

/* ================= TYPES ================= */

type Report = {
  id: number;
  clientId: string;
  clientName: string;
  testName: string;
  password: string;
  createdAt: string;
};

/* ================= PAGE ================= */

export default function ClientReportPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [clientId, setClientId] = useState("");
  const [clientName, setClientName] = useState("");
  const [testName, setTestName] = useState("");
  const [password, setPassword] = useState("");

  function createReport() {
    if (!clientId || !clientName || !testName || !password) {
      alert("Please fill all fields");
      return;
    }

    const newReport: Report = {
      id: Date.now(),
      clientId,
      clientName,
      testName,
      password,
      createdAt: new Date().toLocaleString(),
    };

    setReports([newReport, ...reports]);

    setClientId("");
    setClientName("");
    setTestName("");
    setPassword("");
  }

  return (
    <div style={{ maxWidth: 900 }}>
      {/* ================= HEADER ================= */}
      <h2>Client Report</h2>
      <p style={{ color: "#666", marginBottom: 20 }}>
        Create client reports and protect them with a password
      </p>

      {/* ================= CREATE REPORT ================= */}
      <div
        style={{
          background: "#fff",
          padding: 20,
          borderRadius: 10,
          marginBottom: 30,
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        }}
      >
        <h3 style={{ marginBottom: 12 }}>Create Report</h3>

        <div style={grid}>
          <input
            placeholder="Client ID"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            style={input}
          />
          <input
            placeholder="Client Name"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            style={input}
          />
          <input
            placeholder="Test Name"
            value={testName}
            onChange={(e) => setTestName(e.target.value)}
            style={input}
          />
          <input
            placeholder="Report Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={input}
          />
        </div>

        <button onClick={createReport} style={button}>
          Create Report
        </button>
      </div>

      {/* ================= RECENT REPORTS ================= */}
      <div
        style={{
          background: "#fff",
          borderRadius: 10,
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        }}
      >
        <div style={{ padding: 16, borderBottom: "1px solid #eee" }}>
          <strong>Recently Created Reports</strong>
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f6f7f9", textAlign: "left" }}>
              <th style={th}>Client ID</th>
              <th style={th}>Client Name</th>
              <th style={th}>Test</th>
              <th style={th}>Created</th>
              <th style={th}>Password</th>
            </tr>
          </thead>

          <tbody>
            {reports.length === 0 ? (
              <tr>
                <td colSpan={5} style={td}>
                  No reports created yet
                </td>
              </tr>
            ) : (
              reports.map((r) => (
                <tr key={r.id}>
                  <td style={td}>{r.clientId}</td>
                  <td style={td}>{r.clientName}</td>
                  <td style={td}>{r.testName}</td>
                  <td style={td}>{r.createdAt}</td>
                  <td style={td}>{r.password}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const grid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 12,
  marginBottom: 16,
};

const input: React.CSSProperties = {
  padding: 10,
  borderRadius: 6,
  border: "1px solid #ccc",
};

const button: React.CSSProperties = {
  background: "#009150",
  color: "#fff",
  padding: "10px 18px",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
};

const th: React.CSSProperties = {
  padding: 10,
  fontSize: 13,
  color: "#666",
};

const td: React.CSSProperties = {
  padding: 10,
  borderTop: "1px solid #eee",
  fontSize: 14,
};
