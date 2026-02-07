"use client";

import { useRouter } from "next/navigation";

export default function OPDPage() {
  const router = useRouter();

  return (
    <div style={{ padding: 24, width: "100%" }}>
      <div style={header}>
        <h2>OPD / Patient Registration</h2>

        <button
          onClick={() => router.push("/opd/create")}
          style={createBtn}
        >
          NEW OPD
        </button>
      </div>

      <div style={box}>
        <p>No OPD records found.</p>
      </div>
    </div>
  );
}

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
