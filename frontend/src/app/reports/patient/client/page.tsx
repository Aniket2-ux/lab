"use client";
import { useEffect, useState } from "react";

export default function ClientReportPage() {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [tests, setTests] = useState<any[]>([]);

  const [form, setForm] = useState({
    clientId: "",
    patientName: "",
    age: "",
    gender: "",
    doctorId: "",
    password: "",
  });

  useEffect(() => {
    fetch("/api/doctors").then(r => r.json()).then(setDoctors);
  }, []);

  const addTest = () => {
    setTests([...tests, { name: "", parameters: [] }]);
  };

  const saveReport = async () => {
    await fetch("/api/client-reports", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, tests }),
    });
    alert("Report Saved");
  };

  return (
    <div style={{ maxWidth: 1000, margin: "auto" }}>

      <h2>Client Lab Report</h2>

      {/* PATIENT INFO */}
      <div className="card">
        <input placeholder="Client ID" onChange={e => setForm({ ...form, clientId: e.target.value })}/>
        <input placeholder="Patient Name" onChange={e => setForm({ ...form, patientName: e.target.value })}/>
        <input placeholder="Age" onChange={e => setForm({ ...form, age: e.target.value })}/>
        <select onChange={e => setForm({ ...form, gender: e.target.value })}>
          <option>Gender</option>
          <option>Male</option>
          <option>Female</option>
        </select>

        {/* DOCTOR SELECT + ADD */}
        <div style={{ display: "flex", gap: 10 }}>
          <select onChange={e => setForm({ ...form, doctorId: e.target.value })}>
            <option>Select Doctor</option>
            {doctors.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
          </select>
          <button onClick={() => window.location.href="/settings/doctors"}>
            + Add Doctor
          </button>
        </div>

        <input placeholder="Report Password" type="password"
          onChange={e => setForm({ ...form, password: e.target.value })}
        />
      </div>

      {/* TESTS */}
      {tests.map((test, ti) => (
        <div className="card" key={ti}>
          <input
            placeholder="Test Name (CBC / LFT / Lipid)"
            onChange={e => test.name = e.target.value}
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
              {test.parameters.map((p:any, pi:number) => (
                <tr key={pi}>
                  <td><input /></td>
                  <td><input /></td>
                  <td><input /></td>
                  <td><input /></td>
                </tr>
              ))}
            </tbody>
          </table>

          <button onClick={() => test.parameters.push({})}>
            + Add Parameter
          </button>
        </div>
      ))}

      <button onClick={addTest}>+ Add Test</button>
      <button onClick={saveReport} style={{ marginLeft: 10 }}>
        Save Report
      </button>
    </div>
  );
}
