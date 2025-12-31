"use client";

import { useEffect, useState } from "react";
import { API_BASE } from "@/lib/apiBase";

type Doctor = {
  id: number;
  name: string;
};

export default function DoctorSelect({
  value,
  onChange,
}: {
  value: Doctor | null;
  onChange: (d: Doctor) => void;
}) {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE}/api/doctors`)
      .then((r) => r.json())
      .then(setDoctors);
  }, []);

  const filtered = doctors.filter((d) =>
    d.name.toLowerCase().includes(input.toLowerCase())
  );

  async function createDoctor() {
    const res = await fetch(`${API_BASE}/api/doctors`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: input }),
    });

    const doctor = await res.json();
    setDoctors([...doctors, doctor]);
    onChange(doctor);
    setInput("");
    setOpen(false);
  }

  return (
    <div style={{ position: "relative" }}>
      <input
        placeholder="Referrer / Doctor"
        value={value?.name || input}
        onChange={(e) => {
          setInput(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
      />

      {open && (
        <div className="dropdown">
          {filtered.map((d) => (
            <div
              key={d.id}
              className="option"
              onClick={() => {
                onChange(d);
                setOpen(false);
                setInput("");
              }}
            >
              {d.name}
            </div>
          ))}

          {input && filtered.length === 0 && (
            <div className="option add" onClick={createDoctor}>
              ➕ Add “{input}”
            </div>
          )}
        </div>
      )}

      <style jsx>{`
        .dropdown {
          position: absolute;
          width: 100%;
          background: #fff;
          border: 1px solid #ddd;
          border-radius: 8px;
          margin-top: 4px;
          z-index: 10;
        }

        .option {
          padding: 10px;
          cursor: pointer;
        }

        .option:hover {
          background: #f2f2f2;
        }

        .add {
          font-weight: 600;
          color: #00854b;
        }
      `}</style>
    </div>
  );
}
