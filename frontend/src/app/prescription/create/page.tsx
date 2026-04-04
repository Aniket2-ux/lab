"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function CreatePrescription() {
  const params = useSearchParams();
  const router = useRouter();

  const visitId = params.get("visitId");
  const clientId = params.get("clientId");

  const [diagnosis, setDiagnosis] = useState("");
  const [notes, setNotes] = useState("");

  const [items, setItems] = useState([
    { name: "", dosage: "", duration: "" },
  ]);

  const handleAddRow = () => {
    setItems([...items, { name: "", dosage: "", duration: "" }]);
  };

  const handleChange = (index: number, field: string, value: string) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const handleSave = async () => {
    try {
      const res = await fetch(
        "http://145.223.23.176:5000/api/prescriptions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            visitId: Number(visitId),
            clientId: Number(clientId),
            diagnosis,
            notes,
            items,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Error");
        return;
      }

      alert("Prescription saved ✅");
      router.push("/clients");
    } catch (err) {
      console.error(err);
      alert("Something went wrong ❌");
    }
  };

  return (
    <div style={{ padding: 20, marginLeft: 240 }}>
      <h2>Create Prescription</h2>

      <p><b>Visit ID:</b> {visitId}</p>

      <div style={{ marginTop: 20 }}>
        <label>Diagnosis</label>
        <textarea
          style={input}
          value={diagnosis}
          onChange={(e) => setDiagnosis(e.target.value)}
        />
      </div>

      <div style={{ marginTop: 20 }}>
        <label>Notes</label>
        <textarea
          style={input}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      <h3 style={{ marginTop: 20 }}>Medicines</h3>

      {items.map((item, i) => (
        <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10 }}>
          <input
            placeholder="Medicine"
            style={input}
            value={item.name}
            onChange={(e) => handleChange(i, "name", e.target.value)}
          />
          <input
            placeholder="Dosage"
            style={input}
            value={item.dosage}
            onChange={(e) => handleChange(i, "dosage", e.target.value)}
          />
          <input
            placeholder="Duration"
            style={input}
            value={item.duration}
            onChange={(e) => handleChange(i, "duration", e.target.value)}
          />
        </div>
      ))}

      <button onClick={handleAddRow} style={addBtn}>
        + Add Medicine
      </button>

      <br /><br />

      <button onClick={handleSave} style={saveBtn}>
        SAVE PRESCRIPTION
      </button>
    </div>
  );
}

const input = {
  padding: 10,
  border: "1px solid #ccc",
  borderRadius: 6,
  width: "100%",
};

const addBtn = {
  background: "#2563eb",
  color: "#fff",
  padding: "6px 12px",
  border: "none",
  borderRadius: 6,
};

const saveBtn = {
  background: "#16a34a",
  color: "#fff",
  padding: "10px 16px",
  border: "none",
  borderRadius: 6,
};