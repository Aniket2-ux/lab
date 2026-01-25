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

export default function GeneralPrintPage() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 10,
        padding: 24,
        maxWidth: 1000,
      }}
    >
      {/* Tabs */}
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

      {/* Content */}
      <div style={{ marginTop: 24 }}>
        <GeneralPrint />
      </div>
    </div>
  );
}

/* -------- TAB CONTENT -------- */

function GeneralPrint() {
  return (
    <div style={{ maxWidth: 500 }}>
      <label style={row}>
        <input type="checkbox" defaultChecked />
        Centralized Header
      </label>

      <label style={row}>
        <input type="checkbox" defaultChecked />
        Enable letterhead color
      </label>

      <input placeholder="Hex value" style={input} />

      <div style={{ marginTop: 16 }}>
        <div style={{ fontSize: 12 }}>
          Clinic Name Font Size Scale (0.5 – 2)
        </div>
        <input type="number" step="0.1" defaultValue={1.8} style={input} />
      </div>
    </div>
  );
}

/* -------- STYLES -------- */

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

const row = {
  display: "flex",
  gap: 10,
  marginBottom: 12,
};

const input = {
  width: 200,
  padding: 8,
  marginTop: 10,
};
