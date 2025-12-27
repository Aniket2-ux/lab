"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import HeaderBar from "@/components/HeaderBar";

type LabItem = {
  description?: string;
  qty?: number;
  rate?: number;
  dept?: string;
};

type LabRecord = {
  id: number;
  billId: string;
  billNumber: string;
  clientName: string;
  issueDate: string;
  items: LabItem[] | string; // IMPORTANT
  status: string;
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE!;


/**
 * Safely normalize items into array
 */
function normalizeItems(items: any): LabItem[] {
  if (Array.isArray(items)) return items;

  if (typeof items === "string") {
    try {
      const parsed = JSON.parse(items);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  return [];
}

export default function LabPage() {
  const [records, setRecords] = useState<LabRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/lab/records`);

        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || "Failed to fetch lab records");
        }

        const data = await res.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid response format");
        }

        setRecords(data);
      } catch (e: any) {
        console.error("Lab fetch error:", e);
        setError(e.message || "Failed to load lab records");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />

      <main
        style={{
          flex: 1,
          padding: 24,
          background: "#f5f7fb",
          overflowY: "auto",
        }}
      >
        <HeaderBar pageTitle="Lab" />

        {loading ? (
          <div>Loading lab records…</div>
        ) : error ? (
          <div style={{ color: "red" }}>{error}</div>
        ) : records.length === 0 ? (
          <div>No lab records found.</div>
        ) : (
          <div
            style={{
              background: "#fff",
              borderRadius: 10,
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              padding: 16,
            }}
          >
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th align="left">Bill No</th>
                  <th align="left">Client</th>
                  <th align="left">Issue Date</th>
                  <th align="left">Tests</th>
                  <th align="left">Status</th>
                </tr>
              </thead>
              <tbody>
                {records.map((r) => {
                  const items = normalizeItems(r.items);

                  return (
                    <tr key={r.id} style={{ borderTop: "1px solid #eee" }}>
                      <td>{r.billNumber}</td>
                      <td>{r.clientName}</td>
                      <td>{r.issueDate}</td>
                      <td>
                        {items.length > 0
                          ? items
                              .map((i) => i.description || "—")
                              .join(", ")
                          : "—"}
                      </td>
                      <td>{r.status}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
