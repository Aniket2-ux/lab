import SettingsSidebar from "@/components/settings/SettingsSidebar";

export default function VendorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full">
      <SettingsSidebar />

      <div className="flex-1 bg-gray-50 p-6 overflow-hidden">
        {children}
      </div>
    </div>
  );
}
