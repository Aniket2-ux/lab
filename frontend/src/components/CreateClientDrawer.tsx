"use client";

import React, { useEffect, useState } from "react";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "http://145.223.23.176:5000";

/* ---------------- Types ---------------- */

type Client = {
  id: number;
  fullName: string;
  age: number | null;
  gender: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  knownFrom?: string | null;
  internalNotes?: string | null;
  createdAt: string;
};

type NewClient = {
  fullName: string;
  phone: string;
  additionalPhone: string;
  email: string;
  age: string;
  gender: string;
  address: string;
  knownFrom: string;
  internalNotes: string;
};

/* ---------------- Component ---------------- */

export default function CreateClientDrawer({
  onClose,
  onCreated,
  initialName = "",
}: {
  onClose: () => void;
  onCreated: (c: Client) => void;
  initialName?: string;
}) {
  const [form, setForm] = useState<NewClient>({
    fullName: "",
    phone: "",
    additionalPhone: "",
    email: "",
    age: "",
    gender: "",
    address: "",
    knownFrom: "",
    internalNotes: "",
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialName) {
      setForm((f) => ({ ...f, fullName: initialName }));
    }
  }, [initialName]);

  const update = (field: keyof NewClient, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
  };

  /* ---------------- SAVE CLIENT ---------------- */

  const handleSave = async () => {
    if (!form.fullName.trim()) {
      setError("Full name is required");
      return;
    }

    try {
      setSaving(true);
      setError(null);

      const res = await fetch(`${API_BASE}/api/clients`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName.trim(),          // ✅ REQUIRED
          phone: form.phone || form.additionalPhone || null,
          email: form.email || null,
          age: form.age ? Number(form.age) : null,
          gender: form.gender || null,
          address: form.address || null,
          knownFrom: form.knownFrom || null,
          internalNotes: form.internalNotes || null,

          // ✅ REQUIRED BY BACKEND
          serviceCode: "WALKIN",
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data?.error || `HTTP ${res.status}`);
      }

      const created: Client = await res.json();
      onCreated(created);
      onClose();
    } catch (err: any) {
      console.error("Failed to save client", err);
      setError(err.message || "Failed to save client");
    } finally {
      setSaving(false);
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <div style={overlay}>
      <div style={drawer}>
        <header style={header}>
          <h2>Create New Client</h2>
          <button onClick={onClose} style={closeBtn}>×</button>
        </header>

        <LabeledInput
          label="Full Name *"
          value={form.fullName}
          onChange={(v) => update("fullName", v)}
        />

        <LabeledInput
          label="Phone"
          value={form.phone}
          onChange={(v) => update("phone", v)}
        />

        <LabeledInput
          label="Additional Phone"
          value={form.additionalPhone}
          onChange={(v) => update("additionalPhone", v)}
        />

        <LabeledInput
          label="Email"
          value={form.email}
          onChange={(v) => update("email", v)}
        />

        <LabeledInput
          label="Age"
          value={form.age}
          onChange={(v) => update("age", v)}
        />

        <label style={label}>Gender</label>
        <select
          value={form.gender}
          onChange={(e) => update("gender", e.target.value)}
          style={input}
        >
          <option value="">Select</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

        <LabeledInput
          label="Address"
          value={form.address}
          onChange={(v) => update("address", v)}
        />

        <LabeledInput
          label="Known From"
          value={form.knownFrom}
          onChange={(v) => update("knownFrom", v)}
        />

        <label style={label}>Internal Notes</label>
        <textarea
          value={form.internalNotes}
          onChange={(e) => update("internalNotes", e.target.value)}
          style={{ ...input, minHeight: 60 }}
        />

        {error && <div style={{ color: "red" }}>{error}</div>}

        <footer style={footer}>
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save"}
          </button>
        </footer>
      </div>
    </div>
  );
}

/* ---------------- Helpers ---------------- */

function LabeledInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={input}
      />
    </div>
  );
}

/* ---------------- Styles ---------------- */

const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.35)",
  display: "flex",
  justifyContent: "flex-end",
  zIndex: 100,
} as const;

const drawer = {
  width: 520,
  height: "100%",
  background: "#fff",
  padding: 20,
  overflowY: "auto",
} as const;

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 12,
} as const;

const footer = {
  display: "flex",
  justifyContent: "flex-end",
  gap: 8,
  marginTop: 16,
} as const;

const closeBtn = {
  fontSize: 22,
  border: "none",
  background: "transparent",
  cursor: "pointer",
} as const;

const labelStyle = {
  fontSize: 12,
  fontWeight: 600,
  marginBottom: 4,
} as const;

const label = labelStyle;

const input = {
  width: "100%",
  padding: 8,
  borderRadius: 6,
  border: "1px solid #d1d5db",
  marginBottom: 10,
} as const;
