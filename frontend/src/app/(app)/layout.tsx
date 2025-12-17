"use client";

import { ReactNode } from "react";
import Sidebar from "@/components/Sidebar";
import HeaderBar from "@/components/HeaderBar";

export default function AppLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Sidebar />

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <HeaderBar pageTitle="" />

        <main
          style={{
            flex: 1,
            overflowY: "auto",
            padding: 24,
            background: "#f5f7fb",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
