"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  href: string;
  label: string;
  icon: string;
};

const MAIN_ITEMS: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: "▤" },
  { href: "/billing", label: "Billing", icon: "🧾" },
  { href: "/lab", label: "Lab", icon: "⚗️" },
  { href: "/services", label: "Services", icon: "🧬" },
  { href: "/clients", label: "Clients", icon: "👥" },
  { href: "/stock", label: "Stock", icon: "📦" },
];

const BOTTOM_ITEMS: NavItem[] = [
  { href: "/messaging", label: "Messaging", icon: "💬" },

  // ✅ REPLACED DAYBOOK → CLIENT REPORTS
  { href: "/client-reports", label: "Client Reports", icon: "📄" },

  { href: "/reports", label: "Reports", icon: "📊" },
  { href: "/settings", label: "Settings", icon: "⚙️" },
];

export default function Sidebar() {
  const pathname = usePathname();

  const renderItem = (item: NavItem) => {
    const active = pathname.startsWith(item.href);

    return (
      <Link
        key={item.href}
        href={item.href}
        title={item.label}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 4,
          padding: "10px 0",
          fontSize: 11,
          cursor: "pointer",
          color: active ? "#ffffff" : "#e0f2f1",
          textDecoration: "none",
          backgroundColor: active ? "rgba(0,0,0,0.18)" : "transparent",
        }}
      >
        <span style={{ fontSize: 18 }}>{item.icon}</span>
        <span>{item.label}</span>
      </Link>
    );
  };

  return (
    <aside
      style={{
        width: 80,
        background: "#00854b",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      {/* Logo */}
      <div
        style={{
          height: 80,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderBottom: "1px solid rgba(255,255,255,0.15)",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: "#ffffff",
            color: "#00854b",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
          }}
        >
          GM
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
        {MAIN_ITEMS.map(renderItem)}

        <div style={{ marginTop: "auto" }}>
          {BOTTOM_ITEMS.map(renderItem)}
        </div>
      </nav>
    </aside>
  );
}
