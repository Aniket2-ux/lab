"use client";

import { useEffect, useState } from "react";
import { API_BASE } from "@/lib/apiBase";

export default function DoctorsPage() {
  const [data, setData] = useState<any[]>([]);
  const [name, setName] = useState("");

  useEffect(() => {
    fetch(`${API_BASE}/api/doctors`)
      .then(r => r.json())
      .then(setData);
  }, []);

  async function add() {
    await fetch(`${API_BASE}/api/doctors`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    location.reload();
  }

  return (
    <div style={{ padding: 24 }}>
      <h2>Doctors / Referrals</h2>

      <input placeholder="Doctor Name" value={name} onChange={e=>setName(e.target.value)} style={input}/>
      <button onClick={add} style={btn}>ADD</button>

      <ul>
        {data.map(d => <li key={d.id}>{d.name}</li>)}
      </ul>
    </div>
  );
}

const input = { padding: 8, marginRight: 10 };
const btn = { padding: "8px 14px", background: "#16a34a", color: "#fff", border: "none" };
