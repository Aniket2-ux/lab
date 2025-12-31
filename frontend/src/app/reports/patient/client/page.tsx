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

export default function ClientLabReportPage() {
  const [clientId, setClientId] = useState("");
  const [patientName, setPatientName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [doctor, setDoctor] = useState("");
  const [password, setPassword] = useState("");

  const [tests, setTests] = useState<Test[]>([
    {
      testName: "",
      parameters: [
        { name: "", result: "", unit: "", range: "" },
      ],
    },
  ]);

  const addTest = () => {
    setTests([
      ...tests,
      { testName: "", parameters: [{ name: "", result: "", unit: "", range: "" }] },
    ]);
  };

  const addParameter = (ti: number) => {
    const copy = [...tests];
    copy[ti].parameters.push({ name: "", result: "", unit: "", range: "" });
    setTests(copy);
  };

  const saveReport = () => {
    if (!clientId || !password) {
      alert("Client ID and password required");
      return;
    }

    const report = {
      id: Date.now().toString(),
      clientId,
      patientName,
      age,
      gender,
      doctor,
      password,
      createdAt: new Date().toLocaleString(),
      tests,
    };

    const existing = JSON.parse(
      localStorage.getItem("clientReports") || "[]"
    );

    localStorage.setItem(
      "clientReports",
      JSON.stringify([report, ...existing])
    );

    alert("Report saved successfully");
  };

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: 24 }}>
      <h2>Client Lab Report</h2>

      {/* PATIENT INFO */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
        <input placeholder="Client ID" onChange={(e) => setClientId(e.target.value)} />
        <input placeholder="Patient Name" onChange={(e) => setPatientName(e.target.value)} />
        <input placeholder="Age" onChange={(e) => setAge(e.target.value)} />
        <input placeholder="Gender" onChange={(e) => setGender(e.target.value)} />
        <input placeholder="Doctor Name" onChange={(e) => setDoctor(e.target.value)} />
        <input
          type="password"
          placeholder="Report Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {/* TESTS */}
      {tests.map((test, ti) => (
        <div key={ti} style={{ marginTop: 24, border: "1px solid #ddd", padding: 16 }}>
          <input
            placeholder="Test Name (CBC, LFT, Lipid...)"
            onChange={(e) => {
              const copy = [...tests];
              copy[ti].testName = e.target.value;
              setTests(copy);
            }}
          />

          <table width="100%" style={{ marginTop: 12 }}>
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
                      onChange={(e) => {
                        const copy = [...tests];
                        copy[ti].parameters[pi].name = e.target.value;
                        setTests(copy);
                      }}
                    />
                  </td>
                  <td>
                    <input
                      onChange={(e) => {
                        const copy = [...tests];
                        copy[ti].parameters[pi].result = e.target.value;
                        setTests(copy);
                      }}
                    />
                  </td>
                  <td>
                    <input
                      onChange={(e) => {
                        const copy = [...tests];
                        copy[ti].parameters[pi].unit = e.target.value;
                        setTests(copy);
                      }}
                    />
                  </td>
                  <td>
                    <input
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

      <div style={{ marginTop: 20 }}>
        <button onClick={addTest}>+ Add Test</button>{" "}
        <button onClick={saveReport} style={{ background: "#00854b", color: "#fff" }}>
          Save Report
        </button>
      </div>
    </div>
  );
}
