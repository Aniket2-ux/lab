"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "http://145.223.23.176:5000";

export default function ClientReportsPage() {
  const router = useRouter();

  const [reportCode, setReportCode] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleViewReport() {
    if (!reportCode || !password) {
      setError("Please enter report code and password");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await fetch(
        `${API_BASE}/api/client-reports/verify`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reportCode, password }),
        }
      );

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Invalid credentials");
      }

      const data = await res.json();

      // redirect to report view page
      router.push(`/client-reports/${data.id}`);
    } catch (err: any) {
      setError(err.message || "Failed to open report");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="client-bg">
      <div className="card">
        <h1>Lab Report Access</h1>
        <p className="subtitle">
          Enter your report code and password provided by the lab
        </p>

        <input
          placeholder="Report Code"
          value={reportCode}
          onChange={(e) => setReportCode(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <div className="error">{error}</div>}

        <button onClick={handleViewReport} disabled={loading}>
          {loading ? "Checking..." : "View Report"}
        </button>
      </div>

      <style jsx>{`
        .client-bg {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(
              rgba(255, 255, 255, 0.9),
              rgba(255, 255, 255, 0.9)
            ),
            url("https://images.unsplash.com/photo-1580281657527-47f249e8f0d1");
          background-size: cover;
          background-position: center;
        }

        .card {
          width: 420px;
          background: #ffffff;
          border-radius: 14px;
          padding: 32px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        h1 {
          margin: 0 0 6px;
          text-align: center;
          color: #0f5132;
        }

        .subtitle {
          text-align: center;
          font-size: 14px;
          color: #6c757d;
          margin-bottom: 24px;
        }

        input {
          width: 100%;
          padding: 12px 14px;
          margin-bottom: 14px;
          border-radius: 8px;
          border: 1px solid #ced4da;
          font-size: 14px;
        }

        input:focus {
          outline: none;
          border-color: #198754;
        }

        button {
          width: 100%;
          padding: 12px;
          border: none;
          border-radius: 8px;
          background: #198754;
          color: white;
          font-weight: 600;
          cursor: pointer;
          font-size: 15px;
        }

        button:disabled {
          background: #8fd19e;
        }

        .error {
          background: #f8d7da;
          color: #842029;
          padding: 10px;
          border-radius: 6px;
          font-size: 13px;
          margin-bottom: 12px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
