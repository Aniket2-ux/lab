"use client";

import { useEffect, useState } from "react";

const API = process.env.NEXT_PUBLIC_API_BASE;

type TestRow = {
  testName: string;
  result: string;
  unit: string;
  range: string;
};

export default function ClientReportCreatePage() {
  const [form, setForm] = useState({
    patientName: "",
    age: "",
    gender: "",
    doctorName: "",
    password: "",
  });

  const [tests, setTests] = useState<TestRow[]>([
    { testName: "", result: "", unit: "", range: "" },
  ]);

  const [saved, setSaved] = useState<any[]>([]);

  const addTest = () => {
    setTests([...tests, { testName: "", result: "", unit: "", range: "" }]);
  };

  const updateTest = (i: number, field: keyof TestRow, value: string) => {
    const copy = [...tests];
    copy[i][field] = value;
    setTests(copy);
  };

  const loadReports = async () => {
    const res = await fetch(`${API}/api/client-reports`);
    if (res.ok) setSaved(await res.json());
  };

  useEffect(() => {
    loadReports();
  }, []);

  const saveReport = async () => {
    const reportCode = "REP-" + Date.now();

    await fetch(`${API}/api/client-reports`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        age: Number(form.age),
        reportCode,
        tests,
      }),
    });

    setForm({
      patientName: "",
      age: "",
      gender: "",
      doctorName: "",
      password: "",
    });

    setTests([{ testName: "", result: "", unit: "", range: "" }]);
    loadReports();
  };

  return (
    <div className="page">
      <div className="card">
        <h2>Client Lab Report</h2>
        <p>Create a lab report and share code with patient</p>

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

        <h3>Test Results</h3>

        {tests.map((t, i) => (
          <div key={i} className="testRow">
            <input placeholder="Test Name"
              value={t.testName}
              onChange={e => updateTest(i, "testName", e.target.value)} />

            <input placeholder="Result"
              value={t.result}
              onChange={e => updateTest(i, "result", e.target.value)} />

            <input placeholder="Unit"
              value={t.unit}
              onChange={e => updateTest(i, "unit", e.target.value)} />

            <input placeholder="Reference Range"
              value={t.range}
              onChange={e => updateTest(i, "range", e.target.value)} />
          </div>
        ))}

        <button onClick={addTest} className="secondary">+ Add Test</button>
        <button onClick={saveReport}>Save Report</button>
      </div>

      <div className="saved">
        <h3>Saved Reports</h3>
        {saved.map((r) => (
          <div key={r.id} className="savedRow">
            <strong>{r.patientName}</strong>
            <span>Code: {r.reportCode}</span>
            <span>Pass: {r.password}</span>
          </div>
        ))}
      </div>

      <style jsx>{`
        .page {
          min-height: 100vh;
          background: linear-gradient(120deg,#e8f5e9,#fff);
          padding: 40px;
        }
        .card {
          max-width: 520px;
          margin: auto;
          background: #fff;
          padding: 24px;
          border-radius: 14px;
          box-shadow: 0 20px 40px rgba(0,0,0,.1);
        }
        input {
          width: 100%;
          padding: 10px;
          margin-bottom: 10px;
          border-radius: 8px;
          border: 1px solid #ccc;
        }
        .testRow {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px;
        }
        button {
          width: 100%;
          padding: 12px;
          margin-top: 10px;
          background: #198754;
          color: #fff;
          border: none;
          border-radius: 8px;
          font-weight: 600;
        }
        .secondary {
          background: #e9ecef;
          color: #000;
        }
        .saved {
          max-width: 700px;
          margin: 40px auto;
        }
        .savedRow {
          background: #fff;
          padding: 12px;
          border-radius: 8px;
          margin-bottom: 10px;
          display: flex;
          justify-content: space-between;
        }
      `}</style>
    </div>
  );
}
