import SettingsSidebar from "@/components/settings/SettingsSidebar";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="settings-layout">
      <SettingsSidebar />
      <div className="settings-content">{children}</div>
    </div>
  );
}
