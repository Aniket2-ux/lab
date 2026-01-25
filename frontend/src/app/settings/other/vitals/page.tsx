"use client";

import Tabs from "../_tabs";
import { box, grid3, checkbox } from "../_styles";

const vitals = [
  "Blood Pressure",
  "Height",
  "Weight",
  "Pulse",
  "Temperature",
  "SPO2",
  "BMI",
  "Respiration",
];

export default function VitalsPage() {
  return (
    <div style={box}>
      <Tabs />

      <div style={{ marginTop: 24, ...grid3 }}>
        {vitals.map((v) => (
          <label key={v} style={checkbox}>
            <input type="checkbox" defaultChecked />
            {v}
          </label>
        ))}
      </div>
    </div>
  );
}
