"use client";

import { useRouter } from "next/navigation";

export default function SupplierPage() {
  const router = useRouter();

  return (
    <div style={container}>
      <div style={header}>
        <h2>Suppliers</h2>

        {/* ✅ FIXED CREATE BUTTON */}
        <button
          style={createBtn}
          onClick={() => router.push("/settings/vendors/supplier/create")}
        >
          CREATE SUPPLIER
        </button>
      </div>

      <div style={emptyBox}>
        No suppliers found.
      </div>
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
  marginBottom: 16,
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

const emptyBox = {
  padding: 24,
  color: "#6b7280",
};
