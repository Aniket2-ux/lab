"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import VendorForm from "../../components/VendorForm";

export default function CreateSupplier() {
  const router = useRouter();
  const handleSave = (data: any) => {
    const saved = localStorage.getItem("suppliers");
    const list = saved ? JSON.parse(saved) : [];
    list.push(data);
    localStorage.setItem("suppliers", JSON.stringify(list));
    router.push("/settings/vendors/suppliers");
  };

  return (
    <VendorForm title="Create Supplier" onSubmit={handleSave} />
  );
}
