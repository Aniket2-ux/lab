"use client";

import { useState } from "react";

export default function BillingSettingsPage() {
  const [qrImage, setQrImage] = useState<string | null>(null);
  const [esewaId, setEsewaId] = useState("");
  const [esewaName, setEsewaName] = useState("");

  const handleQRCodeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setQrImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div style={container}>
      <h2 style={title}>Billing Settings</h2>

      {/* QR Upload Section */}
      <div style={sectionBox}>
        <label htmlFor="qrUpload" style={uploadButton}>
          Upload QR Code
        </label>

        <input
          id="qrUpload"
          type="file"
          accept="image/*"
          onChange={handleQRCodeUpload}
          style={{ display: "none" }}
        />

        {qrImage && (
          <div style={{ textAlign: "center", marginTop: 16 }}>
            <img
              src={qrImage}
              alt="QR Preview"
              style={{ width: 200, height: 200, objectFit: "contain" }}
            />
          </div>
        )}
      </div>

      {/* Divider */}
      <p style={dividerText}>Or Provide Credentials</p>

      {/* Esewa ID */}
      <InputField
        label="Esewa ID"
        value={esewaId}
        onChange={setEsewaId}
      />

      {/* Name */}
      <InputField
        label="Name"
        value={esewaName}
        onChange={setEsewaName}
      />

      {/* Footer Buttons */}
      <div style={footer}>
        <button style={cancelBtn}>Cancel</button>
        <button style={saveBtn}>Save</button>
      </div>
    </div>
  );
}

/* ---------------------- COMPONENTS ---------------------- */

function InputField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ fontSize: 13, fontWeight: 500 }}>{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={inputBox}
      />
    </div>
  );
}

/* ---------------------- STYLES ---------------------- */

const container: React.CSSProperties = {
  background: "#fff",
  padding: 24,
  borderRadius: 10,
  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  maxWidth: 600,
};

const title: React.CSSProperties = {
  marginBottom: 16,
  fontWeight: 600,
  fontSize: 20,
};

const sectionBox: React.CSSProperties = {
  padding: 20,
  border: "1px dashed #ccc",
  borderRadius: 8,
  textAlign: "center",
  marginBottom: 24,
};

const uploadButton: React.CSSProperties = {
  display: "inline-block",
  padding: "10px 16px",
  background: "#198754",
  color: "#fff",
  borderRadius: 8,
  cursor: "pointer",
  fontSize: 14,
};

const dividerText: React.CSSProperties = {
  textAlign: "center",
  margin: "20px 0",
  color: "#666",
  fontSize: 14,
};

const inputBox: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 8,
  border: "1px solid #ccc",
  marginTop: 6,
  fontSize: 14,
};

const footer: React.CSSProperties = {
  marginTop: 20,
  display: "flex",
  justifyContent: "flex-end",
  gap: 12,
};

const cancelBtn: React.CSSProperties = {
  padding: "10px 16px",
  background: "#ddd",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
};

const saveBtn: React.CSSProperties = {
  padding: "10px 16px",
  background: "#198754",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
};
