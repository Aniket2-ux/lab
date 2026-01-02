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
};

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "http://145.223.23.176:5000";

export default function ClientReportViewPage() {
  const { id } = useParams<{ id: string }>();
  const [report, setReport] = useState<Report | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    fetch(`${API_BASE}/api/client-reports`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch reports");
        return res.json();
      })
      .then((data: Report[]) => {
        const found = data.find((r) => String(r.id) === id);
        if (!found) {
          setError("Report not found");
        } else {
          setReport(found);
        }
      })
      .catch(() => {
        setError("Unable to load report");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div style={center}>Loading report...</div>;
  }

  if (error) {
    return <div style={centerError}>{error}</div>;
  }

  if (!report) return null;

  return (
    <div style={page}>
      <div style={card}>
        <h2>Lab Report</h2>

        <div style={row}>
          <label>Patient Name</label>
          <span>{report.patientName}</span>
        </div>

        <div style={row}>
          <label>Age</label>
          <span>{report.age}</span>
        </div>

        <div style={row}>
          <label>Gender</label>
          <span>{report.gender}</span>
        </div>

        <div style={row}>
          <label>Doctor</label>
          <span>{report.doctorName}</span>
        </div>

        <div style={row}>
          <label>Report Code</label>
          <span>{report.reportCode}</span>
        </div>
      </div>
    </div>
  );
}

/* ---------- Styles ---------- */

const page = {
  minHeight: "100vh",
  background: "linear-gradient(120deg,#e8f5e9,#ffffff)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const card = {
  width: "420px",
  background: "#fff",
  padding: "28px",
  borderRadius: "14px",
  boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
};

const row = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "12px",
  fontSize: "14px",
};

const center = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "16px",
};

const centerError = {
  ...center,
  color: "#842029",
};
