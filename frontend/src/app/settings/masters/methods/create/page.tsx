"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { API_BASE } from "@/lib/apiBase";

export default function CreateMethod() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);

  async function save() {
    if (!name.trim()) return;

    setSaving(true);
    await fetch(`${API_BASE}/api/methods`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    router.push("/settings/masters/methods");
  }

  return (
    <div style={drawer}>
      <div style={header}>
        <h3>Create Method / Machine</h3>
        <button onClick={() => router.back()} style={closeBtn}>✕</button>
      </div>

      <label>Method Name *</label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="GOD-POD"
        style={input}
      />

      <div style={actions}>
        <button onClick={() => router.back()} style={cancelBtn}>
          CANCEL
        </button>
        <button onClick={save} style={saveBtn} disabled={saving}>
          {saving ? "SAVING..." : "SAVE"}
        </button>
      </div>
    </div>
  );
}

/* styles */

const drawer = {
  position: "fixed" as const,
  right: 0,
  top: 0,
  width: 420,
  height: "100vh",
  background: "#fff",
  padding: 24,
  boxShadow: "-4px 0 12px rgba(0,0,0,0.1)",
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: 20,
};

const input = {
  width: "100%",
  padding: 10,
  marginTop: 6,
  borderRadius: 6,
  border: "1px solid #ccc",
};

const actions = {
  display: "flex",
  justifyContent: "flex-end",
  gap: 12,
  marginTop: 20,
};

const cancelBtn = {
  border: "1px solid #16a34a",
  background: "#fff",
  color: "#16a34a",
  padding: "8px 14px",
  borderRadius: 6,
};

const saveBtn = {
  background: "#16a34a",
  color: "#fff",
  border: "none",
  padding: "8px 16px",
  borderRadius: 6,
};

const closeBtn = {
  background: "none",
  border: "none",
  fontSize: 18,
};
