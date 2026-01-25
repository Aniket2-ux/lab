"use client";

import { useRouter } from "next/navigation";

export default function SupplierPage() {
  const router = useRouter();

  return (
    <div className="card">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Suppliers</h2>
        <button
          className="btn-primary"
          onClick={() => router.push("/settings/vendors/supplier/create")}
        >
          CREATE SUPPLIER
        </button>
      </div>

      <div style={{ marginTop: 24, color: "#777" }}>
        No suppliers found.
      </div>
    </div>
  );
}
