"use client";
import { useState } from "react";
import { apiClient } from "@/lib/apiClient";

export default function ClientAccess() {
  const [clientId, setClientId] = useState("");
  const [password, setPassword] = useState("");
  const [report, setReport] = useState<any>(null);

  const view = async () => {
    const data = await apiClient("/api/client-reports/access", {
      method: "POST",
      body: JSON.stringify({ clientId, password }),
    });
    setReport(data);
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Lab Report Access</h2>

      <input placeholder="Client ID" onChange={e => setClientId(e.target.value)} />
      <input placeholder="Password" type="password"
        onChange={e => setPassword(e.target.value)} />

      <button onClick={view}>View</button>

      {report && (
        <pre>{JSON.stringify(report.testData, null, 2)}</pre>
      )}
    </div>
  );
}
