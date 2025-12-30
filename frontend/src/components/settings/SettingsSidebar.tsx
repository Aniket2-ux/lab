"use client";

import { usePathname, useRouter } from "next/navigation";

export default function SettingsSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const go = (path: string) => router.push(path);

  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(path + "/");

  return (
    <aside
      className="settings-sidebar"
      style={{
        width: 280,
        background: "#fff",
        borderRight: "1px solid #e5e7eb",
        padding: "16px 12px",
        overflowY: "auto",
      }}
    >
      {/* ================= COMPANY ================= */}
      <div className="sidebar-label">Company</div>

      <SidebarItem
        title="Company Profile"
        desc="Manage your company profile."
        active={pathname === "/settings"}
        onClick={() => go("/settings")}
      />

      <SidebarItem
        title="Account"
        desc="Calendar, fiscal period, voucher, taxation."
        active={isActive("/settings/account")}
        onClick={() => go("/settings/account")}
      />

      <SidebarItem
        title="Users"
        desc="Manage user and service provider."
        active={isActive("/settings/users")}
        onClick={() => go("/settings/users")}
      />

      {/* ================= MODULES ================= */}
      <div className="sidebar-label">Modules</div>

      <SidebarItem
        title="Modules"
        desc="Calendar, OPD, bill, lab, stock, IPD, HMIS."
        active={pathname === "/settings/modules"}
        onClick={() => go("/settings/modules")}
      />

      <SidebarItem
        title="Calendar & Client"
        desc="Manage calendar and client settings."
        active={isActive("/settings/modules/calendar-client")}
        onClick={() => go("/settings/modules/calendar-client")}
        indent
      />

      {/* ================= OTHERS ================= */}
      <div className="sidebar-label">Others</div>

      <SidebarItem
        title="Others"
        desc="Print, departments, medical reports, vitals, SMS, email."
        active={isActive("/settings/others")}
        onClick={() => go("/settings/others")}
      />

      <SidebarItem
        title="Vendors"
        desc="Suppliers, Referrers."
        active={isActive("/settings/vendors")}
        onClick={() => go("/settings/vendors")}
      />

      <SidebarItem
        title="Payments"
        desc="Subscription and SMS payments."
        active={isActive("/settings/payments")}
        onClick={() => go("/settings/payments")}
      />

      <SidebarItem
        title="Subscription Information"
        desc="View your subscription."
        active={isActive("/settings/subscription")}
        onClick={() => go("/settings/subscription")}
      />
    </aside>
  );
}

/* ================= REUSABLE ITEM ================= */

function SidebarItem({
  title,
  desc,
  active,
  onClick,
  indent,
}: {
  title: string;
  desc: string;
  active: boolean;
  onClick: () => void;
  indent?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        textAlign: "left",
        padding: "10px 12px",
        marginTop: 6,
        marginLeft: indent ? 16 : 0,
        borderRadius: 8,
        background: active ? "#e6f4ef" : "transparent",
        border: "none",
        cursor: "pointer",
      }}
    >
      <div
        style={{
          fontWeight: active ? 600 : 500,
          fontSize: 14,
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontSize: 12,
          color: "#6b7280",
          marginTop: 2,
        }}
      >
        {desc}
      </div>
    </button>
  );
}
