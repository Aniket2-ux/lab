"use client";

import { useState } from "react";
import LabSettingsDrawer from "./LabSettingsDrawer";

export default function ModulesPage() {
  const [openLab, setOpenLab] = useState(false);

  return (
    <div style={{ padding: 24, position: "relative" }}>
      <h2 style={{ marginBottom: 16 }}>Module Setting</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 16,
        }}
      >
        <Card title="Calendar and Client" />
        <Card title="OPD" />
        <Card title="Lab" onClick={() => setOpenLab(true)} />
        <Card title="Billing" />
        <Card title="Stock" />
        <Card title="IPD" />
        <Card title="HMIS" />
        <Card title="Medical" />
      </div>

      {openLab && <LabSettingsDrawer onClose={() => setOpenLab(false)} />}
    </div>
  );
}

function Card({
  title,
  onClick,
}: {
  title: string;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      style={{
        padding: 16,
        background: "#fff",
        border: "1px solid #e5e7eb",
        borderRadius: 10,
        cursor: onClick ? "pointer" : "default",
      }}
    >
      <div style={{ fontWeight: 600 }}>{title}</div>
      <div style={{ fontSize: 13, color: "#6b7280" }}>
        Manage {title} settings
      </div>
    </div>
  );
}
