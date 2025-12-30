"use client";

import { useEffect, useState } from "react";
import { API_BASE } from "@/lib/apiBase";

/* -------- Types -------- */
type Profile = {
  shortName?: string;
  name?: string;
  city?: string;
  address?: string;
  email?: string;
  ownerEmail?: string;
};

/* -------- Page -------- */
export default function SettingsPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  const [form, setForm] = useState<Profile>({});

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      const res = await fetch(`${API_BASE}/api/settings/profile`);
      const json = await res.json();
      setProfile(json.profile || null);
    } catch {
      setProfile(null);
    } finally {
      setLoading(false);
    }
  }

  async function saveProfile() {
    await fetch(`${API_BASE}/api/settings/profile`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setEditOpen(false);
    loadProfile();
  }

  return (
    <>
      {/* CONTENT CARD */}
      <div
        style={{
          background: "#fff",
          borderRadius: 10,
          padding: 24,
          maxWidth: 900,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <h2 style={{ margin: 0 }}>GM Diagnostic Lab</h2>
          <button
            onClick={() => {
              setForm(profile || {});
              setEditOpen(true);
            }}
          >
            Edit
          </button>
        </div>

        {loading ? (
          <div>Loading...</div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
            }}
          >
            <Field label="Short Name" value={profile?.shortName} />
            <Field label="Company Name" value={profile?.name} />
            <Field label="City" value={profile?.city} />
            <Field label="Address" value={profile?.address} />
            <Field label="Email" value={profile?.email} />
            <Field label="Owner Email" value={profile?.ownerEmail} />
          </div>
        )}
      </div>

      {/* EDIT DRAWER */}
      {editOpen && (
        <div
          style={{
            position: "fixed",
            right: 0,
            top: 0,
            bottom: 0,
            width: 420,
            background: "#fff",
            padding: 24,
            boxShadow: "-10px 0 30px rgba(0,0,0,0.15)",
            zIndex: 50,
          }}
        >
          <h3>Edit Company Profile</h3>

          <Input
            label="Short Name"
            value={form.shortName}
            onChange={(v) => setForm({ ...form, shortName: v })}
          />
          <Input
            label="Company Name"
            value={form.name}
            onChange={(v) => setForm({ ...form, name: v })}
          />
          <Input
            label="City"
            value={form.city}
            onChange={(v) => setForm({ ...form, city: v })}
          />
          <Input
            label="Email"
            value={form.email}
            onChange={(v) => setForm({ ...form, email: v })}
          />

          <div style={{ marginTop: 20 }}>
            <button onClick={saveProfile}>Save</button>
            <button onClick={() => setEditOpen(false)} style={{ marginLeft: 10 }}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/* -------- Helpers -------- */

function Field({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <div style={{ fontSize: 12, color: "#666" }}>{label}</div>
      <div style={{ fontWeight: 500 }}>{value || "-"}</div>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value?: string;
  onChange: (v: string) => void;
}) {
  return (
    <div style={{ marginTop: 12 }}>
      <div style={{ fontSize: 12, marginBottom: 4 }}>{label}</div>
      <input
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        style={{ width: "100%", padding: 8 }}
      />
    </div>
  );
}
