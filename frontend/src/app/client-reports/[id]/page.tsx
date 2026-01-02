"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import html2pdf from "html2pdf.js";

/* ---------------- TYPES ---------------- */

type TestResult = {
  testName: string;
  result: string;
  unit: string;
  range: string;
};

type Report = {
  id: number;
  patientName: string;
  age: number;
  gender: string;
  doctorName: string;
  reportCode: string;
  createdAt: string;
  tests?: TestResult[];
};

/* ---------------- CONFIG ---------------- */

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "http://145.223.23.176:5000";

/* ---------------- PAGE ---------------- */

export default function ClientReportViewPage() {
  const { id } = useParams();
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);

  const pdfRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadReport() {
      try {
        const res = await fetch(`${API_BASE}/api/client-reports/${id}`);
        if (!res.ok) throw new Error("Failed");
        const data = await res.json();
        setReport(data);
      } catch {
        setReport(null);
      } finally {
        setLoading(false);
      }
    }

    if (id) loadReport();
  }, [id]);

  const downloadPDF = () => {
    if (!pdfRef.current) return;

    html2pdf()
      .from(pdfRef.current)
      .set({
        margin: 10,
        filename: `Lab_Report_${report?.reportCode}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      })
      .save();
  };

  if (loading) return <div style={center}>Loading report…</div>;
  if (!report) return <div style={center}>Report not found</div>;

  return (
    <div style={page}>
      <div ref={pdfRef} style={sheet}>
        {/* HEADER */}
        <div style={header}>
          <div>
            <h2 style={{ margin: 0 }}>GM Diagnostic Lab</h2>
            <p style={muted}>Trusted Pathology & Diagnostic Center</p>
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

        {/* TEST RESULTS */}
        <h3 style={sectionTitle}>Test Results</h3>

        {report.tests?.length ? (
          <table style={table}>
            <thead>
              <tr>
                <th style={th}>Test</th>
                <th style={th}>Result</th>
                <th style={th}>Unit</th>
                <th style={th}>Reference Range</th>
              </tr>
            </thead>
            <tbody>
              {report.tests.map((t, i) => (
                <tr key={i}>
                  <td style={td}>{t.testName}</td>
                  <td style={td}>{t.result}</td>
                  <td style={td}>{t.unit || "-"}</td>
                  <td style={td}>{t.range || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={muted}>No test results available.</p>
        )}

        {/* FOOTER */}
        <div style={footer}>
          <div>
            <strong>Authorized By</strong>
            <div>GM Diagnostic Lab</div>
          </div>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div style={actionBar}>
        <button style={outlineBtn} onClick={() => window.print()}>
          Print Report
        </button>
        <button style={primaryBtn} onClick={downloadPDF}>
          Download PDF
        </button>
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
};

const sectionTitle = {
  margin: "20px 0 10px",
};

const table = {
  width: "100%",
  borderCollapse: "collapse" as const,
};

const th = {
  borderBottom: "1px solid #000",
  padding: "8px",
};

const td = {
  borderBottom: "1px solid #ddd",
  padding: "8px",
};

const footer = {
  marginTop: "30px",
};

const actionBar = {
  marginTop: "20px",
  display: "flex",
  justifyContent: "center",
  gap: "12px",
};

const primaryBtn = {
  background: "#198754",
  color: "#fff",
  border: "none",
  padding: "10px 18px",
  borderRadius: "6px",
  cursor: "pointer",
};

const outlineBtn = {
  background: "#fff",
  border: "1px solid #198754",
  color: "#198754",
  padding: "10px 18px",
  borderRadius: "6px",
  cursor: "pointer",
};

const labelStyle = {
  fontSize: "12px",
  color: "#6c757d",
};

const valueStyle = {
  fontSize: "15px",
  fontWeight: 500,
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
