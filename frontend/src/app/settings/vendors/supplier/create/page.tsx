"use client";

import { useRouter } from "next/navigation";
import { drawer, input, button } from "../../_styles";

export default function CreateSupplierPage() {
  const router = useRouter();

  return (
    <div style={drawer}>
      <h2>Create Supplier</h2>

      <Input label="Supplier Name*" />
      <Input label="Address" />
      <Input label="Email" />
      <Input label="Phone" prefix="+977" />
      <Input label="Landline" />
      <Input label="PAN No." />
      <Textarea label="Details" />

      <h4 style={{ marginTop: 24 }}>Account Information</h4>
      <Input label="Opening Balance" defaultValue="0" />
      <Input label="Type" defaultValue="Credit" />
      <Input label="Opening Balance Date" />

      <h4 style={{ marginTop: 24 }}>Bank Information</h4>
      <Input label="Name of Beneficiary" />
      <Input label="Bank Name" />
      <Input label="Bank Branch" />
      <Input label="Bank Account Number" />
      <Input label="Account Type" />
      <Input label="IFSC Code" />
      <Input label="Swift Code" />

      <div style={{ marginTop: 30, display: "flex", gap: 12 }}>
        <button onClick={() => router.back()}>CANCEL</button>
        <button style={button}>CREATE</button>
      </div>
    </div>
  );
}

/* helpers */
function Input({ label, prefix, defaultValue }: any) {
  return (
    <div style={{ marginTop: 12 }}>
      <div style={{ fontSize: 12 }}>{label}</div>
      <div style={{ display: "flex", gap: 6 }}>
        {prefix && <span>{prefix}</span>}
        <input defaultValue={defaultValue} style={{ ...input, width: "100%" }} />
      </div>
    </div>
  );
}

function Textarea({ label }: any) {
  return (
    <div style={{ marginTop: 12 }}>
      <div style={{ fontSize: 12 }}>{label}</div>
      <textarea style={{ width: "100%", height: 80, padding: 8 }} />
    </div>
  );
}
