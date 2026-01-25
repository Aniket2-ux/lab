"use client";

import { useRouter } from "next/navigation";

export default function AssociateCompaniesPage() {
  const router = useRouter();

  return (
    <div style={container}>
      <div style={header}>
        <h2>Associate Companies</h2>

        {/* ✅ CREATE COMPANY BUTTON */}
        <button
          style={createBtn}
          onClick={() =>
            router.push("/settings/vendors/associate-companies/create")
          }
        >
          CREATE COMPANY
        </button>
      </div>

      <table style={table}>
        <thead>
          <tr>
            <th>CREATED DATE</th>
            <th>COMPANY NAME</th>
            <th>DISCOUNT RATE</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2026-01-19</td>
            <td>GM DIAGNOSTIC LAB KALAIYA BRANCH</td>
            <td>70</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

/* ---------- styles ---------- */

const container = {
  background: "#fff",
  padding: 24,
  borderRadius: 12,
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 20,
};

const createBtn = {
  background: "#16a34a",
  color: "#fff",
  border: "none",
  padding: "10px 18px",
  borderRadius: 8,
  fontWeight: 600,
  cursor: "pointer",
};

const table = {
  width: "100%",
  borderCollapse: "collapse" as const,
};
