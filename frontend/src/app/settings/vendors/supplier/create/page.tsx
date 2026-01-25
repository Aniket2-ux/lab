"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";

export default function CreateSupplier() {
  const router = useRouter();

  return (
    <div style={drawer}>
      <h3>Create Supplier</h3>

      <input placeholder="Supplier Name" style={input} />
      <input placeholder="Address" style={input} />
      <input placeholder="Email" style={input} />
      <input placeholder="Phone" style={input} />

      <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
        <Button label="CANCEL" variant="secondary" onClick={() => router.back()} />
        <Button label="CREATE" />
      </div>
    </div>
  );
}

const drawer = {
  position: "fixed" as const,
  right: 0,
  top: 0,
  bottom: 0,
  width: 460,
  background: "#fff",
  padding: 24,
  boxShadow: "-10px 0 30px rgba(0,0,0,0.15)",
};

const input = {
  width: "100%",
  padding: 10,
  marginTop: 12,
};
