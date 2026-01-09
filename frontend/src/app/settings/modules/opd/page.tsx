"use client";

import { useState } from "react";

export default function OpdSettingsPage() {
  const [showRemarks, setShowRemarks] = useState(false);
  const [headerImage, setHeaderImage] = useState<string | null>(null);

  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (r) => setHeaderImage(r.target?.result as string);
      reader.readAsDataURL(file);
    }
  }

  return (
    <div style={container}>
      <h2 style={{ marginBottom: 10 }}>OPD Settings</h2>

      {/* PRINT SECTION */}
      <div style={section}>
        <h3 style={sectionTitle}>Print</h3>

        {/* Checkbox options */}
        <div style={checkboxWrap}>
          <label style={checkboxItem}>
            <input type="checkbox" defaultChecked /> Include Letterhead
          </label>

          <label style={checkboxItem}>
            <input type="checkbox" defaultChecked /> Include footer
          </label>

          <label style={checkboxItem}>
            <input
              type="checkbox"
              checked={showRemarks}
              onChange={() => setShowRemarks(!showRemarks)}
            />
            Show Prescription Remarks
          </label>
        </div>

        {/* Custom Header Upload */}
        <p style={{ fontSize: 13, color: "#777", marginTop: 10 }}>
          Custom Print Header (800px × 100px)
        </p>
        <p style={{ fontSize: 12, color: "#777", marginBottom: 10 }}>
          This image will appear at the top of all prescriptions (Except doctor print)
        </p>

        <div style={uploadBox}>
          {!headerImage ? (
            <>
              <label htmlFor="headerUpload" style={uploadButton}>
                UPLOAD CUSTOM HEADER
              </label>
              <input
                id="headerUpload"
                type="file"
                accept="image/*"
                onChange={handleUpload}
                style={{ display: "none" }}
              />
            </>
          ) : (
            <img
              src={headerImage}
              alt="Header"
              style={{ maxWidth: "100%", maxHeight: 100 }}
            />
          )}
        </div>
      </div>

      {/* FOOTER BUTTONS */}
      <div style={footer}>
        <button style={cancelBtn}>Cancel</button>
        <button style={saveBtn}>Save</button>
      </div>
    </div>
  );
}

/* ========== STYLES ========== */

const container: React.CSSProperties = {
  background: "#fff",
  padding: 24,
  borderRadius: 10,
  maxWidth: 900,
  margin: "auto",
  boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
};

const section: React.CSSProperties = {
  marginTop: 20,
  paddingBottom: 20,
  borderBottom: "1px solid #eee",
};

const sectionTitle: React.CSSProperties = {
  fontSize: 16,
  fontWeight: 600,
  marginBottom: 14,
};

const checkboxWrap: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 10,
};

const checkboxItem: React.CSSProperties = {
  fontSize: 14,
  display: "flex",
  alignItems: "center",
  gap: 8,
};

const uploadBox: React.CSSProperties = {
  border: "1px dashed #aaa",
  borderRadius: 8,
  padding: 20,
  marginTop: 16,
  textAlign: "center",
  minHeight: 120,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
};

const uploadButton: React.CSSProperties = {
  padding: "10px 16px",
  background: "#198754",
  color: "#fff",
  borderRadius: 6,
  cursor: "pointer",
  fontSize: 14,
};

const footer: React.CSSProperties = {
  display: "flex",
  justifyContent: "flex-end",
  gap: 12,
  marginTop: 30,
};

const cancelBtn: React.CSSProperties = {
  padding: "10px 16px",
  background: "#ddd",
  borderRadius: 6,
  cursor: "pointer",
  border: "none",
};

const saveBtn: React.CSSProperties = {
  padding: "10px 16px",
  background: "#198754",
  color: "#fff",
  borderRadius: 6,
  cursor: "pointer",
  border: "none",
};
