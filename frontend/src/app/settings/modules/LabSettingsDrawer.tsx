"use client";

import { useState } from "react";

export default function LabSettingsDrawer({
  onClose,
}: {
  onClose: () => void;
}) {
  const [openLabTest, setOpenLabTest] = useState(false);

  return (
    <>
      {/* RIGHT DRAWER */}
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
          overflowY: "auto",
          zIndex: 50,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >
          <h3>Lab Settings</h3>
          <button onClick={onClose}>✕</button>
        </div>

        <h4>Manage Lab Tests And Groups</h4>

        <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
          <button
            onClick={() => setOpenLabTest(true)}
            style={{
              flex: 1,
              padding: 10,
              border: "1px solid #e5e7eb",
              borderRadius: 6,
              cursor: "pointer",
              background: "#fff",
            }}
          >
            Create or Edit Lab Test
          </button>

          <button
            style={{
              flex: 1,
              padding: 10,
              border: "1px solid #e5e7eb",
              borderRadius: 6,
              background: "#f9fafb",
            }}
          >
            Create or Edit Test Group
          </button>
        </div>
      </div>

      {/* MODAL */}
      {openLabTest && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.35)",
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 600,
              background: "#fff",
              borderRadius: 10,
              padding: 20,
            }}
          >
            <h3>Create / Edit Lab Test</h3>

            <input
              placeholder="Lab Test Name"
              style={{
                width: "100%",
                padding: 10,
                marginTop: 12,
                marginBottom: 12,
                border: "1px solid #e5e7eb",
                borderRadius: 6,
              }}
            />

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 10,
              }}
            >
              <button onClick={() => setOpenLabTest(false)}>Cancel</button>
              <button
                style={{
                  background: "#0b7a53",
                  color: "#fff",
                  padding: "8px 14px",
                  borderRadius: 6,
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
