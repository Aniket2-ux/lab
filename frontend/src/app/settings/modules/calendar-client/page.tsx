"use client";

import SettingsSidebar from "@/components/settings/SettingsSidebar";

export default function CalendarClientSettingsPage() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* LEFT SETTINGS SIDEBAR */}
      <SettingsSidebar />

      {/* RIGHT CONTENT */}
      <main style={{ flex: 1, padding: 24 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600 }}>
          Calendar and Client Settings
        </h2>

        <p style={{ marginTop: 8, color: "#666" }}>
          Manage calendar and client configuration.
        </p>

        <div style={{ marginTop: 24 }}>
          <label>
            <input type="checkbox" /> Require Referrer
          </label>
        </div>

        <div style={{ marginTop: 12 }}>
          <label>
            <input type="checkbox" /> Allow Client Duplication
          </label>
        </div>

        <div style={{ marginTop: 12 }}>
          <label>
            <input type="checkbox" /> Require Email
          </label>
        </div>

        <div style={{ marginTop: 12 }}>
          <label>
            <input type="checkbox" /> Require Phone Number
          </label>
        </div>
      </main>
    </div>
  );
}
