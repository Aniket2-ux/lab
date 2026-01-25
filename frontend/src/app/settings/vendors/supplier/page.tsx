"use client";

import { useRouter } from "next/navigation";

export default function SupplierPage() {
  const router = useRouter();

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <h2 style={{ fontSize: 20, fontWeight: 600 }}>Suppliers</h2>

        <button
          onClick={() =>
            router.push("/settings/vendors/supplier/create")
          }
          style={greenButton}
        >
          CREATE SUPPLIER
        </button>
      </div>

      <div
        style={{
          background: "#f9fafb",
          borderRadius: 8,
          padding: 32,
          color: "#6b7280",
        }}
      >
        No suppliers found.
      </div>
    </>
  );
}

const greenButton = {
  background: "#16a34a",
  color: "#fff",
  padding: "10px 16px",
  borderRadius: 6,
  border: "none",
  fontWeight: 600,
  cursor: "pointer",
};
