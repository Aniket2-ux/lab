"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE!;


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
  const router = useRouter();

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
    <div style={{ display: "flex", gap: 20 }}>
      {/* LEFT MENU */}
      <aside
        style={{
          width: 260,
          background: "#fff",
          borderRadius: 10,
          padding: 16,
        }}
      >
        <MenuItem label="Company Profile" active onClick={() => router.push("/settings")} />
        <MenuItem label="Account" onClick={() => router.push("/settings/account")} />
        <MenuItem label="Users" onClick={() => router.push("/settings/users")} />
        <MenuItem label="Modules" onClick={() => router.push("/settings/modules")} />
        <MenuItem label="Others" onClick={() => router.push("/settings/others")} />
        <MenuItem label="Vendors" onClick={() => router.push("/settings/vendors")} />
        <MenuItem label="Payments" onClick={() => router.push("/settings/payments")} />
        <MenuItem
          label="Subscription Information"
          onClick={() => router.push("/settings/subscription")}
        />
      </aside>

      {/* CONTENT */}
      <section style={{ flex: 1 }}>
        <div
          style={{
            background: "#fff",
            borderRadius: 10,
            padding: 20,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h2>GM Diagnostic Lab</h2>
            <button
              onClick={() => {
                setForm(profile || {});
                setEditOpen(true);
              }}
            >
              EDIT
            </button>
          </div>

          {loading ? (
            "Loading..."
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
              <Field label="Short Name" value={profile?.shortName} />
              <Field label="Company Name" value={profile?.name} />
              <Field label="City" value={profile?.city} />
              <Field label="Address" value={profile?.address} />
              <Field label="Email" value={profile?.email} />
              <Field label="Owner Email" value={profile?.ownerEmail} />
            </div>
          )}
        </div>
      </section>

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
            padding: 20,
            boxShadow: "-10px 0 30px rgba(0,0,0,0.15)",
          }}
        >
          <h3>Edit Company Profile</h3>

          <input
            placeholder="Short Name"
            value={form.shortName || ""}
            onChange={(e) =>
              setForm({ ...form, shortName: e.target.value })
            }
          />
          <input
            placeholder="Company Name"
            value={form.name || ""}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />
          <input
            placeholder="City"
            value={form.city || ""}
            onChange={(e) =>
              setForm({ ...form, city: e.target.value })
            }
          />
          <input
            placeholder="Email"
            value={form.email || ""}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <div style={{ marginTop: 12 }}>
            <button onClick={saveProfile}>Save</button>
            <button onClick={() => setEditOpen(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* -------- Helpers -------- */

function MenuItem({
  label,
  active,
  onClick,
}: {
  label: string;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      style={{
        padding: 8,
        marginTop: 6,
        borderRadius: 6,
        background: active ? "#e6f4ef" : "transparent",
        cursor: "pointer",
        fontWeight: active ? 600 : 400,
      }}
    >
      {label}
    </div>
  );
}

function Field({ label, value }: any) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ fontSize: 12, color: "#666" }}>{label}</div>
      <div>{value || "-"}</div>
    </div>
  );
}
