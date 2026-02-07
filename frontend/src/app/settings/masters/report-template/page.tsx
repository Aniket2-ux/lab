"use client";

import { useEffect, useState } from "react";
import { API_BASE } from "@/lib/apiBase";

export default function ReportTemplatePage() {
  const [form, setForm] = useState<any>({});

  useEffect(() => {
    fetch(`${API_BASE}/api/report-template`)
      .then(r => r.json())
      .then(setForm);
  }, []);

  async function save() {
    await fetch(`${API_BASE}/api/report-template`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    alert("Saved");
  }

  return (
    <div style={{ padding: 24, maxWidth: 600 }}>
      <h2>Report Template</h2>

      <input placeholder="Lab Name" value={form.labName || ""} onChange={e=>setForm({...form,labName:e.target.value})} style={input}/>
      <textarea placeholder="Header Text" value={form.headerText || ""} onChange={e=>setForm({...form,headerText:e.target.value})} style={input}/>
      <textarea placeholder="Footer Text" value={form.footerText || ""} onChange={e=>setForm({...form,footerText:e.target.value})} style={input}/>
      <input placeholder="Authorized Signatory" value={form.authorizedSignatory || ""} onChange={e=>setForm({...form,authorizedSignatory:e.target.value})} style={input}/>

      <button onClick={save} style={saveBtn}>SAVE</button>
    </div>
  );
}

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
