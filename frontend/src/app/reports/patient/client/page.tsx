"use client";

import { useState } from "react";

/* ---------------- TYPES ---------------- */
type ParameterRow = {
  parameter: string;
  result: string;
  unit: string;
  range: string;
};

type TestBlock = {
  name: string;
  rows: ParameterRow[];
};

/* ---------------- PAGE ---------------- */
export default function ClientReportPage() {
  const [clientId, setClientId] = useState("");
  const [patientName, setPatientName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [doctor, setDoctor] = useState("");
  const [password, setPassword] = useState("");

  const [tests, setTests] = useState<TestBlock[]>([]);

  /* -------- ADD TEST -------- */
  const addTest = () => {
    setTests([
      ...tests,
      {
        name: "",
        rows: [{ parameter: "", result: "", unit: "", range: "" }],
      },
    ]);
  };

  /* -------- ADD PARAMETER -------- */
  const addRow = (tIndex: number) => {
    const copy = [...tests];
    copy[tIndex].rows.push({
      parameter: "",
      result: "",
      unit: "",
      range: "",
    });
    setTests(copy);
  };

  /* -------- UPDATE PARAMETER -------- */
  const updateRow = (
    tIndex: number,
    rIndex: number,
    field: keyof ParameterRow,
    value: string
  ) => {
    const copy = [...tests];
    copy[tIndex].rows[rIndex][field] = value;
    setTests(copy);
  };

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      {/* ================= PATIENT INFO ================= */}
      <section className="card">
        <h2>Client Lab Report</h2>

        <div className="grid">
          <input placeholder="Client ID / Registration No"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
          />
          <input placeholder="Patient Name"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
          />
          <input placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <input placeholder="Gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
          <input placeholder="Doctor Name"
            value={doctor}
            onChange={(e) => setDoctor(e.target.value)}
          />
          <input placeholder="Report Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </section>

      {/* ================= TESTS ================= */}
      {tests.map((test, tIndex) => (
        <section className="card" key={tIndex}>
          <input
            className="test-title"
            placeholder="Test Name (CBC / LFT / Lipid / ECG etc.)"
            value={test.name}
            onChange={(e) => {
              const copy = [...tests];
              copy[tIndex].name = e.target.value;
              setTests(copy);
            }}
          />

          <table>
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
                      value={row.parameter}
                      onChange={(e) =>
                        updateRow(tIndex, rIndex, "parameter", e.target.value)
                      }
                      placeholder="Hemoglobin"
                    />
                  </td>
                  <td>
                    <input
                      value={row.result}
                      onChange={(e) =>
                        updateRow(tIndex, rIndex, "result", e.target.value)
                      }
                      placeholder="13.5"
                    />
                  </td>
                  <td>
                    <input
                      value={row.unit}
                      onChange={(e) =>
                        updateRow(tIndex, rIndex, "unit", e.target.value)
                      }
                      placeholder="g/dL"
                    />
                  </td>
                  <td>
                    <input
                      value={row.range}
                      onChange={(e) =>
                        updateRow(tIndex, rIndex, "range", e.target.value)
                      }
                      placeholder="13 – 17"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button className="secondary" onClick={() => addRow(tIndex)}>
            + Add Parameter
          </button>
        </section>
      ))}

      {/* ================= ACTIONS ================= */}
      <div style={{ display: "flex", gap: 12 }}>
        <button className="primary" onClick={addTest}>
          + Add Test
        </button>
        <button className="primary dark">
          Save Report
        </button>
      </div>

      {/* ================= STYLES ================= */}
      <style jsx>{`
        .card {
          background: #fff;
          padding: 24px;
          border-radius: 14px;
          margin-bottom: 24px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
        }

        h2 {
          margin-bottom: 16px;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
        }

        input {
          padding: 10px 12px;
          border-radius: 8px;
          border: 1px solid #ddd;
          width: 100%;
        }

        .test-title {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 12px;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 10px;
        }

        th,
        td {
          border: 1px solid #e5e5e5;
          padding: 8px;
        }

        th {
          background: #f5f7f9;
          text-align: left;
        }

        .primary {
          background: #00854b;
          color: #fff;
          padding: 12px 22px;
          border-radius: 8px;
          border: none;
          font-weight: 600;
          cursor: pointer;
        }

        .primary.dark {
          background: #004d2f;
        }

        .secondary {
          background: #eef7f2;
          border: 1px dashed #00854b;
          padding: 8px 14px;
          border-radius: 6px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
