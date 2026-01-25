"use client";

import { usePathname, useRouter } from "next/navigation";

const tabs = [
  { label: "SUPPLIER", path: "/settings/vendors/supplier" },
  { label: "REFERRERS", path: "/settings/vendors/referrers" },
  { label: "ASSOCIATE COMPANIES", path: "/settings/vendors/associate-companies" },
];

export default function VendorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div style={{ background: "#fff", borderRadius: 10 }}>
      {/* Tabs */}
      <div
        style={{
          display: "flex",
          gap: 32,
          padding: "16px 24px",
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        {tabs.map((t) => {
          const active = pathname.startsWith(t.path);
          return (
            <div
              key={t.path}
              onClick={() => router.push(t.path)}
              style={{
                cursor: "pointer",
                paddingBottom: 8,
                fontWeight: 600,
                fontSize: 13,
                color: active ? "#16a34a" : "#6b7280",
                borderBottom: active
                  ? "2px solid #16a34a"
                  : "2px solid transparent",
              }}
            >
              {t.label}
            </div>
          );
        })}
      </div>

      <div style={{ padding: 24 }}>{children}</div>
    </div>
  );
}
