"use client";

import { useRouter } from "next/navigation";
import VendorTabs from "../_tabs";
import { box, header, input, button, table, th, td } from "../_styles";

export default function SupplierPage() {
  const router = useRouter();

  return (
    <div style={box}>
      <VendorTabs />

      <div style={header}>
        <h2 style={{ margin: 0 }}>Suppliers</h2>

        <div style={{ display: "flex", gap: 12 }}>
          <input placeholder="Search" style={input} />
          <button
            style={button}
            onClick={() => router.push("/settings/vendors/supplier/create")}
          >
            CREATE SUPPLIER
          </button>
        </div>
      </div>

      <table style={table}>
        <thead>
          <tr>
            <th style={th}>SUPPLIER NAME</th>
            <th style={th}>PHONE</th>
            <th style={th}>EMAIL</th>
            <th style={th}>ADDRESS</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={td} colSpan={4}>
              <div style={{ color: "#6b7280", padding: "40px 0" }}>
                No suppliers found
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
