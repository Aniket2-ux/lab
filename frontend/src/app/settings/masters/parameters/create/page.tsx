"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { API_BASE } from "@/lib/apiBase";

export default function CreateParameter() {
  const router = useRouter();
  const [tests, setTests] = useState<any[]>([]);
  const [form, setForm] = useState<any>({});

  useEffect(() => {
    fetch(`${API_BASE}/api/tests`)
      .then((r) => r.json())
      .then(setTests);
  }, []);

  async function save() {
    await fetch(`${API_BASE}/api/test-parameters`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    router.push("/settings/masters/parameters");
  }

  return (
    <div style={drawer}>
      <h3>Add Test Parameter</h3>

      <select
        onChange={(e) => setForm({ ...form, test_id: e.target.value })}
        style={input}
      >
        <option>Select Test</option>
        {tests.map((t) => (
          <option key={t.id} value={t.id}>
            {t.code} — {t.name}
          </option>
        ))}
      </select>

      <input placeholder="Parameter Name" onChange={(e)=>setForm({...form,name:e.target.value})} style={input}/>
      <input placeholder="Unit" onChange={(e)=>setForm({...form,unit:e.target.value})} style={input}/>
      <input placeholder="Normal Min" type="number" onChange={(e)=>setForm({...form,normal_min:e.target.value})} style={input}/>
      <input placeholder="Normal Max" type="number" onChange={(e)=>setForm({...form,normal_max:e.target.value})} style={input}/>
      <input placeholder="Critical Low" type="number" onChange={(e)=>setForm({...form,critical_low:e.target.value})} style={input}/>
      <input placeholder="Critical High" type="number" onChange={(e)=>setForm({...form,critical_high:e.target.value})} style={input}/>

      <button onClick={save} style={saveBtn}>SAVE</button>
    </div>
  );
}

const drawer = {
  position: "fixed" as const,
  right: 0,
  top: 0,
  width: 460,
  height: "100vh",
  background: "#fff",
  padding: 24,
};

const input = {
  width: "100%",
  padding: 10,
  marginBottom: 10,
};

const saveBtn = {
  background: "#16a34a",
  color: "#fff",
  padding: "10px 16px",
  border: "none",
  borderRadius: 6,
};
