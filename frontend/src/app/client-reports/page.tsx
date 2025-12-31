"use client";
import { useState } from "react";

export default function ClientAccess() {
  const [code, setCode] = useState("");
  const [pass, setPass] = useState("");
  const [report, setReport] = useState<any>(null);

  const load = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE}/api/client-reports/access`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reportCode: code, password: pass }),
      }
    );
    const json = await res.json();
    setReport(json);
  };

  if (!report)
    return (
      <div style={{ padding: 40 }}>
        <h2>Lab Report Access</h2>
        <input placeholder="Report Code" onChange={e=>setCode(e.target.value)}/>
        <input placeholder="Password" type="password" onChange={e=>setPass(e.target.value)}/>
        <button onClick={load}>View Report</button>
      </div>
    );

  return (
    <div style={{ padding: 40 }}>
      <h2>{report.patientName}</h2>
      <p>Doctor: {report.doctorName}</p>

      {report.tests.map((t:any,i:number)=>(
        <div key={i}>
          <h3>{t.name}</h3>
          <table border={1}>
            <thead>
              <tr>
                <th>Parameter</th>
                <th>Result</th>
                <th>Unit</th>
                <th>Normal</th>
              </tr>
            </thead>
            <tbody>
              {t.parameters.map((p:any,j:number)=>(
                <tr key={j}>
                  <td>{p.name}</td>
                  <td>{p.value}</td>
                  <td>{p.unit}</td>
                  <td>{p.range}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
