"use client";

import { useState } from "react";

const CBC_TEMPLATE = [
  { parameter: "Hemoglobin", unit: "g/dL", normalRange: "13–17" },
  { parameter: "WBC", unit: "/µL", normalRange: "4000–11000" },
  { parameter: "Platelets", unit: "/µL", normalRange: "150000–450000" },
];

export default function ClientReportPage() {
  const [clientName, setClientName] = useState("");
  const [password, setPassword] = useState("");
  const [rows, setRows] = useState(
    CBC_TEMPLATE.map((p) => ({ ...p, value: "" }))
  );
  const [code, setCode] = useState("");

  async function createReport() {
    const res = await fetch("/api/client-reports", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clientName,
        testName: "CBC",
        password,
        parameters: rows.map((r) => ({
          ...r,
          flag: "Normal",
        })),
      }),
    });

    const json = await res.json();
    setCode(json.reportCode);
  }

  return (
    <div style={{ maxWidth: 900, margin: "auto" }}>
      <h2>Client Report (CBC)</h2>

      <input placeholder="Client Name" onChange={(e) => setClientName(e.target.value)} />
      <input placeholder="Report Password" onChange={(e) => setPassword(e.target.value)} />

      <table>
        <thead>
          <tr>
            <th>Parameter</th>
            <th>Value</th>
            <th>Unit</th>
            <th>Normal Range</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td>{r.parameter}</td>
              <td>
                <input
                  value={r.value}
                  onChange={(e) => {
                    const copy = [...rows];
                    copy[i].value = e.target.value;
                    setRows(copy);
                  }}
                />
              </td>
              <td>{r.unit}</td>
              <td>{r.normalRange}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={createReport}>Create Report</button>

      {code && <p><b>Report Code:</b> {code}</p>}
    </div>
  );
}
