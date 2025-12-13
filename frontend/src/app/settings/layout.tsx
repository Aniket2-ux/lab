"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const Item = ({
    href,
    title,
    desc,
  }: {
    href: string;
    title: string;
    desc: string;
  }) => {
    const active = pathname === href;

    return (
      <Link
        href={href}
        style={{
          display: "block",
          padding: "12px",
          borderRadius: 6,
          background: active ? "#e6f4ef" : "transparent",
          textDecoration: "none",
          marginBottom: 6,
        }}
      >
        <div style={{ fontWeight: 600 }}>{title}</div>
        <div style={{ fontSize: 12, color: "#6b7280" }}>{desc}</div>
      </Link>
    );
  };

  return (
    <div style={{ display: "flex", gap: 24 }}>
      <aside
        style={{
          width: 280,
          borderRight: "1px solid #e5e7eb",
          paddingRight: 16,
        }}
      >
        <Item href="/settings" title="Company Profile" desc="Manage your company profile." />
        <Item href="/settings/account" title="Account" desc="Calendar, fiscal, taxation." />
        <Item href="/settings/users" title="Users" desc="Manage users." />
        <Item href="/settings/modules" title="Modules" desc="OPD, Lab, Billing." />
      </aside>

      <section style={{ flex: 1 }}>{children}</section>
    </div>
  );
}
