"use client";

import { useParams } from "next/navigation";

export default function LabReportEntry() {
  const { opdId } = useParams();

  return (
    <div style={{ padding: 24 }}>
      <h2>Lab Report Entry — {opdId}</h2>

      {/* Test Section */}
      <div style={card}>
        <h3>Fasting Blood Sugar</h3>

        <table style={table}>
          <thead>
            <tr>
              <th>Parameter</th>
              <th>Result</th>
              <th>Unit</th>
              <th>Normal Range</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Glucose</td>
              <td>
                <input style={input} placeholder="Enter value" />
              </td>
              <td>mg/dl</td>
              <td>70 – 110</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Action */}
      <div style={actions}>
        <button style={saveBtn}>SAVE REPORT</button>
        <button style={finalBtn}>FINALIZE REPORT</button>
      </div>
    </div>
  );
}

const card = {
  background: "#fff",
  padding: 16,
  borderRadius: 8,
  marginBottom: 24,
};

const table = {
  width: "100%",
  borderCollapse: "collapse" as const,
};

const input = {
  width: 120,
  padding: 6,
};

const actions = {
  display: "flex",
  gap: 12,
};

const saveBtn = {
  border: "1px solid #16a34a",
  background: "#fff",
  color: "#16a34a",
  padding: "8px 14px",
  borderRadius: 6,
};

const finalBtn = {
  border: "none",
  background: "#16a34a",
  color: "#fff",
  padding: "8px 14px",
  borderRadius: 6,
};
