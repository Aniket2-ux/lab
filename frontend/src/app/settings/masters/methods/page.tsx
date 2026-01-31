"use client";

import { useRouter } from "next/navigation";

export default function MethodPage() {
  const router = useRouter();

  return (
    <div style={{ padding: 24, width: "100%" }}>
      <div style={header}>
        <h2>Methods / Machines</h2>

        <button
          onClick={() =>
            router.push("/settings/masters/methods/create")
          }
          style={createBtn}
        >
          CREATE METHOD
        </button>
      </div>

      <div style={box}>
        <p>No methods added yet.</p>
      </div>
    </div>
  );
}

/* ---------- styles ---------- */

const header = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: 16,
};

const createBtn = {
  background: "#16a34a",
  color: "#fff",
  border: "none",
  padding: "10px 16px",
  borderRadius: 6,
  fontWeight: 600,
  cursor: "pointer",
};

const box = {
  background: "#fff",
  padding: 16,
  borderRadius: 8,
};
