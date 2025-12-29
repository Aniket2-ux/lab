"use client";

export default function CalendarClientSettingsPage() {
  return (
    <div style={{ padding: 24, maxWidth: 900 }}>
      <h2>Calendar and Client Settings</h2>

      <section style={{ marginTop: 24 }}>
        <h3>Calendar</h3>

        <label style={{ display: "block", marginTop: 12 }}>
          <input type="radio" name="view" defaultChecked /> Monthly
        </label>

        <label style={{ display: "block", marginTop: 8 }}>
          <input type="radio" name="view" /> List
        </label>

        <label style={{ display: "block", marginTop: 12 }}>
          <input type="checkbox" defaultChecked /> Require Referrer
        </label>
      </section>

      <section style={{ marginTop: 32 }}>
        <h3>Client</h3>

        <label style={{ display: "block", marginTop: 8 }}>
          <input type="checkbox" defaultChecked /> Allow Client Duplication
        </label>

        <label style={{ display: "block", marginTop: 8 }}>
          <input type="checkbox" /> Require Email
        </label>

        <label style={{ display: "block", marginTop: 8 }}>
          <input type="checkbox" /> Require Date of Birth
        </label>

        <label style={{ display: "block", marginTop: 8 }}>
          <input type="checkbox" /> Require Phone Number
        </label>
      </section>
    </div>
  );
}
