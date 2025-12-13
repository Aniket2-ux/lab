"use client";

export default function CompanyProfilePage() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <img
            src="/logo.png"
            alt="Logo"
            style={{ width: 64, height: 64, borderRadius: "50%", border: "1px solid #e5e7eb" }}
          />
          <h2 style={{ margin: 0 }}>GM Diagnostic Lab</h2>
        </div>

        <button
          style={{
            border: "none",
            background: "transparent",
            color: "#0b7a53",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          ✏️ EDIT
        </button>
      </div>

      <div style={{ marginTop: 24, display: "grid", gridTemplateColumns: "200px 1fr", rowGap: 12 }}>
        <LabelValue label="Short Name" value="GMDL" />
        <LabelValue label="City" value="Bharatpur, Chitwan" />
        <LabelValue label="Address" value="Buddha chowk" />
        <LabelValue label="Email" value="gmdiagnosticlaboratory@gmail.com" />
        <LabelValue label="Owner's email" value="sahm27278@gmail.com" />
        <LabelValue label="Landline number" value="056-494354" />
        <LabelValue label="Mobile Number" value="+9779845988996" />
        <LabelValue label="Owner's number" value="+9779845988996" />
        <LabelValue label="Optional Phone" value="+9779761894416" />
        <LabelValue label="Registration Number" value="326540/080/081" />
      </div>
    </div>
  );
}

function LabelValue({ label, value }: { label: string; value: string }) {
  return (
    <>
      <div style={{ color: "#6b7280", fontSize: 13 }}>{label}</div>
      <div style={{ fontSize: 14, fontWeight: 500 }}>{value}</div>
    </>
  );
}
