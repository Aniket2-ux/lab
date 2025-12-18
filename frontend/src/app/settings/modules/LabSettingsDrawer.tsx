"use client";

import { useState } from "react";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5000";

export default function LabSettingsDrawer({
  onClose,
}: {
  onClose: () => void;
}) {
  const [testName, setTestName] = useState("");
  const [message, setMessage] = useState("");

  const handleSave = async () => {
    setMessage("Saving...");

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_BASE}/api/lab-tests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: testName,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Save failed");
        return;
      }

      setMessage("Saved successfully");
      setTestName("");
    } catch (err) {
      setMessage("Server error");
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        right: 0,
        top: 0,
        bottom: 0,
        width: 420,
        background: "#fff",
        borderLeft: "1px solid #e5e7eb",
        padding: 20,
        zIndex: 50,
      }}
    >
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3>Create / Edit Lab Test</h3>
        <button onClick={onClose}>✕</button>
      </div>

      {/* FORM */}
      <div style={{ marginTop: 20 }}>
        <label style={{ fontSize: 13 }}>Lab Test Name</label>

        <input
          value={testName}
          onChange={(e) => setTestName(e.target.value)}
          placeholder="Enter lab test name"
          style={{
            width: "100%",
            padding: 10,
            marginTop: 6,
            border: "1px solid #d1d5db",
            borderRadius: 6,
          }}
        />

        <button
          onClick={handleSave}
          style={{
            marginTop: 16,
            width: "100%",
            padding: 10,
            background: "#009150",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            fontWeight: 600,
          }}
        >
          SAVE
        </button>

        {message && (
          <p style={{ marginTop: 10, fontSize: 13 }}>{message}</p>
        )}
      </div>
    </div>
  );
}
