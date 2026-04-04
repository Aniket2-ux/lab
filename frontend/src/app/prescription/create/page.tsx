"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

/* ---------- TYPES ---------- */
type Item = {
  name: string;
  dosage: string;
  duration: string;
};

/* ---------- COMPONENT ---------- */
export default function CreatePrescription() {
  const params = useSearchParams();
  const router = useRouter();

  const visitId = params.get("visitId");
  const clientId = params.get("clientId");

  const [diagnosis, setDiagnosis] = useState("");
  const [notes, setNotes] = useState("");

  const [items, setItems] = useState<Item[]>([
    { name: "", dosage: "", duration: "" },
  ]);

  /* ---------- ADD ROW ---------- */
  const handleAddRow = () => {
    setItems([...items, { name: "", dosage: "", duration: "" }]);
  };

  /* ---------- UPDATE FIELD ---------- */
  const handleChange = (
    index: number,
    field: keyof Item,
    value: string
  ) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  /* ---------- SAVE ---------- */
  const handleSave = async () => {
    if (!visitId || !clientId) {
      alert("Missing visit/client ID");
      return;
    }

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

      if (data.success) {
        alert("Prescription created ✅");
        router.push(`/opd?clientId=${clientId}`);
      } else {
        alert("Failed ❌");
      }
    } catch (err) {
      console.error(err);
      alert("Server error ❌");
    }
  };

  /* ---------- UI ---------- */
  return (
    <div style={{ padding: 20 }}>
      <h2>Create Prescription</h2>

      {/* Diagnosis */}
      <div style={{ marginBottom: 12 }}>
        <label>Diagnosis</label>
        <input
          value={diagnosis}
          onChange={(e) => setDiagnosis(e.target.value)}
          style={input}
        />
      </div>

      {/* Notes */}
      <div style={{ marginBottom: 12 }}>
        <label>Notes</label>
        <input
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          style={input}
        />
      </div>

      {/* Items */}
      <h3>Medicines</h3>

      {items.map((item, index) => (
        <div key={index} style={row}>
          <input
            placeholder="Medicine Name"
            value={item.name}
            onChange={(e) =>
              handleChange(index, "name", e.target.value)
            }
            style={input}
          />

          <input
            placeholder="Dosage (1-0-1)"
            value={item.dosage}
            onChange={(e) =>
              handleChange(index, "dosage", e.target.value)
            }
            style={input}
          />

          <input
            placeholder="Duration (5 days)"
            value={item.duration}
            onChange={(e) =>
              handleChange(index, "duration", e.target.value)
            }
            style={input}
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

/* ---------- STYLES ---------- */

const input = {
  padding: 10,
  border: "1px solid #ccc",
  borderRadius: 6,
  width: "100%",
};

const row = {
  display: "flex",
  gap: 10,
  marginBottom: 10,
};

const addBtn = {
  background: "#2563eb",
  color: "#fff",
  padding: "8px 12px",
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