"use client";
import { useState } from "react";

export default function SupplierModal({ close, reload }: any) {
  const [form, setForm] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
  });

  const handleSubmit = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/vendors/supplier/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    reload();
    close();
  };

  return (
    <div className="modal">
      <div className="modal-content">

        <h3>Create Supplier</h3>

        <input placeholder="Supplier Name" onChange={e => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Address" onChange={e => setForm({ ...form, address: e.target.value })} />
        <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
        <input placeholder="Phone" onChange={e => setForm({ ...form, phone: e.target.value })} />

        <div style={{ marginTop: 15 }}>
          <button className="btn-grey" onClick={close}>Cancel</button>
          <button className="btn-green" onClick={handleSubmit}>Create</button>
        </div>

      </div>
    </div>
  );
}
