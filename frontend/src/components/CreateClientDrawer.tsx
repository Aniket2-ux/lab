"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5000";

type Props = {
  onClose: () => void;
  onCreated?: (client: any) => void;
  initialName?: string;
};

export default function CreateClientDrawer({
  onClose,
  onCreated,
  initialName = "",
}: Props) {
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

        // future-safe fields
        email: null,
        address: null,
        knownFrom: null,
        internalNotes: null,
      };

      const res = await fetch(`${API_BASE}/api/clients`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `HTTP ${res.status}`);
      }

      const created = await res.json();

      if (onCreated) onCreated(created);

      onClose();

      if (created?.id) {
        router.push(`/billing?newClientId=${created.id}`);
      } else {
        router.push("/billing");
      }
    } catch (e: any) {
      console.error("Create client failed", e);
      setError(e.message || "Failed to create client");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={overlay}>
      <div style={drawer}>
        <header style={header}>
          <h3>Create Client</h3>
          <button onClick={onClose} style={closeBtn}>×</button>
        </header>

        <label>Full name</label>
        <input value={fullName} onChange={(e) => setFullName(e.target.value)} style={inputStyle} />

        <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
          <div style={{ flex: 1 }}>
            <label>Age</label>
            <input
              type="number"
              min={0}
              value={age === "" ? "" : age}
              onChange={(e) => setAge(e.target.value === "" ? "" : Number(e.target.value))}
              style={inputStyle}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label>Gender</label>
            <select value={gender} onChange={(e) => setGender(e.target.value)} style={inputStyle}>
              <option value="">Select</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        <label style={{ marginTop: 10 }}>Phone</label>
        <input value={phone} onChange={(e) => setPhone(e.target.value)} style={inputStyle} />

        {error && <div style={{ color: "red", marginTop: 10 }}>{error}</div>}

        <footer style={{ marginTop: 16 }}>
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleCreate} disabled={loading}>
            {loading ? "Creating..." : "Create Client"}
          </button>
        </footer>
      </div>
    </div>
  );
}

/* styles */
const overlay = { position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", zIndex: 80, display: "flex", justifyContent: "flex-end" } as const;
const drawer = { width: 420, background: "#fff", padding: 20, height: "100%" } as const;
const header = { display: "flex", justifyContent: "space-between" } as const;
const closeBtn = { fontSize: 20, border: "none", background: "transparent" } as const;
const inputStyle = { width: "100%", padding: 8, borderRadius: 6, border: "1px solid #e5e7eb" } as const;
