"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import HeaderBar from "@/components/HeaderBar";
import { useRouter } from "next/navigation";

type LabRecord = {
  id: string;
  testId: string;
  client: string;
  tests: string;
  status: string;
  date: string;
};

export default function LabPage() {
  const router = useRouter();
  const [records, setRecords] = useState<LabRecord[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("labRecords");
    if (saved) {
      setRecords(JSON.parse(saved));
    }
  }, []);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <main style={{ flex: 1, padding: 24, background: "#f5f7fb" }}>
        <HeaderBar pageTitle="Lab" />

        <h2>GM Diagnostic Lab</h2>

        <div style={{ background: "#fff", padding: 16, borderRadius: 10 }}>
          {records.length === 0 ? (
            <div style={{ textAlign: "center", padding: 40 }}>
              No lab records
            </div>
          ) : (
            <table width="100%">
              <thead>
                <tr>
                  <th>TEST ID</th>
                  <th>CLIENT</th>
                  <th>TESTS</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {records.map((r) => (
                  <tr
                    key={r.id}
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      router.push(
                        `/billing?fromLab=true&client=${r.client}&tests=${r.tests}`
                      )
                    }
                  >
                    <td>{r.testId}</td>
                    <td>{r.client}</td>
                    <td>{r.tests}</td>
                    <td>
                      <span style={{ background: "#f59e0b", padding: 6 }}>
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}
