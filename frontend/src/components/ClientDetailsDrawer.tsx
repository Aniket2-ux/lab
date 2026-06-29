"use client";

import { useEffect, useState } from "react";

type Client = {
  id: number;
  name: string;
};

type Visit = {
  id: number;
  createdAt: string;
};

type Prescription = {
  id: number;
  createdAt: string;
  items: {
    name: string;
    dosage: string;
    duration: string;
  }[];
};

export default function ClientDetailsDrawer({
  client,
  onClose,
}: {
  client: Client;
  onClose: () => void;
}) {
  const [visits, setVisits] = useState<Visit[]>([]);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [selectedVisit, setSelectedVisit] = useState<number | null>(null);

  /* ---------- FETCH VISITS ---------- */
  useEffect(() => {
    fetch(`http://145.223.23.176:5000/api/visits/client/${client.id}`)
      .then((res) => res.json())
      .then(setVisits);
  }, [client.id]);

  /* ---------- FETCH PRESCRIPTIONS ---------- */
  useEffect(() => {
    if (!selectedVisit) return;

    fetch(
      `http://145.223.23.176:5000/api/prescriptions/visit/${selectedVisit}`
    )
      .then((res) => res.json())
      .then(setPrescriptions);
  }, [selectedVisit]);

  return (
    <div style={drawer}>
      <h2>{client.name}</h2>

      <button onClick={onClose} style={closeBtn}>
        Close
      </button>

      {/* Visits */}
      <h3>Visits</h3>

      {visits.map((v) => (
        <div
          key={v.id}
          style={visitCard}
          onClick={() => setSelectedVisit(v.id)}
        >
          Visit ID: {v.id}
        </div>
      ))}

      {/* Prescriptions */}
      <h3 style={{ marginTop: 20 }}>Prescriptions</h3>

      {prescriptions.map((p) => (
        <div key={p.id} style={prescriptionCard}>
          <p>
            <b>Date:</b> {new Date(p.createdAt).toLocaleString()}
          </p>

          <ul>
            {p.items.map((item, i) => (
              <li key={i}>
                {item.name} — {item.dosage} — {item.duration}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/* ---------- STYLES ---------- */

const drawer = {
  position: "fixed" as const,
  right: 0,
  top: 0,
  width: 400,
  height: "100%",
  background: "#fff",
  padding: 20,
  borderLeft: "1px solid #ccc",
  overflowY: "auto" as const,
};

const closeBtn = {
  background: "#dc2626",
  color: "#fff",
  padding: "6px 10px",
  border: "none",
  borderRadius: 6,
  marginBottom: 10,
};

const visitCard = {
  padding: 10,
  border: "1px solid #ccc",
  marginBottom: 8,
  cursor: "pointer",
};

const prescriptionCard = {
  padding: 10,
  border: "1px solid #ddd",
  marginBottom: 10,
  borderRadius: 6,
};