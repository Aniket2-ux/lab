// frontend/src/components/CreateClientDrawer.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5000";

type Props = {
  onClose: () => void;
  onCreated?: (client: any) => void; // optional
  initialName?: string;
};

export default function CreateClientDrawer({ onClose, onCreated, initialName = "" }: Props) {
  const router = useRouter();

  const [fullName, setFullName] = useState(initialName);
  const [age, setAge] = useState<number | "">("");
  const [gender, setGender] = useState<string | "">("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCreate() {
    setError(null);
    if (!fullName.trim()) {
      setError("Name is required");
      return;
    }
    setLoading(true);
    try {
      const payload = {
        fullName: fullName.trim(),
        age: age === "" ? null : Number(age),
        gender: gender || null,
        phone: phone || null,
      };

      const res = await fetch(`${API_BASE}/api/clients`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const txt = await res.text().catch(() => "");
        throw new Error(txt || `HTTP ${res.status}`);
      }

      const created = await res.json();

      // call parent callback (if present)
      if (onCreated) onCreated(created);

      // Close drawer then navigate to billing page with newClientId query param
      onClose();

      // if server returned id, pass it in query so billing picks it up
      const createdId = (created && (created.id ?? created._id)) || null;
      if (createdId) {
        // push to billing with param so billing preselects
        router.push(`/billing?newClientId=${encodeURIComponent(String(createdId))}`);
      } else {
        // fallback: just go to billing
        router.push("/billing");
      }
    } catch (e: any) {
      console.error("Create client failed", e);
      setError(e?.message || "Failed to create client");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 80, background: "rgba(0,0,0,0.35)", display: "flex", justifyContent: "flex-end" }}>
      <div style={{ width: 420, maxWidth: "100%", background: "#fff", padding: 20, height: "100%", overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ margin: 0 }}>Create Client</h3>
          <button onClick={onClose} aria-label="Close" style={{ border: "none", background: "transparent", fontSize: 20, cursor: "pointer" }}>×</button>
        </div>

        <div style={{ marginTop: 12 }}>
          <label style={{ fontSize: 13, fontWeight: 600 }}>Full name</label>
          <input value={fullName} onChange={(e) => setFullName(e.target.value)} style={inputStyle} placeholder="Client full name" />
        </div>

        <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>Age</label>
            <input value={age === "" ? "" : String(age)} onChange={(e) => setAge(e.target.value === "" ? "" : Number(e.target.value))} style={inputStyle} type="number" min={0} placeholder="Age" />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>Gender</label>
            <select value={gender} onChange={(e) => setGender(e.target.value)} style={inputStyle}>
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div style={{ marginTop: 10 }}>
          <label style={{ fontSize: 13, fontWeight: 600 }}>Phone</label>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} style={inputStyle} placeholder="Phone number" />
        </div>

        {error && <div style={{ marginTop: 12, color: "red" }}>{error}</div>}

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 16 }}>
          <button onClick={onClose} style={{ padding: "8px 14px", borderRadius: 6, border: "1px solid #e5e7eb", background: "#fff" }}>Cancel</button>
          <button onClick={handleCreate} disabled={loading} style={{ padding: "8px 14px", borderRadius: 6, border: "none", background: "#0b7a53", color: "#fff" }}>
            {loading ? "Creating..." : "Create Client"}
          </button>
        </div>
      </div>
    </div>
  );
}

// shared input style
const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "8px 10px",
  borderRadius: 6,
  border: "1px solid #e5e7eb",
  marginTop: 6,
  boxSizing: "border-box",
};
