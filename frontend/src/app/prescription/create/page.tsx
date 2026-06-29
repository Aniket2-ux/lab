"use client";

import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

type Item = {
  name: string;
  dosage: string;
  duration: string;
};

function PrescriptionForm() {
  const params = useSearchParams();
  const router = useRouter();

  const visitId = params.get("visitId");
  const clientId = params.get("clientId");

  const [diagnosis, setDiagnosis] = useState("");
  const [notes, setNotes] = useState("");

  const [items, setItems] = useState<Item[]>([
    {
      name: "",
      dosage: "",
      duration: "",
    },
  ]);

  const handleAddRow = () => {
    setItems([
      ...items,
      {
        name: "",
        dosage: "",
        duration: "",
      },
    ]);
  };

  const handleRemoveRow = (index: number) => {
    const updated = [...items];
    updated.splice(index, 1);
    setItems(updated);
  };

  const handleChange = (
    index: number,
    field: keyof Item,
    value: string
  ) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

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
        alert("Prescription created");
        router.push(`/opd?clientId=${clientId}`);
      } else {
        alert("Failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 900, margin: "0 auto" }}>
      <h2>Create Prescription</h2>

      <div style={card}>
        <label style={label}>Diagnosis</label>
        <input
          value={diagnosis}
          onChange={(e) => setDiagnosis(e.target.value)}
          style={input}
        />
      </div>

      <div style={card}>
        <label style={label}>Notes</label>
        <input
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          style={input}
        />
      </div>

      <div style={card}>
        <h3>Medicines</h3>

        <table style={table}>
          <thead>
            <tr>
              <th style={th}>Medicine</th>
              <th style={th}>Dosage</th>
              <th style={th}>Duration</th>
              <th style={th}>Action</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>
                  <input
                    style={input}
                    value={item.name}
                    onChange={(e) =>
                      handleChange(index, "name", e.target.value)
                    }
                  />
                </td>

                <td>
                  <input
                    style={input}
                    value={item.dosage}
                    onChange={(e) =>
                      handleChange(index, "dosage", e.target.value)
                    }
                  />
                </td>

                <td>
                  <input
                    style={input}
                    value={item.duration}
                    onChange={(e) =>
                      handleChange(index, "duration", e.target.value)
                    }
                  />
                </td>

                <td>
                  <button
                    style={deleteBtn}
                    onClick={() => handleRemoveRow(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button style={addBtn} onClick={handleAddRow}>
          + Add Medicine
        </button>
      </div>

      <button style={saveBtn} onClick={handleSave}>
        SAVE PRESCRIPTION
      </button>
    </div>
  );
}

export default function CreatePrescription() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PrescriptionForm />
    </Suspense>
  );
}

const card = {
  marginBottom: 16,
  padding: 16,
  border: "1px solid #e5e7eb",
  borderRadius: 10,
  background: "#fff",
};

const label = {
  display: "block",
  marginBottom: 6,
  fontWeight: 500,
};

const input = {
  padding: 8,
  border: "1px solid #ccc",
  borderRadius: 6,
  width: "100%",
};

const table = {
  width: "100%",
  borderCollapse: "collapse" as const,
  marginBottom: 10,
};

const th = {
  padding: 8,
  border: "1px solid #e5e7eb",
  textAlign: "left" as const,
};

const addBtn = {
  background: "#2563eb",
  color: "#fff",
  padding: "8px 12px",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
};

const deleteBtn = {
  background: "#dc2626",
  color: "#fff",
  padding: "6px 10px",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
};

const saveBtn = {
  background: "#16a34a",
  color: "#fff",
  padding: "12px 18px",
  border: "none",
  borderRadius: 8,
  cursor: "pointer",
  width: "100%",
  fontSize: 16,
};