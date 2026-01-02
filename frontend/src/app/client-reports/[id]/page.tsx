"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "http://145.223.23.176:5000";

export default function ClientReportView() {
  const { id } = useParams();
  const [report, setReport] = useState<any>(null);

  useEffect(() => {
    fetch(`${API_BASE}/api/client-reports/${id}`)
      .then((res) => res.json())
      .then(setReport);
  }, [id]);

  if (!report) return <div style={{ padding: 40 }}>Loading report...</div>;

  return (
    <div className="report-container">
      <div className="report-card" id="print-area">
        <h2 className="lab-name">GM Diagnostic Lab</h2>
        <p className="subtitle">Clinical Laboratory Report</p>

        <div className="patient-grid">
          <div><b>Patient:</b> {report.clientName}</div>
          <div><b>Age:</b> {report.age}</div>
          <div><b>Gender:</b> {report.gender}</div>
          <div><b>Doctor:</b> {report.doctorName}</div>
          <div><b>Test:</b> {report.testName}</div>
          <div><b>Date:</b> {new Date(report.createdAt).toLocaleDateString()}</div>
        </div>

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
            {report.parameters.map((p: any, i: number) => (
              <tr key={i}>
                <td>{p.name}</td>
                <td>{p.result}</td>
                <td>{p.unit}</td>
                <td>{p.range}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="actions no-print">
          <button onClick={() => window.print()}>🖨️ Print</button>
          <a href={`${API_BASE}/api/client-reports/${id}/pdf`} target="_blank">
            📄 Download PDF
          </a>
        </div>
      </div>

      <style jsx>{`
        .report-container {
          background: #f4f6f8;
          min-height: 100vh;
          padding: 40px;
          display: flex;
          justify-content: center;
        }

        .report-card {
          width: 800px;
          background: #fff;
          padding: 32px;
          border-radius: 10px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }

        .lab-name {
          text-align: center;
          margin-bottom: 4px;
        }

        .subtitle {
          text-align: center;
          color: #6c757d;
          margin-bottom: 20px;
        }

        .patient-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
          margin-bottom: 20px;
          font-size: 14px;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th, td {
          border: 1px solid #dee2e6;
          padding: 8px;
          font-size: 14px;
        }

        th {
          background: #f1f3f5;
        }

        .actions {
          margin-top: 20px;
          display: flex;
          gap: 12px;
        }

        .actions button, .actions a {
          padding: 10px 16px;
          background: #198754;
          color: white;
          border-radius: 6px;
          text-decoration: none;
          border: none;
          cursor: pointer;
        }

        @media print {
          .no-print {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
