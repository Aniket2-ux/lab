"use client";

import Tabs from "../_tabs";
import { box, input, button, table } from "../_styles";

export default function DepartmentPage() {
  return (
    <div style={box}>
      <Tabs />

      <h3 style={{ marginTop: 24 }}>Add New Department</h3>

      <div style={{ display: "flex", gap: 12 }}>
        <input placeholder="Department Name" style={input} />
        <input placeholder="Short Code" style={input} />
        <button style={button}>SAVE DEPARTMENT</button>
      </div>

      <table style={table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Short Code</th>
            <th />
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2761</td>
            <td>Patho</td>
            <td>PAT</td>
            <td>✏️ 🗑</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
