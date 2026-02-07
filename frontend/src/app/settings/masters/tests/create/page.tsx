"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { API_BASE } from "@/lib/apiBase";

export default function CreateTest() {
  const router = useRouter();

  const [categories, setCategories] = useState([]);
  const [samples, setSamples] = useState([]);
  const [methods, setMethods] = useState([]);

  const [form, setForm] = useState({
    code: "",
    name: "",
    unit: "",
    price: "",
    category_id: "",
    sample_type_id: "",
    method_id: "",
  });

  useEffect(() => {
    Promise.all([
      fetch(`${API_BASE}/api/test-categories`).then((r) => r.json()),
      fetch(`${API_BASE}/api/sample-types`).then((r) => r.json()),
      fetch(`${API_BASE}/api/methods`).then((r) => r.json()),
    ]).then(([c, s, m]) => {
      setCategories(c);
      setSamples(s);
      setMethods(m);
    });
  }, []);

  async function save() {
    await fetch(`${API_BASE}/api/tests`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        price: Number(form.price),
      }),
    });

    router.push("/settings/masters/tests");
  }

  return (
    <div style={drawer}>
      <h3>Create Test</h3>

      <input placeholder="Code" onChange={(e)=>setForm({...form,code:e.target.value})} style={input}/>
      <input placeholder="Name" onChange={(e)=>setForm({...form,name:e.target.value})} style={input}/>
      <input placeholder="Unit" onChange={(e)=>setForm({...form,unit:e.target.value})} style={input}/>
      <input placeholder="Price" type="number" onChange={(e)=>setForm({...form,price:e.target.value})} style={input}/>

      <select onChange={(e)=>setForm({...form,category_id:e.target.value})} style={input}>
        <option>Select Category</option>
        {categories.map((c:any)=><option key={c.id} value={c.id}>{c.name}</option>)}
      </select>

      <select onChange={(e)=>setForm({...form,sample_type_id:e.target.value})} style={input}>
        <option>Select Sample</option>
        {samples.map((s:any)=><option key={s.id} value={s.id}>{s.name}</option>)}
      </select>

      <select onChange={(e)=>setForm({...form,method_id:e.target.value})} style={input}>
        <option>Select Method</option>
        {methods.map((m:any)=><option key={m.id} value={m.id}>{m.name}</option>)}
      </select>

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
