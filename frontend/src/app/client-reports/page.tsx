"use client";

import { useState } from "react";

export default function ClientReportAccess() {
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [report, setReport] = useState<any>(null);

  async function fetchReport() {
    const res = await fetch("/api/client-reports/view", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reportCode: code, password }),
    });
    setReport(await res.json());
  }

  return (
    <div style={{ maxWidth: 900, margin: "auto" }}>
      <h2>Access Your Lab Report</h2>

      <input placeholder="Report Code" onChange={(e) => setCode(e.target.value)} />
      <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={fetchReport}>View</button>

      {report && (
        <>
          <h3>{report.clientName} – {report.testName}</h3>
          <table>
            <thead>
              <tr>
                <th>Parameter</th>
                <th>Result</th>
                <th>Unit</th>
                <th>Normal Range</th>
              </tr>
            </thead>
            <tbody>
              {report.ReportParameters.map((r:any) => (
                <tr key={r.id}>
                  <td>{r.parameter}</td>
                  <td>{r.value}</td>
                  <td>{r.unit}</td>
                  <td>{r.normalRange}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
