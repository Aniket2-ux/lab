"use client";

import { usePathname, useRouter } from "next/navigation";

const tabs = [
  { label: "ADMINISTRATIVE USER", path: "/settings/users/administrative" },
  { label: "SERVICE PROVIDERS", path: "/settings/users/service-providers" },
  { label: "ALL", path: "/settings/users" },
  { label: "BOOKABLE RESOURCE", path: "/settings/users/bookable-resource" },
];

export default function UsersTabs() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div style={tabsWrap}>
      {tabs.map((tab) => {
        const active =
          pathname === tab.path ||
          (tab.path === "/settings/users" &&
            pathname === "/settings/users");

        return (
          <button
            key={tab.path}
            onClick={() => router.push(tab.path)}
            style={{
              ...tabBtn,
              borderBottom: active
                ? "2px solid #198754"
                : "2px solid transparent",
              color: active ? "#198754" : "#333",
              fontWeight: active ? 600 : 400,
            }}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

/* ---------- styles ---------- */

const tabsWrap = {
  display: "flex",
  gap: 24,
  borderBottom: "1px solid #e0e0e0",
};

const tabBtn = {
  background: "none",
  border: "none",
  padding: "12px 0",
  cursor: "pointer",
  fontSize: 14,
};
