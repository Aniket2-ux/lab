"use client";

import { useState } from "react";

type Parameter = {
  name: string;
  result: string;
  unit: string;
  range: string;
};

type Test = {
  testName: string;
  parameters: Parameter[];
};

export default function ClientReportPage() {
  const [patient, setPatient] = useState({
    clientId: "",
    name: "",
    age: "",
    gender: "",
    doctor: "",
    password: "",
  });

  const [tests, setTests] = useState<Test[]>([
    {
      testName: "CBC",
      parameters: [
        { name: "Hemoglobin", result: "", unit: "g/dL", range: "13 – 17" },
      ],
    },
  ]);

  /* ---------------- ADD TEST ---------------- */
  const addTest = () => {
    setTests([
      ...tests,
      {
        testName: "",
        parameters: [{ name: "", result: "", unit: "", range: "" }],
      },
    ]);
  };

  /* ---------------- ADD PARAMETER ---------------- */
  const addParameter = (testIndex: number) => {
    const copy = [...tests];
    copy[testIndex].parameters.push({
      name: "",
      result: "",
      unit: "",
      range: "",
    });
    setTests(copy);
  };

  /* ---------------- SAVE REPORT ---------------- */
  const saveReport = async () => {
    const payload = { patient, tests };

    console.log("Saving report", payload);

    // later connect backend
    alert("Report saved (UI working)");
  };

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: 24 }}>
      <h2>Client Lab Report</h2>

      {/* ================= PATIENT INFO ================= */}
      <div className="card">
        <div className="grid">
          <input placeholder="Client ID"
            onChange={(e) => setPatient({ ...patient, clientId: e.target.value })} />
          <input placeholder="Patient Name"
            onChange={(e) => setPatient({ ...patient, name: e.target.value })} />
          <input placeholder="Age"
            onChange={(e) => setPatient({ ...patient, age: e.target.value })} />
          <select
            onChange={(e) => setPatient({ ...patient, gender: e.target.value })}
          >
            <option value="">Gender</option>
            <option>Male</option>
            <option>Female</option>
          </select>

          <DoctorSelect
            value={patient.doctor}
            onChange={(v) => setPatient({ ...patient, doctor: v })}
          />

          <input
            placeholder="Report Password"
            type="password"
            onChange={(e) =>
              setPatient({ ...patient, password: e.target.value })
            }
          />
        </div>
      </div>

      {/* ================= TESTS ================= */}
      {tests.map((test, ti) => (
        <div className="card" key={ti}>
          <input
            placeholder="Test Name (CBC / LFT / Lipid)"
            value={test.testName}
            onChange={(e) => {
              const copy = [...tests];
              copy[ti].testName = e.target.value;
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
              {test.parameters.map((p, pi) => (
                <tr key={pi}>
                  <td>
                    <input
                      value={p.name}
                      onChange={(e) => {
                        const copy = [...tests];
                        copy[ti].parameters[pi].name = e.target.value;
                        setTests(copy);
                      }}
                    />
                  </td>
                  <td>
                    <input
                      value={p.result}
                      onChange={(e) => {
                        const copy = [...tests];
                        copy[ti].parameters[pi].result = e.target.value;
                        setTests(copy);
                      }}
                    />
                  </td>
                  <td>
                    <input
                      value={p.unit}
                      onChange={(e) => {
                        const copy = [...tests];
                        copy[ti].parameters[pi].unit = e.target.value;
                        setTests(copy);
                      }}
                    />
                  </td>
                  <td>
                    <input
                      value={p.range}
                      onChange={(e) => {
                        const copy = [...tests];
                        copy[ti].parameters[pi].range = e.target.value;
                        setTests(copy);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button onClick={() => addParameter(ti)}>+ Add Parameter</button>
        </div>
      ))}

      <div style={{ display: "flex", gap: 12 }}>
        <button onClick={addTest}>+ Add Test</button>
        <button onClick={saveReport}>Save Report</button>
      </div>

      {/* SIMPLE STYLES */}
      <style jsx>{`
        .card {
          background: #fff;
          padding: 16px;
          border-radius: 10px;
          margin-bottom: 20px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }
        input, select {
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 6px;
        }
        table {
          width: 100%;
          margin-top: 12px;
          border-collapse: collapse;
        }
        th, td {
          border-bottom: 1px solid #eee;
          padding: 8px;
        }
      `}</style>
    </div>
  );
}

/* ================= DOCTOR SELECT ================= */
function DoctorSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [doctors, setDoctors] = useState(["Dr. Sharma", "Dr. Patel"]);
  const [newDoc, setNewDoc] = useState("");

  return (
    <div>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">Select Doctor</option>
        {doctors.map((d) => (
          <option key={d}>{d}</option>
        ))}
      </select>

      <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
        <input
          placeholder="Add doctor"
          value={newDoc}
          onChange={(e) => setNewDoc(e.target.value)}
        />
        <button
          onClick={() => {
            if (!newDoc) return;
            setDoctors([...doctors, newDoc]);
            onChange(newDoc);
            setNewDoc("");
          }}
        >
          +
        </button>
      </div>
    </div>
  );
}
