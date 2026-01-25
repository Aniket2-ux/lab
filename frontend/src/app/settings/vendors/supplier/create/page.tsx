"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";

export default function CreateSupplierPage() {
  const router = useRouter();

  return (
    <div className="fixed inset-0 flex justify-end bg-black/20">
      <div className="w-[420px] bg-white h-full p-6 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">Create Supplier</h2>

        <div className="space-y-3">
          <input className="input" placeholder="Supplier Name" />
          <input className="input" placeholder="Address" />
          <input className="input" placeholder="Email" />
          <input className="input" placeholder="Phone" />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button
            variant="outline"
            onClick={() => router.back()}
          >
            CANCEL
          </Button>

          <Button>CREATE</Button>
        </div>
      </div>
    </div>
  );
}
