"use client";

import { useEffect, useState } from "react";

type Report = {
  id: number;
  patientName: string;
  age: number;
  gender: string;
  doctorName: string;
  reportCode: string;
  password: string;
};

export default function ClientReportPage() {
  const [form, setForm] = useState({
    patientName: "",
    age: "",
    gender: "",
    doctorName: "",
    password: "",
  });

  const [reports, setReports] = useState<Report[]>([]);

  const API = process.env.NEXT_PUBLIC_API_BASE;

  const loadReports = async () => {
    const res = await fetch(`${API}/api/client-reports`);
    const data = await res.json();
    setReports(data);
  };

  useEffect(() => {
    loadReports();
  }, []);

  const saveReport = async () => {
    const reportCode = "REP-" + Date.now();

    await fetch(`${API}/api/client-reports`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, reportCode }),
    });

    setForm({
      patientName: "",
      age: "",
      gender: "",
      doctorName: "",
      password: "",
    });

    loadReports();
  };

  return (
    <div style={page}>
      <div style={card}>
        <h2>Client Lab Report</h2>

        <input placeholder="Patient Name" value={form.patientName}
          onChange={e => setForm({ ...form, patientName: e.target.value })} />

        <input placeholder="Age" value={form.age}
          onChange={e => setForm({ ...form, age: e.target.value })} />

        <input placeholder="Gender" value={form.gender}
          onChange={e => setForm({ ...form, gender: e.target.value })} />

        <input placeholder="Doctor Name" value={form.doctorName}
          onChange={e => setForm({ ...form, doctorName: e.target.value })} />

        <input placeholder="Report Password" value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })} />

        <button onClick={saveReport}>Save Report</button>
      </div>

      <div style={list}>
        <h3>Saved Reports</h3>
        {reports.map(r => (
          <div key={r.id} style={row}>
            <strong>{r.patientName}</strong>
            <span>{r.reportCode}</span>
            <span>{r.password}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Styles ---------- */
const page = {
  minHeight: "100vh",
  background: "linear-gradient(120deg,#e8f5e9,#ffffff)",
  padding: "40px",
};

const card = {
  maxWidth: "400px",
  margin: "auto",
  padding: "24px",
  background: "#fff",
  borderRadius: "12px",
  boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
  display: "flex",
  flexDirection: "column" as const,
  gap: "10px",
};

const list = {
  maxWidth: "600px",
  margin: "40px auto",
};

const row = {
  display: "flex",
  justifyContent: "space-between",
  background: "#fff",
  padding: "12px",
  marginBottom: "8px",
  borderRadius: "8px",
};
