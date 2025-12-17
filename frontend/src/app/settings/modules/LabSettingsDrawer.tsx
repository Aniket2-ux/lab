"use client";

export default function LabSettingsDrawer({
  onClose,
}: {
  onClose: () => void;
}) {
  return (
    <div
      style={{
        position: "fixed",
        right: 0,
        top: 0,
        bottom: 0,
        width: 420,
        background: "#fff",
        borderLeft: "1px solid #e5e7eb",
        padding: 20,
        overflowY: "auto",
        zIndex: 50,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3>Lab Settings</h3>
        <button onClick={onClose} style={closeBtn}>×</button>
      </div>

      <Section title="General">
        <Check label="Enable Test Creation From Bill Only" />
        <Check label="Enable Additional Lab Data" />
        <Check label="Enable Internal Stock" />
        <Check label="Enable Extra Referrer" />

        <label style={label}>Accessing Resource Centre</label>
        <select style={input}>
          <option>Type accessing labs</option>
        </select>

        <Dropdown label="Lab Test Number Settings" />
      </Section>

      <Section title="Manage Lab Tests And Groups">
        <div style={{ display: "flex", gap: 10 }}>
          <Button>Create or Edit Lab Test</Button>
          <Button>Create or Edit Test Group</Button>
        </div>
      </Section>

      <Section title="Lab Print">
        <Dropdown label="Print Header" />
        <Dropdown label="Print body" />
        <Dropdown label="Print footer" />
      </Section>
    </div>
  );
}

/* ---------- UI ---------- */

function Section({ title, children }: any) {
  return (
    <div style={{ marginTop: 20 }}>
      <h4>{title}</h4>
      {children}
    </div>
  );
}

function Check({ label }: { label: string }) {
  return (
    <label style={{ display: "flex", gap: 8, marginBottom: 8 }}>
      <input type="checkbox" defaultChecked />
      {label}
    </label>
  );
}

function Dropdown({ label }: { label: string }) {
  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: 6,
        padding: "10px 12px",
        marginTop: 10,
        cursor: "pointer",
      }}
    >
      {label}
    </div>
  );
}

function Button({ children }: any) {
  return (
    <button
      style={{
        padding: "8px 14px",
        border: "1px solid #d1d5db",
        background: "#fff",
        borderRadius: 6,
        cursor: "pointer",
        fontWeight: 500,
      }}
    >
      {children}
    </button>
  );
}

const input = {
  width: "100%",
  padding: "8px",
  borderRadius: 6,
  border: "1px solid #d1d5db",
};

const label = { fontSize: 12, color: "#6b7280", marginTop: 10 };

const closeBtn = {
  fontSize: 22,
  background: "transparent",
  border: "none",
  cursor: "pointer",
};
