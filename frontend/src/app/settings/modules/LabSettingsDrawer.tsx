"use client";

import { useState } from "react";

export default function LabSettingsDrawer({
  onClose,
}: {
  onClose: () => void;
}) {
  const [openLabTest, setOpenLabTest] = useState(false);

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
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <h3>Lab Settings</h3>
        <button onClick={onClose}>✕</button>
      </div>

      {/* General */}
      <h4>General</h4>
      <label>
        <input type="checkbox" defaultChecked /> Enable Test Creation From Bill
        Only
      </label>
      <br />
      <label>
        <input type="checkbox" defaultChecked /> Enable Additional Lab Data
      </label>
      <br />
      <label>
        <input type="checkbox" defaultChecked /> Enable Internal Stock
      </label>
      <br />
      <label>
        <input type="checkbox" defaultChecked /> Enable Extra Referrer
      </label>

      <hr style={{ margin: "16px 0" }} />

      {/* Manage lab */}
      <h4>Manage Lab Tests And Groups</h4>

      <button
        onClick={() => setOpenLabTest(true)}
        style={{
          width: "100%",
          padding: 10,
          marginBottom: 8,
          border: "1px solid #16a34a",
          background: "#fff",
          cursor: "pointer",
        }}
      >
        Create or Edit Lab Test
      </button>

      <button
        style={{
          width: "100%",
          padding: 10,
          border: "1px solid #e5e7eb",
          background: "#f9fafb",
        }}
      >
        Create or Edit Test Group
      </button>

      {/* Drawer inside drawer */}
      {openLabTest && (
        <LabTestDrawer onClose={() => setOpenLabTest(false)} />
      )}
    </div>
  );
}

/* ===============================
   LAB TEST CREATE / EDIT PANEL
================================ */
function LabTestDrawer({ onClose }: { onClose: () => void }) {
  return (
    <div
      style={{
        position: "fixed",
        right: 420,
        top: 0,
        bottom: 0,
        width: 480,
        background: "#fff",
        borderLeft: "1px solid #e5e7eb",
        padding: 20,
        zIndex: 60,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <h3>Lab Test Create / Edit</h3>
        <button onClick={onClose}>✕</button>
      </div>

      <label>Lab Test Name</label>
      <input
        style={{ width: "100%", padding: 8, marginBottom: 12 }}
        placeholder="Haemoglobin"
      />

      <label>Unit</label>
      <input
        style={{ width: "100%", padding: 8, marginBottom: 12 }}
        placeholder="g/dL"
      />

      <label>Normal Range</label>
      <input
        style={{ width: "100%", padding: 8, marginBottom: 12 }}
        placeholder="12 - 16"
      />

      <button
        style={{
          width: "100%",
          padding: 10,
          background: "#16a34a",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
      >
        Save Lab Test
      </button>
    </div>
  );
}
