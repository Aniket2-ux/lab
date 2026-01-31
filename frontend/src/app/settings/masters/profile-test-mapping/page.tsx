"use client";

import { useRouter } from "next/navigation";

export default function ProfileTestMappingPage() {
  const router = useRouter();

  return (
    <div style={{ padding: 24, width: "100%" }}>
      <div style={header}>
        <h2>Profile → Test Mapping</h2>

        <button
          onClick={() =>
            router.push("/settings/masters/profile-test-mapping/create")
          }
          style={createBtn}
        >
          MAP TESTS TO PROFILE
        </button>
      </div>

      <div style={box}>
        <p>No profile-test mappings created yet.</p>
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
