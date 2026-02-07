"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { API_BASE } from "@/lib/apiBase";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${API_BASE}/api/profiles`)
      .then((r) => r.json())
      .then(setData);
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <div style={header}>
        <h2>Profiles / Packages</h2>
        <button
          style={createBtn}
          onClick={() =>
            router.push("/settings/masters/profiles/create")
          }
        >
          CREATE PROFILE
        </button>
      </div>

      <table style={table}>
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Tests</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {data.map((p) => (
            <tr key={p.id}>
              <td>{p.code}</td>
              <td>{p.name}</td>
              <td>{p.Tests?.map((t:any)=>t.code).join(", ")}</td>
              <td>{p.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
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
  padding: "10px 16px",
  border: "none",
  borderRadius: 6,
};

const table = {
  width: "100%",
  borderCollapse: "collapse" as const,
};
