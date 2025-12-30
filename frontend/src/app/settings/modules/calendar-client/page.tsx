"use client";

export default function CalendarClientSettingsPage() {
  return (
    <div>
      {/* Page Header */}
      <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 6 }}>
        Calendar and Client Settings
      </h2>
      <p style={{ color: "#666", marginBottom: 24 }}>
        Manage calendar and client configuration.
      </p>

      {/* CARD */}
      <div
        style={{
          background: "#fff",
          borderRadius: 8,
          padding: 20,
          maxWidth: 700,
          boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
        }}
      >
        {/* Calendar Section */}
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>
          Calendar
        </h3>

        <label style={{ display: "block", marginBottom: 8 }}>
          <input type="checkbox" /> Require Referrer
        </label>

        <hr style={{ margin: "16px 0" }} />

        {/* Client Section */}
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>
          Client
        </h3>

        <label style={{ display: "block", marginBottom: 8 }}>
          <input type="checkbox" defaultChecked /> Allow Client Duplication
        </label>

        <label style={{ display: "block", marginBottom: 8 }}>
          <input type="checkbox" /> Require Email
        </label>

        <label style={{ display: "block", marginBottom: 8 }}>
          <input type="checkbox" /> Require Phone Number
        </label>

        <label style={{ display: "block", marginBottom: 8 }}>
          <input type="checkbox" /> Require Date of Birth
        </label>
      </div>
    </div>
  );
}
