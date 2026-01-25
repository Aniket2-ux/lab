"use client";

import Tabs from "../_tabs";
import { box, input, button, checkbox } from "../_styles";

export default function SurveyFormPage() {
  return (
    <div style={box}>
      <Tabs />

      <h3 style={{ marginTop: 24 }}>Default Questions</h3>

      <label style={checkbox}>
        <input type="checkbox" defaultChecked />
        How did you hear about us?
      </label>

      <label style={checkbox}>
        <input type="checkbox" defaultChecked />
        Have you tried anything in the past?
      </label>

      <h4 style={{ marginTop: 20 }}>Custom Questions</h4>

      <input placeholder="Enter your question" style={input} />
      <select style={input}>
        <option>Yes / No</option>
        <option>Text</option>
      </select>

      <button style={{ ...button, marginTop: 12 }}>ADD</button>
    </div>
  );
}
