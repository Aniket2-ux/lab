"use client";

export default function ModuleCards({
  onOpenLab,
}: {
  onOpenLab: () => void;
}) {
  return (
    <div>
      <h2 style={{ marginBottom: 16 }}>Module Setting</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 16,
        }}
      >
        <Card title="Calendar and Client" desc="Manage calendar and client" />
        <Card title="OPD" desc="OPD print & vitals" />
        <Card
          title="Lab"
          desc="Create/edit lab groups and tests"
          onClick={onOpenLab}
        />
        <Card title="Billing" desc="Bill editor settings" />
        <Card title="Stock" desc="Stock product settings" />
        <Card title="IPD" desc="Beds & wards" />
        <Card title="HMIS" desc="HMIS settings" />
        <Card title="Medical" desc="Signature & print" />
      </div>
    </div>
  );
}

function Card({
  title,
  desc,
  onClick,
}: {
  title: string;
  desc: string;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      style={{
        padding: 16,
        borderRadius: 10,
        background: "#fff",
        border: "1px solid #e5e7eb",
        cursor: onClick ? "pointer" : "default",
      }}
    >
      <div style={{ fontWeight: 600 }}>{title}</div>
      <div style={{ fontSize: 13, color: "#6b7280", marginTop: 4 }}>
        {desc}
      </div>
    </div>
  );
}
