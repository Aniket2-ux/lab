"use client";

import { useRouter } from "next/navigation";

type ModuleItem = {
  title: string;
  desc: string;
  path?: string;
};

export default function ModulesPage() {
  const router = useRouter();

  const modules: ModuleItem[] = [
    {
      title: "Calendar and Client",
      desc: "Manage calendar and client settings",
      path: "/settings/modules/calendar-client",
    },
    {
      title: "OPD",
      desc: "Manage OPD settings",
      path: "/settings/modules/opd",
    },
    {
      title: "Lab",
      desc: "Manage lab settings",
      path: "/settings/modules/lab",
    },
    {
      title: "Billing",
      desc: "Manage billing settings",
      path: "/settings/modules/billing",
    },
    {
      title: "Stock",
      desc: "Manage stock settings",
      path: "/settings/modules/stock",
    },
    {
      title: "IPD",
      desc: "Manage IPD settings",
      path: "/settings/modules/ipd",
    },
    {
      title: "HMIS",
      desc: "Manage HMIS settings",
      path: "/settings/modules/hmis",
    },
  ];

  return (
    <div>
      <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16 }}>
        Module Settings
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 16,
        }}
      >
        {modules.map((m) => (
          <div
            key={m.title}
            onClick={() => m.path && router.push(m.path)}
            style={{
              background: "#fff",
              borderRadius: 10,
              padding: 16,
              border: "1px solid #e5e7eb",
              cursor: m.path ? "pointer" : "default",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow =
                "0 8px 24px rgba(0,0,0,0.08)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.boxShadow = "none")
            }
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h3 style={{ fontSize: 15, fontWeight: 600 }}>{m.title}</h3>
              <span style={{ fontSize: 18 }}>›</span>
            </div>

            <p
              style={{
                fontSize: 13,
                color: "#6b7280",
                marginTop: 6,
              }}
            >
              {m.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
