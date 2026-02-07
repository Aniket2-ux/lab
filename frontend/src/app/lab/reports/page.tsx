"use client";

import { useRouter } from "next/navigation";

export default function LabReportList() {
  const router = useRouter();

  return (
    <div style={{ padding: 24 }}>
      <h2>Lab Reports</h2>

      <table style={table}>
        <thead>
          <tr>
            <th>OPD ID</th>
            <th>Patient Name</th>
            <th>Test / Profile</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>OPD-001</td>
            <td>Ram Kumar</td>
            <td>LFT</td>
            <td>Pending</td>
            <td>
              <button
                style={actionBtn}
                onClick={() => router.push("/lab/reports/OPD-001")}
              >
                ENTER RESULT
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

const table = {
  width: "100%",
  borderCollapse: "collapse" as const,
};

const actionBtn = {
  background: "#16a34a",
  color: "#fff",
  border: "none",
  padding: "6px 12px",
  borderRadius: 6,
  cursor: "pointer",
};
