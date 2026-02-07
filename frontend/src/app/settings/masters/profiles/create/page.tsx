"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { API_BASE } from "@/lib/apiBase";

export default function CreateProfile() {
  const router = useRouter();
  const [tests, setTests] = useState<any[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [form, setForm] = useState<any>({});

  useEffect(() => {
    fetch(`${API_BASE}/api/tests`)
      .then((r) => r.json())
      .then(setTests);
  }, []);

  function toggle(id:number) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  async function save() {
    await fetch(`${API_BASE}/api/profiles`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        test_ids: selected,
        price: Number(form.price),
      }),
    });

    router.push("/settings/masters/profiles");
  }

  return (
    <div style={drawer}>
      <h3>Create Profile / Package</h3>

      <input placeholder="Code (CBC)" onChange={(e)=>setForm({...form,code:e.target.value})} style={input}/>
      <input placeholder="Name" onChange={(e)=>setForm({...form,name:e.target.value})} style={input}/>
      <input placeholder="Price" type="number" onChange={(e)=>setForm({...form,price:e.target.value})} style={input}/>

      <div style={{ marginTop: 10 }}>
        <b>Select Tests</b>
        {tests.map((t) => (
          <label key={t.id} style={row}>
            <input
              type="checkbox"
              checked={selected.includes(t.id)}
              onChange={() => toggle(t.id)}
            />
            {t.code} — {t.name}
          </label>
        ))}
      </div>

      <button onClick={save} style={saveBtn}>SAVE</button>
    </div>
  );
}

const drawer = {
  position: "fixed" as const,
  right: 0,
  top: 0,
  width: 480,
  height: "100vh",
  background: "#fff",
  padding: 24,
};

const input = {
  width: "100%",
  padding: 10,
  marginBottom: 10,
};

const row = {
  display: "flex",
  gap: 8,
  marginBottom: 6,
};

const saveBtn = {
  background: "#16a34a",
  color: "#fff",
  padding: "10px 16px",
  border: "none",
  borderRadius: 6,
  marginTop: 12,
};
