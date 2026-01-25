import Link from "next/link";

export default function SupplierPage() {
  return (
    <div style={{ background: "#fff", padding: 24, borderRadius: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Suppliers</h2>

        <Link href="/settings/vendors/supplier/create">
          <button
            style={{
              background: "#16a34a",
              color: "#fff",
              padding: "10px 16px",
              borderRadius: 6,
              fontWeight: 600,
            }}
          >
            CREATE SUPPLIER
          </button>
        </Link>
      </div>

      <div style={{ marginTop: 24, color: "#666" }}>
        No suppliers found.
      </div>
    </div>
  );
}
