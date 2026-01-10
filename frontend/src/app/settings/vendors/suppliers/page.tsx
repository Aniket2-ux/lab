"use client";
import { useEffect, useState } from "react";
import SupplierModal from "./SupplierModal";

export default function SupplierPage() {
  const [suppliers, setSuppliers] = useState([]);
  const [open, setOpen] = useState(false);

  const loadSuppliers = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/vendors/supplier/list`);
    const data = await res.json();
    setSuppliers(data.data);
  };

  useEffect(() => {
    loadSuppliers();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Suppliers</h2>

      <button onClick={() => setOpen(true)} className="btn-green">
        CREATE SUPPLIER
      </button>

      <table className="table">
        <thead>
          <tr>
            <th>SUPPLIER NAME</th>
            <th>PHONE</th>
            <th>EMAIL</th>
            <th>ADDRESS</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((s: any) => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.phone}</td>
              <td>{s.email}</td>
              <td>{s.address}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {open && <SupplierModal close={() => setOpen(false)} reload={loadSuppliers} />}
    </div>
  );
}
