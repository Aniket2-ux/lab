"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function OPDPage() {
  const params = useSearchParams();
  const router = useRouter();

  const clientId = params.get("clientId");
  const clientName = params.get("clientName");

  const [visits, setVisits] = useState([]);

  useEffect(() => {
    if (!clientId) return;

    fetch(`http://145.223.23.176:5000/api/visits/client/${clientId}`)
      .then((res) => res.json())
      .then((data) => setVisits(data))
      .catch(console.error);
  }, [clientId]);

  return (
    <div style={{ padding: 20 }}>
      <h2>OPD / {clientName}</h2>

      <button
        style={btn}
        onClick={() =>
          router.push(`/opd/create?clientId=${clientId}`)
        }
      >
        NEW OPD
      </button>

      <div style={{ marginTop: 20 }}>
        {visits.length === 0 ? (
          <p>No OPD records found.</p>
        ) : (
          visits.map((v: any) => (
            <div key={v.id} style={card}>
              <p>Visit ID: {v.id}</p>
              <p>Date: {new Date(v.createdAt).toLocaleString()}</p>

              <button
                style={smallBtn}
                onClick={() =>
                  router.push(
                    `/prescription/create?visitId=${v.id}&clientId=${clientId}`
                  )
                }
              >
                CREATE PRESCRIPTION
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const btn = {
  background: "#16a34a",
  color: "#fff",
  padding: "10px 16px",
  border: "none",
  borderRadius: 6,
};

const smallBtn = {
  marginTop: 10,
  background: "#2563eb",
  color: "#fff",
  padding: "6px 10px",
  border: "none",
  borderRadius: 6,
};

const card = {
  border: "1px solid #eee",
  padding: 12,
  borderRadius: 8,
  marginBottom: 10,
};