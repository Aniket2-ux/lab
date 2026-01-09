"use client";

import { useState } from "react";

export default function CollapseSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div style={box}>
      <button
        onClick={() => setOpen(!open)}
        style={header}
      >
        <span>{title}</span>
        <span>{open ? "▲" : "▼"}</span>
      </button>

      {open && <div style={content}>{children}</div>}
    </div>
  );
}

/* ---------- Styles ---------- */

const box = {
  border: "1px solid #ddd",
  borderRadius: 8,
  marginBottom: 16,
};

const header = {
  width: "100%",
  background: "transparent",
  border: "none",
  padding: "12px 16px",
  display: "flex",
  justifyContent: "space-between",
  cursor: "pointer",
  fontWeight: 600,
  fontSize: 14,
};

const content = {
  padding: "12px 16px",
  background: "#fafafa",
  borderTop: "1px solid #ddd",
};
