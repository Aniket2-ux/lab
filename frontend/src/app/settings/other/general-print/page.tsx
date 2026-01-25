"use client";

import Tabs from "../_tabs";
import { box, input, checkbox } from "../_styles";

export default function GeneralPrintPage() {
  return (
    <div style={box}>
      <Tabs />

      <div style={{ marginTop: 24, maxWidth: 500 }}>
        <label style={checkbox}>
          <input type="checkbox" defaultChecked />
          Centralized Header
        </label>

        <label style={checkbox}>
          <input type="checkbox" defaultChecked />
          Enable letterhead color
        </label>

        <input placeholder="Hex value" style={input} />

        <div style={{ marginTop: 16 }}>
          <div style={{ fontSize: 12 }}>
            Clinic Name Font Size Scale (0.5 – 2)
          </div>
          <input type="number" step="0.1" defaultValue={1.8} style={input} />
        </div>
      </div>
    </div>
  );
}
