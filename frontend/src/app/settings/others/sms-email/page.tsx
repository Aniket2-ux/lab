"use client";

import Tabs from "../_tabs";
import { box, checkbox, twoCol } from "../_styles";

export default function SmsEmailPage() {
  return (
    <div style={box}>
      <Tabs />

      <div style={{ marginTop: 24, ...twoCol }}>
        <Section title="Send SMS For" />
        <Section title="Send Email For" />
      </div>
    </div>
  );
}

function Section({ title }: { title: string }) {
  return (
    <div>
      <h4>{title}</h4>
      <label style={checkbox}><input type="checkbox" /> On booking creation</label>
      <label style={checkbox}><input type="checkbox" /> On booking confirmation</label>
      <label style={checkbox}><input type="checkbox" /> On booking cancellation</label>
    </div>
  );
}
