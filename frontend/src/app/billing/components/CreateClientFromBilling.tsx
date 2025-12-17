"use client";

import { useEffect, useState } from "react";

/* ---------- Types ---------- */

type Client = {
  id: number;
  fullName: string;
  age: number | null;
  gender: string | null;
  phone: string | null;
};

type NewClient = {
  fullName: string;
  phone: string;
  email: string;
  age: string;
  monthAge: string;
  gender: string;
  dobBs: string;
  address: string;
  palikaDistrictProvince: string;
  knownFrom: string;
  panVatNumber: string;
  internalNotes: string;
  insuranceNumber: string;
  nationalIdentityNumber: string;
  registrationNumber: string;
  additionalPhone: string;
  associateCompany: string;
  occupation: string;
  maritalStatus: string;
  bloodGroup: string;
  ethnicity: string;
  nationality: string;
  appliedCountry: string;
  passportNumber: string;
  passportIssuePlace: string;
  passportIssueDateBs: string;
  passportExpiryDateBs: string;
};

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5000";

/* ---------- Component ---------- */

export default function CreateClientFromBilling({
  open,
  onClose,
  onClientCreated,
  initialName = "",
}: {
  open: boolean;
  onClose: () => void;
  onClientCreated: (c: Client) => void;
  initialName?: string;
}) {
  const [form, setForm] = useState<NewClient>({
    fullName: "",
    phone: "",
    email: "",
    age: "",
    monthAge: "",
    gender: "",
    dobBs: "",
    address: "",
    palikaDistrictProvince: "",
    knownFrom: "",
    panVatNumber: "",
    internalNotes: "",
    insuranceNumber: "",
    nationalIdentityNumber: "",
    registrationNumber: "",
    additionalPhone: "",
    associateCompany: "",
    occupation: "",
    maritalStatus: "",
    bloodGroup: "",
    ethnicity: "",
    nationality: "",
    appliedCountry: "",
    passportNumber: "",
    passportIssuePlace: "",
    passportIssueDateBs: "",
    passportExpiryDateBs: "",
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* ---------- Effects ---------- */

  useEffect(() => {
    if (initialName) {
      setForm((f) => ({ ...f, fullName: initialName }));
    }
  }, [initialName]);

  /* ---------- Helpers ---------- */

  const update = (key: keyof NewClient, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

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
          fullName: form.fullName,
          phone: form.phone || form.additionalPhone || null,
          email: form.email || null,
          age: form.age ? Number(form.age) : null,
          gender: form.gender || null,
          address: form.address || null,
          knownFrom: form.knownFrom || null,
          internalNotes: form.internalNotes || null,
        }),
      });

      if (!res.ok) throw new Error("Failed to save client");

      const created: Client = await res.json();
      onClientCreated(created);
    } catch (e) {
      console.error(e);
      setError("Failed to save client");
    } finally {
      setSaving(false);
    }
  };

  /* ============================================================
     ✅ IMPORTANT FIX:
     ❌ NO `if (!open) return null`
     ✅ Conditional rendering INSIDE JSX
     ============================================================ */

  return (
    <>
      {open && (
        <div style={overlay}>
          <div style={drawer}>
            {/* Header */}
            <div style={header}>
              <h2 style={{ margin: 0, fontSize: 18 }}>
                Create new client
              </h2>
              <button onClick={onClose} style={closeBtn}>
                ×
              </button>
            </div>

            {/* Form */}
            <div style={formGrid}>
              <Input
                label="Full Name*"
                value={form.fullName}
                onChange={(v) => update("fullName", v)}
              />
              <Input
                label="Phone"
                value={form.phone}
                onChange={(v) => update("phone", v)}
              />
              <Input
                label="Email"
                value={form.email}
                onChange={(v) => update("email", v)}
              />
              <Input
                label="Age (Years)"
                value={form.age}
                onChange={(v) => update("age", v)}
              />
              <Select
                label="Gender"
                value={form.gender}
                onChange={(v) => update("gender", v)}
                options={["Male", "Female", "Other"]}
              />
              <Textarea
                label="Address"
                value={form.address}
                onChange={(v) => update("address", v)}
              />
              <Textarea
                label="Internal Notes"
                value={form.internalNotes}
                onChange={(v) => update("internalNotes", v)}
              />
            </div>

            {error && (
              <div style={{ color: "#b91c1c", fontSize: 13 }}>
                {error}
              </div>
            )}

            {/* Footer */}
            <div style={footer}>
              <button onClick={onClose} style={btnCancel}>
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                style={btnSave}
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ---------- Small UI helpers ---------- */

function Input({
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
        style={inputStyle}
      />
    </div>
  );
}

function Textarea({
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
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ ...inputStyle, minHeight: 60 }}
      />
    </div>
  );
}

function Select({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={inputStyle}
      >
        <option value="">Select</option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

/* ---------- Styles ---------- */

const overlay: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.35)",
  display: "flex",
  justifyContent: "flex-end",
  zIndex: 50,
};

const drawer: React.CSSProperties = {
  width: 520,
  background: "#fff",
  height: "100%",
  padding: 20,
  overflowY: "auto",
};

const header: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: 16,
};

const closeBtn: React.CSSProperties = {
  border: "none",
  background: "transparent",
  fontSize: 22,
  cursor: "pointer",
};

const formGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: 12,
};

const footer: React.CSSProperties = {
  display: "flex",
  justifyContent: "flex-end",
  gap: 8,
  marginTop: 16,
};

const labelStyle: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 600,
  marginBottom: 4,
  display: "block",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "6px 8px",
  borderRadius: 4,
  border: "1px solid #d1d5db",
  fontSize: 13,
};

const btnCancel: React.CSSProperties = {
  padding: "8px 14px",
  border: "1px solid #e5e7eb",
  background: "#fff",
  cursor: "pointer",
};

const btnSave: React.CSSProperties = {
  padding: "8px 16px",
  background: "#0b7a53",
  color: "#fff",
  border: "none",
  fontWeight: 600,
  cursor: "pointer",
};
