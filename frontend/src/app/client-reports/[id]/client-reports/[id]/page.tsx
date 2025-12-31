"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function ViewReport() {
  const { id } = useParams();
  const [report, setReport] = useState<any>(null);
  const [password, setPassword] = useState("");
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const reports = JSON.parse(
      localStorage.getItem("clientReports") || "[]"
    );
    const found = reports.find((r: any) => r.id === id);
    setReport(found);
  }, [id]);

  if (!report) return <p>Report not found</p>;

  if (!allowed) {
    return (
      <div style={{ padding: 40 }}>
        <h3>Enter Report Password</h3>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={() => {
            if (password === report.password) {
              setAllowed(true);
            } else {
              alert("Wrong password");
            }
          }}
        >
          View Report
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
      <h2>Client Lab Report</h2>

      <p><b>Patient:</b> {report.patientName}</p>
      <p><b>Doctor:</b> {report.doctor}</p>
      <p><b>Date:</b> {report.createdAt}</p>

      {report.tests.map((t: any, i: number) => (
        <div key={i} style={{ marginTop: 24 }}>
          <h4>{t.testName}</h4>

          <table width="100%">
            <thead>
              <tr>
                <th>Parameter</th>
                <th>Result</th>
                <th>Unit</th>
                <th>Normal Range</th>
              </tr>
            </thead>
            <tbody>
              {t.parameters.map((p: any, j: number) => (
                <tr key={j}>
                  <td>{p.name}</td>
                  <td>{p.result}</td>
                  <td>{p.unit}</td>
                  <td>{p.range}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
