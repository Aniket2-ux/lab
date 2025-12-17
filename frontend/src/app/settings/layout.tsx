"use client";

import Sidebar from "@/components/Sidebar";
import HeaderBar from "@/components/HeaderBar";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <main style={{ flex: 1, overflow: "auto", padding: 24 }}>
        <HeaderBar pageTitle="Settings" />
        {children}
      </main>
    </div>
  );
}
