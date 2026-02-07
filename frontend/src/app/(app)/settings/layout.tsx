import type { ReactNode } from "react";
import SettingsSidebar from "@/components/settings/SettingsSidebar";

export default function SettingsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div style={{ display: "flex", flex: 1, background: "#f6f7f9" }}>
      {/* SETTINGS SIDEBAR */}
      <SettingsSidebar />

      {/* SETTINGS CONTENT */}
      <main style={{ flex: 1, padding: 24, overflowY: "auto" }}>
        {children}
      </main>
    </div>
  );
}
