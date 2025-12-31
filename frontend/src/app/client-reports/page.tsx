"use client";

import { useState } from "react";

const API = process.env.NEXT_PUBLIC_API_BASE;

export default function ClientReportsPage() {
  const [reportCode, setReportCode] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState("");

  async function viewReport() {
    setError("");

    const res = await fetch(`${API}/api/client-reports/access`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reportCode, password }),
    });

    const json = await res.json();

    if (!res.ok) {
      setError(json.error);
      return;
    }

    setData(json);
  }

  return (
    <div style={{ maxWidth: 480, margin: "80px auto" }}>
      <h2>Client Report Access</h2>

      {!data ? (
        <>
          <input
            placeholder="Report Code"
            value={reportCode}
            onChange={(e) => setReportCode(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p style={{ color: "red" }}>{error}</p>}

          <button onClick={viewReport}>View Report</button>
        </>
      ) : (
        <>
          <h3>{data.clientName}</h3>
          <p>{data.testName}</p>

          <iframe
            src={`${API}${data.pdfUrl}`}
            style={{ width: "100%", height: 500 }}
          />

          <a href={`${API}${data.pdfUrl}`} download>
            Download PDF
          </a>
        </>
      )}
    </div>
  );
}
