"use client";

import { useRouter } from "next/navigation";

export default function TestMasterPage() {
  const router = useRouter();

  return (
    <div style={{ padding: 24, width: "100%" }}>
      <div style={header}>
        <h2>Tests / Investigations</h2>

        <button
          onClick={() =>
            router.push("/settings/masters/tests/create")
          }
          style={createBtn}
        >
          CREATE TEST
        </button>
      </div>

      <div style={box}>
        <p>No tests added yet.</p>
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
