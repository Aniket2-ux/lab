"use client";
import { useState } from "react";

export default function ClientView() {
  const [code,setCode]=useState("");
  const [password,setPassword]=useState("");
  const [r,setR]=useState<any>(null);

  async function open() {
    const res=await fetch("/api/client-reports/view",{
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body:JSON.stringify({reportCode:code,password})
    });
    setR(await res.json());
  }

  return (
    <div className="report">
      <h2>Lab Report Access</h2>

      <input placeholder="Report Code" onChange={e=>setCode(e.target.value)}/>
      <input placeholder="Password" type="password" onChange={e=>setPassword(e.target.value)}/>
      <button onClick={open}>View</button>

      {r && (
        <>
          <h3>{r.testName}</h3>
          <p><b>Patient:</b> {r.patientName} | {r.age} | {r.gender}</p>
          <p><b>Doctor:</b> {r.doctorName}</p>

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
              {r.ReportItems.map((i:any)=>(
                <tr key={i.id}>
                  <td>{i.parameter}</td>
                  <td>{i.result}</td>
                  <td>{i.unit}</td>
                  <td>{i.normalRange}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
