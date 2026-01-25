"use client";

import Tabs from "../_tabs";
import { box, input } from "../_styles";

export default function ServiceTypePage() {
  return (
    <div style={box}>
      <Tabs />

      <h3 style={{ marginTop: 24 }}>Service Types</h3>

      <label style={{ fontSize: 12 }}>Create Custom Service Types</label>
      <select style={input}>
        <option>Service Type</option>
        <option>Lab</option>
        <option>OPD</option>
      </select>
    </div>
  );
}
