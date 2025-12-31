"use client";

import { useEffect, useState } from "react";
import { API_BASE } from "@/lib/apiBase";

type Report = {
  id: number;
  reportCode: string;
  clientName: string;
  testName: string;
  createdAt: string;
};

export default function ClientReportPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [clientName, setClientName] = useState("");
  const [testName, setTestName] = useState("");
  const [password, setPassword] = useState("");

  async function loadReports() {
    const res = await fetch(`${API_BASE}/api/client-reports`);
    const data = await res.json();
    setReports(data);
  }

  async function createReport() {
    await fetch(`${API_BASE}/api/client-reports`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clientId: Date.now(),
        clientName,
        testName,
        password,
      }),
    });

    setClientName("");
    setTestName("");
    setPassword("");
    loadReports();
  }

  useEffect(() => {
    loadReports();
  }, []);

  return (
    <div style={{ maxWidth: 900 }}>
      <h2>Client Report</h2>

      <div style={box}>
        <h3>Create Report</h3>

        <input placeholder="Client Name" value={clientName} onChange={e => setClientName(e.target.value)} />
        <input placeholder="Test Name" value={testName} onChange={e => setTestName(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />

        <button onClick={createReport}>Create</button>
      </div>

      <div style={box}>
        <h3>Recently Created</h3>

        <table width="100%">
          <thead>
            <tr>
              <th>Code</th>
              <th>Client</th>
              <th>Test</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {reports.map(r => (
              <tr key={r.id}>
                <td>{r.reportCode}</td>
                <td>{r.clientName}</td>
                <td>{r.testName}</td>
                <td>{new Date(r.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const box: React.CSSProperties = {
  background: "#fff",
  padding: 16,
  borderRadius: 8,
  marginBottom: 20,
};
