"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";

export default function SupplierPage() {
  const router = useRouter();

  return (
    <div className="bg-white rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Suppliers</h2>

        <Button onClick={() => router.push("/settings/vendors/supplier/create")}>
          CREATE SUPPLIER
        </Button>
      </div>

      <div className="text-sm text-gray-500">
        No suppliers found.
      </div>
    </div>
  );
}
