"use client";
import { useState } from "react";

export default function ClientReportPage() {
  const [form, setForm] = useState({
    patientName: "",
    age: "",
    gender: "",
    doctorName: "",
    password: "",
  });

  const [tests, setTests] = useState<any[]>([]);
  const [result, setResult] = useState<string | null>(null);

  const addTest = () => {
    setTests([...tests, { name: "", parameters: [] }]);
  };

  const addParam = (ti: number) => {
    const copy = [...tests];
    copy[ti].parameters.push({
      name: "",
      value: "",
      unit: "",
      range: "",
    });
    setTests(copy);
  };

  const saveReport = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE}/api/client-reports`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, tests }),
      }
    );
    const json = await res.json();
    setResult(json.reportCode);
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Client Lab Report</h2>

      <input placeholder="Patient Name" onChange={e=>setForm({...form,patientName:e.target.value})}/>
      <input placeholder="Age" onChange={e=>setForm({...form,age:e.target.value})}/>
      <input placeholder="Gender" onChange={e=>setForm({...form,gender:e.target.value})}/>
      <input placeholder="Doctor Name" onChange={e=>setForm({...form,doctorName:e.target.value})}/>
      <input placeholder="Report Password" onChange={e=>setForm({...form,password:e.target.value})}/>

      <hr />

      {tests.map((t, ti) => (
        <div key={ti}>
          <input
            placeholder="Test Name (CBC / LFT)"
            onChange={e => {
              const c=[...tests]; c[ti].name=e.target.value; setTests(c);
            }}
          />
          {t.parameters.map((p:any, pi:number)=>(
            <div key={pi}>
              <input placeholder="Parameter" />
              <input placeholder="Result" />
              <input placeholder="Unit" />
              <input placeholder="Normal Range" />
            </div>
          ))}
          <button onClick={()=>addParam(ti)}>+ Add Parameter</button>
        </div>
      ))}

      <button onClick={addTest}>+ Add Test</button>
      <button onClick={saveReport}>Save Report</button>

      {result && <h3>Report Code: {result}</h3>}
    </div>
  );
}
