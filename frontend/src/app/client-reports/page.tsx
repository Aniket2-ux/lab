"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ClientReportsPage() {
  const [reports, setReports] = useState<any[]>([]);

  useEffect(() => {
    const data = JSON.parse(
      localStorage.getItem("clientReports") || "[]"
    );
    setReports(data);
  }, []);

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
      <h2>Lab Report Access</h2>

      <table width="100%" style={{ marginTop: 16 }}>
        <thead>
          <tr>
            <th>Client ID</th>
            <th>Patient</th>
            <th>Doctor</th>
            <th>Date</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {reports.length === 0 && (
            <tr>
              <td colSpan={5}>No reports available</td>
            </tr>
          )}

          {reports.map((r) => (
            <tr key={r.id}>
              <td>{r.clientId}</td>
              <td>{r.patientName}</td>
              <td>{r.doctor}</td>
              <td>{r.createdAt}</td>
              <td>
                <Link href={`/client-reports/${r.id}`}>View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
