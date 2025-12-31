"use client";
import { useState } from "react";

export default function CreateClientReport() {
  const [header, setHeader] = useState({
    patientName: "",
    age: "",
    gender: "",
    doctorName: "",
    testName: "CBC",
    sampleDate: "",
  });

  const [password, setPassword] = useState("");
  const [rows, setRows] = useState([
    { parameter: "Hemoglobin", result: "", unit: "g/dL", normalRange: "13–17", flag: "" },
    { parameter: "WBC", result: "", unit: "/µL", normalRange: "4000–11000", flag: "" },
    { parameter: "Platelets", result: "", unit: "/µL", normalRange: "150000–450000", flag: "" },
  ]);

  async function save() {
    await fetch("/api/client-reports", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ header, items: rows, password }),
    });
    alert("Report Created");
  }

  return (
    <div className="card">
      <h2>Client Lab Report</h2>

      <div className="grid">
        <input placeholder="Patient Name" onChange={e => setHeader({...header, patientName:e.target.value})}/>
        <input placeholder="Age" onChange={e => setHeader({...header, age:e.target.value})}/>
        <input placeholder="Gender" onChange={e => setHeader({...header, gender:e.target.value})}/>
        <input placeholder="Doctor Name" onChange={e => setHeader({...header, doctorName:e.target.value})}/>
        <input type="date" onChange={e => setHeader({...header, sampleDate:e.target.value})}/>
        <input placeholder="Report Password" onChange={e => setPassword(e.target.value)}/>
      </div>

      <table>
        <thead>
          <tr>
            <th>Test Parameter</th>
            <th>Result</th>
            <th>Unit</th>
            <th>Normal Range</th>
            <th>Flag</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r,i)=>(
            <tr key={i}>
              <td>{r.parameter}</td>
              <td><input onChange={e=>{
                const x=[...rows];x[i].result=e.target.value;setRows(x);
              }}/></td>
              <td>{r.unit}</td>
              <td>{r.normalRange}</td>
              <td>{r.flag}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={save}>Create Report</button>
    </div>
  );
}
