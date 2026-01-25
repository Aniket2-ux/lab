"use client";

import { useRouter } from "next/navigation";

export default function CreateSupplierDrawer() {
  const router = useRouter();

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3>Create Supplier</h3>
        <button onClick={() => router.back()}>✕</button>
      </div>

      <input placeholder="Supplier Name" />
      <input placeholder="Address" />
      <input placeholder="Email" />
      <input placeholder="Phone" />

      <div style={{ marginTop: 24, display: "flex", gap: 12 }}>
        <button onClick={() => router.back()}>CANCEL</button>
        <button className="btn-primary">CREATE</button>
      </div>
    </>
  );
}
