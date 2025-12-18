"use client";

import { useState } from "react";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "http://145.223.23.176:5000";

export default function LabSettingsDrawer({
  onClose,
}: {
  onClose: () => void;
}) {
  const [openLabTest, setOpenLabTest] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setError("");
    setSaving(true);

    const token = localStorage.getItem("token");
    console.log("TOKEN:", token);

    if (!token) {
      setError("Not logged in");
      setSaving(false);
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/lab-tests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to save");
        setSaving(false);
        return;
      }

      setName("");
      setOpenLabTest(false);
    } catch (e) {
      setError("Backend not reachable");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      {/* DRAWER */}
      <div style={{
        position: "fixed",
        right: 0,
        top: 0,
        bottom: 0,
        width: 420,
        background: "#fff",
        borderLeft: "1px solid #e5e7eb",
        padding: 20,
        zIndex: 50
      }}>
        <h3>Lab Settings</h3>

        <button onClick={() => setOpenLabTest(true)}>
          Create or Edit Lab Test
        </button>

        <button onClick={onClose}>Close</button>
      </div>

      {/* MODAL */}
      {openLabTest && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.35)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 100
        }}>
          <div style={{ background: "#fff", padding: 20, width: 500 }}>
            <h3>Create / Edit Lab Test</h3>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Lab Test Name"
              style={{ width: "100%", padding: 10 }}
            />

            {error && (
              <p style={{ color: "red", marginTop: 8 }}>{error}</p>
            )}

            <div style={{ marginTop: 12 }}>
              <button onClick={() => setOpenLabTest(false)}>Cancel</button>
              <button
                onClick={handleSave}
                disabled={saving}
                style={{ marginLeft: 8 }}
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
