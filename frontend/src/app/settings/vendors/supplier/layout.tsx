"use client";

import { ReactNode } from "react";

export default function SupplierLayout({
  children,
  drawer,
}: {
  children: ReactNode;
  drawer: ReactNode;
}) {
  return (
    <div style={{ position: "relative", height: "100%" }}>
      {children}

      {/* Right Drawer */}
      {drawer && (
        <div
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            width: 420,
            height: "100vh",
            background: "#fff",
            boxShadow: "-8px 0 24px rgba(0,0,0,0.15)",
            zIndex: 50,
            padding: 24,
            overflowY: "auto",
          }}
        >
          {drawer}
        </div>
      )}
    </div>
  );
}
