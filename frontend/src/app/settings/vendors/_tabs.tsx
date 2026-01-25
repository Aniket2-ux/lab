"use client";

import { usePathname, useRouter } from "next/navigation";

const tabs = [
  { label: "SUPPLIER", path: "/settings/vendors/supplier" },
  { label: "REFERRERS", path: "/settings/vendors/referrers" },
  { label: "ASSOCIATE COMPANIES", path: "/settings/vendors/associate-companies" },
];

export default function VendorTabs() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div style={row}>
      {tabs.map((t) => {
        const active = pathname.startsWith(t.path);
        return (
          <div
            key={t.path}
            onClick={() => router.push(t.path)}
            style={{
              ...tab,
              color: active ? "#16a34a" : "#555",
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
  );
}

const row = {
  display: "flex",
  gap: 32,
  borderBottom: "1px solid #e5e7eb",
};

const tab = {
  paddingBottom: 10,
  fontSize: 13,
  fontWeight: 600,
  cursor: "pointer",
};
