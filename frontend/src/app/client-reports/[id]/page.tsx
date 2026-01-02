"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Report = {
  id: number;
  patientName: string;
  age: number;
  gender: string;
  doctorName: string;
  reportCode: string;
  createdAt: string;
};

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "http://145.223.23.176:5000";

export default function ClientReportViewPage() {
  const { id } = useParams();
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadReport() {
      try {
        const res = await fetch(
          `${API_BASE}/api/client-reports/${id}`
        );
        const data = await res.json();
        setReport(data);
      } catch (e) {
        console.error("Failed to load report");
      } finally {
        setLoading(false);
      }
    }

    if (id) loadReport();
  }, [id]);

  if (loading) {
    return <div style={center}>Loading report...</div>;
  }

  if (!report) {
    return <div style={center}>Report not found</div>;
  }

  return (
    <div style={page}>
      <div style={sheet}>
        {/* HEADER */}
        <div style={header}>
          <div>
            <h2 style={{ margin: 0 }}>GM Diagnostic Lab</h2>
            <p style={muted}>
              Trusted Pathology & Diagnostic Center
            </p>
          </div>
          <div style={{ textAlign: "right" }}>
            <strong>Report Code</strong>
            <div>{report.reportCode}</div>
            <div style={muted}>
              {new Date(report.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>

        <hr />

        {/* PATIENT DETAILS */}
        <h3 style={sectionTitle}>Patient Details</h3>
        <div style={grid}>
          <Field label="Patient Name" value={report.patientName} />
          <Field label="Age" value={report.age} />
          <Field label="Gender" value={report.gender} />
          <Field label="Ref. Doctor" value={report.doctorName} />
        </div>

        <hr />

        {/* PLACEHOLDER FOR TEST RESULTS */}
        <h3 style={sectionTitle}>Test Results</h3>
        <table style={table}>
          <thead>
            <tr>
              <th>Test</th>
              <th>Result</th>
              <th>Unit</th>
              <th>Reference Range</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Sample Test</td>
              <td>Normal</td>
              <td>-</td>
              <td>Normal</td>
            </tr>
          </tbody>
        </table>

        {/* FOOTER */}
        <div style={footer}>
          <div>
            <strong>Authorized By</strong>
            <div>GM Diagnostic Lab</div>
          </div>

          <button style={printBtn} onClick={() => window.print()}>
            Print Report
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function Field({ label, value }: { label: string; value: any }) {
  return (
    <div>
      <div style={labelStyle}>{label}</div>
      <div style={valueStyle}>{value}</div>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const page = {
  minHeight: "100vh",
  background: "linear-gradient(120deg,#e8f5e9,#ffffff)",
  padding: "40px",
};

const sheet = {
  maxWidth: "900px",
  margin: "auto",
  background: "#fff",
  padding: "32px",
  borderRadius: "10px",
  boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "16px",
  marginBottom: "20px",
};

const sectionTitle = {
  margin: "20px 0 10px",
};

const labelStyle = {
  fontSize: "12px",
  color: "#6c757d",
};

const valueStyle = {
  fontSize: "15px",
  fontWeight: 500,
};

const table = {
  width: "100%",
  borderCollapse: "collapse" as const,
};

const footer = {
  marginTop: "30px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const printBtn = {
  background: "#198754",
  color: "#fff",
  border: "none",
  padding: "10px 18px",
  borderRadius: "6px",
  cursor: "pointer",
};

const muted = {
  fontSize: "12px",
  color: "#6c757d",
};

const center = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
