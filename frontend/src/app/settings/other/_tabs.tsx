"use client";

import { usePathname, useRouter } from "next/navigation";

const tabs = [
  { label: "GENERAL PRINT", path: "/settings/others/general-print" },
  { label: "DEPARTMENT", path: "/settings/others/department" },
  { label: "SERVICE TYPE", path: "/settings/others/service-type" },
  { label: "VITALS", path: "/settings/others/vitals" },
  { label: "SMS / EMAIL", path: "/settings/others/sms-email" },
  { label: "SURVEY FORM", path: "/settings/others/survey-form" },
  { label: "SSF", path: "/settings/others/ssf" },
];

export default function Tabs() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div style={tabRow}>
      {tabs.map((t) => {
        const active = pathname === t.path;
        return (
          <div
            key={t.path}
            onClick={() => router.push(t.path)}
            style={{
              ...tab,
              borderBottom: active
                ? "2px solid #16a34a"
                : "2px solid transparent",
              color: active ? "#16a34a" : "#555",
            }}
          >
            {t.label}
          </div>
        );
      })}
    </div>
  );
}

const tabRow = {
  display: "flex",
  gap: 24,
  borderBottom: "1px solid #e5e7eb",
};

const tab = {
  paddingBottom: 8,
  cursor: "pointer",
  fontSize: 13,
  fontWeight: 500,
};
