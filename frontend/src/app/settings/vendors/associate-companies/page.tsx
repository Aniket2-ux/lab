"use client";

import { useRouter } from "next/navigation";
import VendorTabs from "../_tabs";
import { box, header, input, button, table, th, td } from "../_styles";

export default function AssociateCompaniesPage() {
  const router = useRouter();

  return (
    <div style={box}>
      <VendorTabs />

      <div style={header}>
        <h2>Associate Companies</h2>
        <div style={{ display: "flex", gap: 12 }}>
          <input placeholder="Search" style={input} />
          <button
            style={button}
            onClick={() =>
              router.push("/settings/vendors/associate-companies/create")
            }
          >
            CREATE COMPANY
          </button>
        </div>
      </div>

      <table style={table}>
        <thead>
          <tr>
            <th style={th}>CREATED DATE</th>
            <th style={th}>COMPANY NAME</th>
            <th style={th}>DISCOUNT RATE</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={3} style={td}>
              No associate companies found
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
