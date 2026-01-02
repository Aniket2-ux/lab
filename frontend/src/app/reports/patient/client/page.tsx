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

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "http://145.223.23.176:5000";

export default function ClientReportPage() {
  const [form, setForm] = useState({
    patientName: "",
    age: "",
    gender: "",
    doctorName: "",
    password: "",
  });

  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ---------------- LOAD REPORTS SAFELY ---------------- */
  const loadReports = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/client-reports`);
      if (!res.ok) return; // prevent crash
      const data = await res.json();
      setReports(data || []);
    } catch {
      // silently ignore – page must not crash
    }
  };

  useEffect(() => {
    loadReports();
  }, []);

  /* ---------------- SAVE REPORT ---------------- */
  const saveReport = async () => {
    if (
      !form.patientName ||
      !form.age ||
      !form.gender ||
      !form.doctorName ||
      !form.password
    ) {
      setError("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const reportCode = "REP-" + Date.now();

      const res = await fetch(`${API_BASE}/api/client-reports`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, reportCode }),
      });

      if (!res.ok) throw new Error("Failed to save report");

      setForm({
        patientName: "",
        age: "",
        gender: "",
        doctorName: "",
        password: "",
      });

      loadReports();
    } catch (e: any) {
      setError(e.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="card">
        <h2>Client Lab Report</h2>
        <p className="sub">Create a lab report and share code with patient</p>

        <input
          placeholder="Patient Name"
          value={form.patientName}
          onChange={(e) => setForm({ ...form, patientName: e.target.value })}
        />

        <input
          placeholder="Age"
          value={form.age}
          onChange={(e) => setForm({ ...form, age: e.target.value })}
        />

        <input
          placeholder="Gender"
          value={form.gender}
          onChange={(e) => setForm({ ...form, gender: e.target.value })}
        />

        <input
          placeholder="Doctor Name"
          value={form.doctorName}
          onChange={(e) => setForm({ ...form, doctorName: e.target.value })}
        />

        <input
          type="password"
          placeholder="Report Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        {error && <div className="error">{error}</div>}

        <button onClick={saveReport} disabled={loading}>
          {loading ? "Saving..." : "Save Report"}
        </button>
      </div>

      {/* ---------- SAVED REPORTS ---------- */}
      <div className="list">
        <h3>Saved Reports</h3>

        {reports.length === 0 && (
          <p className="empty">No reports created yet</p>
        )}

        {reports.map((r) => (
          <div key={r.id} className="row">
            <div>
              <strong>{r.patientName}</strong>
              <div className="meta">
                Dr. {r.doctorName} • {r.gender}, {r.age}
              </div>
            </div>

            <div className="codes">
              <span>Code: {r.reportCode}</span>
              <span>Pass: {r.password}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ---------- STYLES ---------- */}
      <style jsx>{`
        .page {
          min-height: 100vh;
          background: linear-gradient(120deg, #e8f5e9, #ffffff);
          padding: 40px 16px;
        }

        .card {
          max-width: 420px;
          margin: auto;
          background: #fff;
          padding: 28px;
          border-radius: 14px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        h2 {
          margin: 0;
          text-align: center;
          color: #0f5132;
        }

        .sub {
          text-align: center;
          font-size: 13px;
          color: #6c757d;
          margin-bottom: 10px;
        }

        input {
          padding: 12px;
          border-radius: 8px;
          border: 1px solid #ced4da;
          font-size: 14px;
        }

        input:focus {
          outline: none;
          border-color: #198754;
        }

        button {
          padding: 12px;
          background: #198754;
          color: #fff;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
        }

        button:disabled {
          background: #9fd3b0;
        }

        .error {
          background: #f8d7da;
          color: #842029;
          padding: 8px;
          border-radius: 6px;
          font-size: 13px;
          text-align: center;
        }

        .list {
          max-width: 720px;
          margin: 40px auto 0;
        }

        .row {
          background: #fff;
          padding: 14px;
          border-radius: 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.06);
        }

        .meta {
          font-size: 12px;
          color: #6c757d;
        }

        .codes {
          text-align: right;
          font-size: 13px;
          color: #198754;
          display: flex;
          flex-direction: column;
        }

        .empty {
          text-align: center;
          color: #6c757d;
          font-size: 14px;
        }
      `}</style>
    </div>
  );
}
