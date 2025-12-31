"use client";

import { useState } from "react";

type TestRow = {
  parameter: string;
  result: string;
  unit: string;
  normalRange: string;
};

type Test = {
  testName: string;
  rows: TestRow[];
};

export default function ClientReportPage() {
  const [patient, setPatient] = useState({
    name: "",
    age: "",
    gender: "",
  });

  const [doctor, setDoctor] = useState("");
  const [password, setPassword] = useState("");

  const [tests, setTests] = useState<Test[]>([]);

  const addTest = () => {
    setTests([
      ...tests,
      {
        testName: "",
        rows: [
          { parameter: "", result: "", unit: "", normalRange: "" },
        ],
      },
    ]);
  };

  const addRow = (tIndex: number) => {
    const copy = [...tests];
    copy[tIndex].rows.push({
      parameter: "",
      result: "",
      unit: "",
      normalRange: "",
    });
    setTests(copy);
  };

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      {/* HEADER */}
      <div
        style={{
          background: "#fff",
          padding: 24,
          borderRadius: 12,
          marginBottom: 24,
          boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
        }}
      >
        <h2 style={{ marginBottom: 16 }}>Client Lab Report</h2>

        <div className="grid">
          <input placeholder="Patient Name" onChange={e => setPatient({ ...patient, name: e.target.value })} />
          <input placeholder="Age" onChange={e => setPatient({ ...patient, age: e.target.value })} />
          <input placeholder="Gender" onChange={e => setPatient({ ...patient, gender: e.target.value })} />
          <input placeholder="Doctor Name" onChange={e => setDoctor(e.target.value)} />
          <input placeholder="Report Password" onChange={e => setPassword(e.target.value)} />
        </div>
      </div>

      {/* TESTS */}
      {tests.map((test, tIndex) => (
        <div
          key={tIndex}
          style={{
            background: "#fff",
            padding: 20,
            borderRadius: 12,
            marginBottom: 20,
            boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
          }}
        >
          <input
            placeholder="Test Name (CBC, LFT, Lipid, ECG, etc.)"
            style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}
            onChange={e => {
              const copy = [...tests];
              copy[tIndex].testName = e.target.value;
              setTests(copy);
            }}
          />

          <table className="report-table">
            <thead>
              <tr>
                <th>Parameter</th>
                <th>Result</th>
                <th>Unit</th>
                <th>Normal Range</th>
              </tr>
            </thead>
            <tbody>
              {test.rows.map((row, rIndex) => (
                <tr key={rIndex}>
                  <td>
                    <input
                      placeholder="Hemoglobin"
                      onChange={e => {
                        const copy = [...tests];
                        copy[tIndex].rows[rIndex].parameter = e.target.value;
                        setTests(copy);
                      }}
                    />
                  </td>
                  <td>
                    <input
                      placeholder="13.5"
                      onChange={e => {
                        const copy = [...tests];
                        copy[tIndex].rows[rIndex].result = e.target.value;
                        setTests(copy);
                      }}
                    />
                  </td>
                  <td>
                    <input placeholder="g/dL" />
                  </td>
                  <td>
                    <input placeholder="13–17" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button
            onClick={() => addRow(tIndex)}
            style={{
              marginTop: 10,
              background: "#eef7f2",
              border: "1px dashed #00854b",
              padding: "6px 12px",
              borderRadius: 6,
              cursor: "pointer",
            }}
          >
            + Add Parameter
          </button>
        </div>
      ))}

      {/* ACTIONS */}
      <div style={{ display: "flex", gap: 12 }}>
        <button
          onClick={addTest}
          style={{
            background: "#00854b",
            color: "#fff",
            padding: "12px 20px",
            borderRadius: 8,
            border: "none",
            fontWeight: 600,
          }}
        >
          + Add Test
        </button>

        <button
          style={{
            background: "#004d2f",
            color: "#fff",
            padding: "12px 20px",
            borderRadius: 8,
            border: "none",
            fontWeight: 600,
          }}
        >
          Save Report
        </button>
      </div>

      {/* BASIC STYLES */}
      <style jsx>{`
        .grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }
        input {
          width: 100%;
          padding: 10px;
          border-radius: 6px;
          border: 1px solid #ddd;
        }
        .report-table {
          width: 100%;
          border-collapse: collapse;
        }
        .report-table th,
        .report-table td {
          border: 1px solid #e5e5e5;
          padding: 8px;
        }
        .report-table th {
          background: #f5f7f9;
          text-align: left;
        }
      `}</style>
    </div>
  );
}
