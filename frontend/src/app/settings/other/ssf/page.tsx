"use client";

import Tabs from "../_tabs";
import { box, input, button } from "../_styles";

export default function SsfPage() {
  return (
    <div style={box}>
      <Tabs />

      <h3 style={{ marginTop: 24 }}>Ssf Settings (Provided by SSF)</h3>

      <input placeholder="Practitioner ID" style={input} />
      <input placeholder="Practitioner Role" style={input} />
      <input placeholder="Location / Facility" style={input} />

      <button style={{ ...button, marginTop: 12 }}>SAVE</button>
    </div>
  );
}
