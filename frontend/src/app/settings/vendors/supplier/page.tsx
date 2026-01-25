"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";

export default function SupplierPage() {
  const router = useRouter();

  return (
    <div style={card}>
      <div style={header}>
        <h2>Suppliers</h2>
        <Button
          label="CREATE SUPPLIER"
          onClick={() => router.push("/settings/vendors/supplier/create")}
        />
      </div>

      <div style={{ color: "#777", marginTop: 40 }}>
        No suppliers found.
      </div>
    </div>
  );
}

const card = {
  background: "#fff",
  borderRadius: 10,
  padding: 24,
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};
