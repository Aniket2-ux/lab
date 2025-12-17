"use client";

import React, { useState } from "react";

/* ================== STYLES ================== */
const backdrop: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};

const modal: React.CSSProperties = {
  background: "#fff",
  padding: 20,
  borderRadius: 8,
  width: 520,
};

const formGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 12,
};

const label: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 600,
  marginBottom: 4,
  display: "block",
};

const input: React.CSSProperties = {
  width: "100%",
  padding: "6px 8px",
  borderRadius: 4,
  border: "1px solid #d1d5db",
};

const footer: React.CSSProperties = {
  display: "flex",
  justifyContent: "flex-end",
  gap: 10,
  marginTop: 20,
};

const cancelBtn: React.CSSProperties = {
  border: "none",
  background: "transparent",
  color: "#0b7a53",
  fontWeight: 600,
  cursor: "pointer",
};

const saveBtn: React.CSSProperties = {
  background: "#0b7a53",
  color: "#fff",
  border: "none",
  padding: "6px 14px",
  borderRadius: 4,
  fontWeight: 600,
  cursor: "pointer",
};

/* ================== TYPES ================== */
type Referrer = {
  id: string;
  name: string;
  rate?: number;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onReferrerCreated: (referrer: Referrer) => void;
};


/* ================== COMPONENT ================== */
export default function CreateReferrerModal({
  open,
  onClose,
  onReferrerCreated,
}: Props) {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [tds, setTds] = useState("");
  const [rate, setRate] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleSave = async () => {
  if (!name.trim()) {
    alert("Name is required");
    return;
  }

  const referrerObj = {
    id: `local-${Date.now()}`,
    name,
    mobile,
    email,
    address,
    tds,
    rate: Number(rate) || 0,
  };

  try {
    setLoading(true);

    const res = await fetch("http://localhost:5000/api/referrers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(referrerObj),
    });

    if (!res.ok) throw new Error();

    const data = await res.json();
    onReferrerCreated({
  id: data.id,
  name: data.name,
  rate: data.rate,
});

  } catch {
    // ✅ LOCAL STORAGE FALLBACK
    const raw = localStorage.getItem("okhati_referrers");
    const arr = raw ? JSON.parse(raw) : [];
    arr.unshift(referrerObj);
    localStorage.setItem("okhati_referrers", JSON.stringify(arr));

    onReferrerCreated(referrerObj.name);
  } finally {
    setLoading(false);
    onClose();
  }
};

  return (
    <div style={backdrop}>
      <div style={modal}>
        <h3 style={{ marginTop: 0, marginBottom: 16 }}>CREATE REFERRER</h3>

        <div style={formGrid}>
          <div>
            <label style={label}>Name *</label>
            <input style={input} value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div>
            <label style={label}>Mobile</label>
            <input style={input} value={mobile} onChange={(e) => setMobile(e.target.value)} />
          </div>

          <div>
            <label style={label}>Email</label>
            <input style={input} value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div>
            <label style={label}>Address</label>
            <input style={input} value={address} onChange={(e) => setAddress(e.target.value)} />
          </div>

          <div>
            <label style={label}>TDS %</label>
            <input type="number" style={input} value={tds} onChange={(e) => setTds(e.target.value)} />
          </div>

          <div>
            <label style={label}>Rate</label>
            <input type="number" style={input} value={rate} onChange={(e) => setRate(e.target.value)} />
          </div>
        </div>

        <div style={footer}>
          <button onClick={onClose} style={cancelBtn} disabled={loading}>
            CANCEL
          </button>
          <button onClick={handleSave} style={saveBtn} disabled={loading}>
            {loading ? "SAVING..." : "SAVE"}
          </button>
        </div>
      </div>
    </div>
  );
}
