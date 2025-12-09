"use client";

import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import HeaderBar from "../../components/HeaderBar";

type LabTest = {
  id: number;
  clientName: string;
  testName: string;
  orderedOn: string;
  status: string;
  tat: string;
};

function StatusBadge({ status }: { status: string }) {
  const color =
    status === "Ordered"
      ? "#ffbb88"
      : status === "Result Ready"
      ? "#a3e635"
      : "#d1d5db";

  return (
    <span
      style={{
        background: color,
        padding: "4px 10px",
        borderRadius: 20,
        fontSize: 12,
        fontWeight: 600,
      }}
    >
      {status}
    </span>
  );
}

export default function LabPage() {
  const [allTests, setAllTests] = useState<LabTest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("http://localhost:5000/api/lab");
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const data: LabTest[] = await res.json();
        setAllTests(data);
      } catch (err: any) {
        console.error("Failed to load lab tests", err);
        setError(err?.message || "Failed to load lab tests");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />

      <main style={{ flex: 1, padding: 24, background: "#f5f7fb" }}>
        <HeaderBar pageTitle="Lab" />

        <div
          style={{
            background: "#fff",
            borderRadius: 10,
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            padding: 20,
          }}
        >
          {/* Tabs */}
          <div
            style={{
              display: "flex",
              gap: 20,
              borderBottom: "1px solid #e5e7eb",
              paddingBottom: 8,
              marginBottom: 12,
            }}
          >
            <strong style={{ borderBottom: "2px solid #0b7a53" }}>Ordered</strong>
            <span style={{ color: "#6b7280" }}>Sample Taken</span>
            <span style={{ color: "#6b7280" }}>Incomplete</span>
            <span style={{ color: "#6b7280" }}>Result Ready</span>
            <span style={{ color: "#6b7280" }}>Dispatched</span>
            <span style={{ color: "#6b7280" }}>Canceled</span>
          </div>

          {/* Table header */}
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              padding: "10px 8px",
              background: "#f9fafb",
              display: "grid",
              gridTemplateColumns: "1fr 1.3fr 2fr 1fr 1fr 1fr",
              borderRadius: 6,
              marginBottom: 4,
            }}
          >
            <span>TEST ID</span>
            <span>CLIENT</span>
            <span>TESTS</span>
            <span>ORDERED ON</span>
            <span>STATUS</span>
            <span>TAT</span>
          </div>

          {/* Data rows */}
          {loading && <p>Loading…</p>}
          {!loading && error && (
            <p style={{ color: "red", padding: 8 }}>{error}</p>
          )}
          {!loading && !error && allTests.length === 0 && (
            <p style={{ padding: 8 }}>No lab tests found.</p>
          )}
          {!loading &&
            !error &&
            allTests.map((test) => (
              <div
                key={test.id}
                style={{
                  padding: "10px 8px",
                  display: "grid",
                  gridTemplateColumns: "1fr 1.3fr 2fr 1fr 1fr 1fr",
                  fontSize: 13,
                  borderBottom: "1px solid #f0f0f0",
                  alignItems: "center",
                }}
              >
                <span>{test.id}</span>
                <span>{test.clientName}</span>
                <span>{test.testName}</span>
                <span>{test.orderedOn}</span>
                <span>
                  <StatusBadge status={test.status} />
                </span>
                <span>{test.tat}</span>
              </div>
            ))}
        </div>
      </main>
    </div>
  );
}
