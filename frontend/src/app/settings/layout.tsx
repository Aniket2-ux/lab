import type { ReactNode } from "react";
import Sidebar from "@/components/Sidebar";
import HeaderBar from "@/components/HeaderBar";
import SettingsSidebar from "@/components/settings/SettingsSidebar";

export default function SettingsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* GLOBAL SIDEBAR */}
      <Sidebar />

      {/* MAIN AREA */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* HEADER */}
        <HeaderBar pageTitle="Settings" />

        {/* SETTINGS BODY */}
        <div
          style={{
            display: "flex",
            flex: 1,
            overflow: "hidden",
            background: "#f6f7f9",
          }}
        >
          {/* SETTINGS LEFT SIDEBAR */}
          <SettingsSidebar />

          {/* SETTINGS CONTENT */}
          <main
            style={{
              flex: 1,
              padding: 24,
              overflowY: "auto",
            }}
          >
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
