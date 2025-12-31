"use client";

import { useEffect, useState } from "react";
import { API_BASE } from "@/lib/apiBase";

type ClientReport = {
  id: number;
  reportCode: string;
  clientName: string;
  testName: string;
  createdAt: string;
};

export default function ClientReportPage() {
  const [reports, setReports] = useState<ClientReport[]>([]);
  const [loading, setLoading] = useState(true);

  const [reportCode, setReportCode] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [verifiedReport, setVerifiedReport] = useState<any>(null);

  /* ================= LOAD RECENT REPORTS ================= */
  useEffect(() => {
    loadReports();
  }, []);

  async function loadReports() {
    try {
      const res = await fetch(`${API_BASE}/api/client-reports`);
      const data = await res.json();
      setReports(data || []);
    } catch {
      setReports([]);
    } finally {
      setLoading(false);
    }
  }

  /* ================= VERIFY REPORT ================= */
  async function verifyReport() {
    setError("");
    setVerifiedReport(null);

    try {
      const res = await fetch(`${API_BASE}/api/client-reports/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reportCode, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Invalid credentials");
        return;
      }

      setVerifiedReport(data.report);
    } catch {
      setError("Server error");
    }
  }

  return (
    <div>
      {/* ================= HEADER ================= */}
      <h2 style={{ marginBottom: 6 }}>Client Report</h2>
      <p style={{ color: "#666", marginBottom: 20 }}>
        View patient reports using Report ID and Password
      </p>

      {/* ================= ACCESS PANEL ================= */}
      <div
        style={{
          background: "#fff",
          padding: 16,
          borderRadius: 8,
          marginBottom: 24,
          maxWidth: 520,
        }}
      >
        <h4>Access Report</h4>

        <input
          placeholder="Report ID"
          value={reportCode}
          onChange={(e) => setReportCode(e.target.value)}
          style={{ width: "100%", marginBottom: 10, padding: 10 }}
        />

        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", marginBottom: 10, padding: 10 }}
        />

        <button
          onClick={verifyReport}
          style={{
            background: "#009150",
            color: "#fff",
            padding: "8px 16px",
            border: "none",
            cursor: "pointer",
          }}
        >
          View Report
        </button>

        {error && <p style={{ color: "red", marginTop: 8 }}>{error}</p>}
      </div>

      {/* ================= VERIFIED RESULT ================= */}
      {verifiedReport && (
        <div
          style={{
            background: "#f8fffb",
            border: "1px solid #cceede",
            padding: 16,
            borderRadius: 8,
            marginBottom: 30,
          }}
        >
          <strong>{verifiedReport.clientName}</strong>
          <div>{verifiedReport.testName}</div>

          <a
            href={`${API_BASE}/${verifiedReport.pdfPath}`}
            target="_blank"
            rel="noreferrer"
            style={{ color: "#009150", fontWeight: 600 }}
          >
            Open PDF Report
          </a>
        </div>
      )}

      {/* ================= RECENT REPORTS TABLE ================= */}
      <div style={{ background: "#fff", borderRadius: 8 }}>
        <div style={{ padding: 16, borderBottom: "1px solid #eee" }}>
          <strong>Recently Created Reports</strong>
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f6f7f9", textAlign: "left" }}>
              <th style={th}>Report ID</th>
              <th style={th}>Client Name</th>
              <th style={th}>Test</th>
              <th style={th}>Created</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} style={td}>
                  Loading...
                </td>
              </tr>
            ) : reports.length === 0 ? (
              <tr>
                <td colSpan={4} style={td}>
                  No reports found
                </td>
              </tr>
            ) : (
              reports.map((r) => (
                <tr key={r.id}>
                  <td style={td}>{r.reportCode}</td>
                  <td style={td}>{r.clientName}</td>
                  <td style={td}>{r.testName}</td>
                  <td style={td}>
                    {new Date(r.createdAt).toLocaleDateString()}
                  </td>
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
