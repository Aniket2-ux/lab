"use client";
import { useState } from "react";
import { apiClient } from "@/lib/apiClient";

export default function ClientReportPage() {
  const [form, setForm] = useState({
    clientId: "",
    patientName: "",
    age: "",
    gender: "",
    doctorName: "",
    password: "",
  });

  const [tests, setTests] = useState<any[]>([]);

  const addTest = () => {
    setTests([...tests, { name: "", params: [] }]);
  };

  const saveReport = async () => {
    await apiClient("/api/client-reports", {
      method: "POST",
      body: JSON.stringify({
        ...form,
        age: Number(form.age),
        testData: tests,
      }),
    });
    alert("Report saved");
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Client Lab Report</h2>

      <input placeholder="Client ID"
        onChange={e => setForm({ ...form, clientId: e.target.value })} />
      <input placeholder="Patient Name"
        onChange={e => setForm({ ...form, patientName: e.target.value })} />
      <input placeholder="Age"
        onChange={e => setForm({ ...form, age: e.target.value })} />
      <input placeholder="Gender"
        onChange={e => setForm({ ...form, gender: e.target.value })} />
      <input placeholder="Doctor Name"
        onChange={e => setForm({ ...form, doctorName: e.target.value })} />
      <input placeholder="Report Password"
        type="password"
        onChange={e => setForm({ ...form, password: e.target.value })} />

      <button onClick={addTest}>+ Add Test</button>
      <button onClick={saveReport}>Save Report</button>
    </div>
  );
}
