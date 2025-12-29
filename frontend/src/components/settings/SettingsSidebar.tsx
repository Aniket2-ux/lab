"use client";

import { usePathname, useRouter } from "next/navigation";

export default function SettingsSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const go = (path: string) => router.push(path);

  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(path + "/");

  return (
    <aside className="settings-sidebar">

      {/* ================= COMPANY ================= */}
      <div className="sidebar-label">Company</div>

      <button
        className={`sidebar-item ${
          pathname === "/settings" ? "active" : ""
        }`}
        onClick={() => go("/settings")}
      >
        <div className="sidebar-title">Company Profile</div>
        <div className="sidebar-desc">Manage your company profile.</div>
      </button>

      <button
        className={`sidebar-item ${
          isActive("/settings/account") ? "active" : ""
        }`}
        onClick={() => go("/settings/account")}
      >
        <div className="sidebar-title">Account</div>
        <div className="sidebar-desc">
          Calendar, fiscal period, voucher, taxation.
        </div>
      </button>

      <button
        className={`sidebar-item ${
          isActive("/settings/users") ? "active" : ""
        }`}
        onClick={() => go("/settings/users")}
      >
        <div className="sidebar-title">Users</div>
        <div className="sidebar-desc">
          Manage user and service provider.
        </div>
      </button>

      {/* ================= MODULES ================= */}
      <div className="sidebar-label">Modules</div>

      <button
        className={`sidebar-item ${
          isActive("/settings/modules") &&
          !isActive("/settings/modules/calendar-client")
            ? "active"
            : ""
        }`}
        onClick={() => go("/settings/modules")}
      >
        <div className="sidebar-title">Modules</div>
        <div className="sidebar-desc">
          Calendar, OPD, bill, lab, stock, IPD, HMIS.
        </div>
      </button>

      {/* ✅ NEW: Calendar & Client */}
      <button
        className={`sidebar-item ${
          isActive("/settings/modules/calendar-client") ? "active" : ""
        }`}
        onClick={() => go("/settings/modules/calendar-client")}
      >
        <div className="sidebar-title">Calendar & Client</div>
        <div className="sidebar-desc">
          Manage calendar and client settings.
        </div>
      </button>

      {/* ================= OTHERS ================= */}
      <div className="sidebar-label">Others</div>

      <button
        className={`sidebar-item ${
          isActive("/settings/others") ? "active" : ""
        }`}
        onClick={() => go("/settings/others")}
      >
        <div className="sidebar-title">Others</div>
        <div className="sidebar-desc">
          Print, departments, medical reports, vitals, SMS, email, Survey Form.
        </div>
      </button>

      <button
        className={`sidebar-item ${
          isActive("/settings/vendors") ? "active" : ""
        }`}
        onClick={() => go("/settings/vendors")}
      >
        <div className="sidebar-title">Vendors</div>
        <div className="sidebar-desc">Suppliers, Referrers</div>
      </button>

      <button
        className={`sidebar-item ${
          isActive("/settings/payments") ? "active" : ""
        }`}
        onClick={() => go("/settings/payments")}
      >
        <div className="sidebar-title">Payments</div>
        <div className="sidebar-desc">
          Subscription and SMS payments.
        </div>
      </button>

      <button
        className={`sidebar-item ${
          isActive("/settings/subscription") ? "active" : ""
        }`}
        onClick={() => go("/settings/subscription")}
      >
        <div className="sidebar-title">Subscription Information</div>
        <div className="sidebar-desc">View your subscription.</div>
      </button>

    </aside>
  );
}
