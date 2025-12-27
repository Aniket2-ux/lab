"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import HeaderBar from "@/components/HeaderBar";
import { apiClient } from "@/lib/apiClient";

type DateInfo = {
  formattedDate: string;
  formattedSubDate: string;
  time: string;
};

type CardProps = {
  title: string;
  value: string | number;
  icon?: string;
};

type Stats = {
  todayPrescriptions: number;
  totalPrescriptions: number;
  revenueToday: number;
  revenueTotal: number;
  invoiceCount: number;
};

const getToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
};

export default function DashboardPage() {
  const router = useRouter();

  const [health, setHealth] = useState("Checking...");
  const [dateInfo, setDateInfo] = useState<DateInfo | null>(null);
  const [stats, setStats] = useState<Stats>({
    todayPrescriptions: 0,
    totalPrescriptions: 0,
    revenueToday: 0,
    revenueTotal: 0,
    invoiceCount: 0,
  });

  // protect route (require token)
  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.replace("/");
      return;
    }
  }, [router]);

  // load backend health + stats (prescription counts + billing summary)
  useEffect(() => {
    const token = getToken();
    if (!token) return;

    const load = async () => {
      try {
        // 1. Health check
        const healthData = await apiClient<{ message: string }>("/api/health");
        setHealth(healthData.message || "OK");

        // 2. Fetch Prescriptions and Billing in parallel
        const [presData, summaryData] = await Promise.all([
          apiClient<any>("/api/prescriptions/count"),
          apiClient<any>("/api/billing/summary"),
        ]);

        // 3. Process Prescriptions
        const todayPrescriptions = presData.todayCount ?? 0;
        const totalPrescriptions = presData.totalCount ?? 0;

        // 4. Process Billing (supporting multiple response shapes from your fix)
        const revenueToday =
          summaryData.todaySales ??
          summaryData.todayRevenue ??
          summaryData.todayRevenueAmount ??
          0;
        const revenueTotal =
          summaryData.totalSales ??
          summaryData.totalRevenue ??
          summaryData.totalRevenueAmount ??
          0;
        const invoiceCount = summaryData.invoiceCount ?? summaryData.count ?? 0;

        setStats({
          todayPrescriptions,
          totalPrescriptions,
          revenueToday: Number(revenueToday) || 0,
          revenueTotal: Number(revenueTotal) || 0,
          invoiceCount: Number(invoiceCount) || 0,
        });
      } catch (err: any) {
        console.error("Error loading dashboard data:", err);
        setHealth("Backend not reachable");
      }
    };

    load();
  }, []);

  // date/time — populate only on client after mount to avoid SSR hydration mismatch
  useEffect(() => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const formattedSubDate = now.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const time = now.toLocaleTimeString("en-GB").slice(0, 5);
    setDateInfo({ formattedDate, formattedSubDate, time });
  }, []);

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Sidebar />

      <main
        style={{
          flex: 1,
          padding: 24,
          background: "#f5f7fb",
          overflowY: "auto",
        }}
      >
        <HeaderBar pageTitle="Dashboard" />

        {/* Top bar (date + create bill) */}
        <div
          style={{
            background: "#fff",
            borderRadius: 10,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
            padding: 16,
            marginBottom: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            {dateInfo ? (
              <>
                <div>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      textTransform: "uppercase",
                    }}
                  >
                    {dateInfo.formattedDate}
                  </div>
                  <div style={{ fontSize: 12, color: "#777" }}>
                    {dateInfo.formattedSubDate}
                  </div>
                </div>
                <div style={{ fontSize: 12, color: "#777" }}>
                  <span style={{ fontWeight: 600 }}>Last Updated: </span>
                  <span>{dateInfo.time}</span>
                </div>
              </>
            ) : (
              <>
                <div style={{ minWidth: 260 }}>
                  <div
                    style={{
                      height: 18,
                      width: 260,
                      background: "#f3f4f6",
                      borderRadius: 4,
                    }}
                  />
                  <div
                    style={{
                      height: 12,
                      width: 160,
                      marginTop: 6,
                      background: "#f3f4f6",
                      borderRadius: 4,
                    }}
                  />
                </div>
                <div style={{ fontSize: 12, color: "#777" }}>
                  <div
                    style={{
                      height: 12,
                      width: 80,
                      background: "#f3f4f6",
                      borderRadius: 4,
                    }}
                  />
                </div>
              </>
            )}
          </div>

          <button
            onClick={() => router.push("/billing")}
            style={{
              padding: "10px 18px",
              borderRadius: 6,
              border: "none",
              background: "#0b7a53",
              color: "#fff",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            CREATE BILL
          </button>
        </div>

        {/* Row 1 – OPD cards + Patient Flow */}
        <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
          <div
            style={{
              flex: 1,
              background: "#fff",
              borderRadius: 10,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
              padding: 16,
            }}
          >
            <h3 style={{ marginTop: 0, marginBottom: 12 }}>OPD</h3>
            <div style={{ display: "flex", gap: 16 }}>
              <DashboardCard
                title="Prescription Count (today)"
                value={stats.todayPrescriptions}
                icon="💊"
              />
              <DashboardCard
                title="Total Entries"
                value={stats.totalPrescriptions}
                icon="🔁"
              />
            </div>
          </div>

          <div
            style={{
              width: 360,
              background: "#fff",
              borderRadius: 10,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
              padding: 16,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <h3 style={{ margin: 0 }}>Patient Flow</h3>
              <div style={{ fontSize: 11, color: "#777" }}>
                <label style={{ marginRight: 8 }}>
                  <input type="checkbox" /> Show Follow Up Only
                </label>
                <label>
                  <input type="checkbox" /> Show By Status
                </label>
              </div>
            </div>

            <div
              style={{
                marginTop: 16,
                display: "flex",
                flexDirection: "column",
                gap: 6,
                alignItems: "center",
              }}
            >
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: 220,
                    height: 14,
                    background: "#e1f5ec",
                    borderRadius: 7,
                    display: "flex",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      flex: 1,
                      background: "#9ed8bd",
                      marginRight: 4,
                    }}
                  />
                  <div
                    style={{
                      flex: 2,
                      background: "#7fcdab",
                      marginRight: 4,
                    }}
                  />
                  <div style={{ flex: 1, background: "#61c29a" }} />
                </div>
              ))}
              <div style={{ fontSize: 12, color: "#777", marginTop: 8 }}>
                No bookings
              </div>
            </div>
          </div>
        </div>

        {/* Row 2 – Revenue + Appointments */}
        <div style={{ display: "flex", gap: 16, marginBottom: 32 }}>
          <div
            style={{
              flex: 1.3,
              background: "#fff",
              borderRadius: 10,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
              padding: 16,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                marginBottom: 8,
              }}
            >
              <h3 style={{ margin: 0 }}>Revenue</h3>
              <div style={{ fontSize: 12, color: "#777" }}>
                Backend health: {health}
              </div>
            </div>

            <div style={{ display: "flex", gap: 24, marginBottom: 16 }}>
              <div>
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: "#0b7a53",
                    display: "inline-block",
                    marginRight: 6,
                  }}
                />
                <span style={{ fontSize: 13 }}>Today</span>
                <div style={{ fontWeight: 600 }}>
                  ₹ {stats.revenueToday.toFixed(2)}
                </div>
              </div>
              <div>
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: "#7fcdab",
                    display: "inline-block",
                    marginRight: 6,
                  }}
                />
                <span style={{ fontSize: 13 }}>Total</span>
                <div style={{ fontWeight: 600 }}>
                  ₹ {stats.revenueTotal.toFixed(2)}
                </div>
              </div>
            </div>

            <div
              style={{
                height: 220,
                borderRadius: 12,
                background:
                  "linear-gradient(180deg, rgba(11,122,83,0.35), rgba(11,122,83,0.05))",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: 0,
                  height: "60%",
                  background:
                    "radial-gradient(circle at 10% 90%, rgba(11,122,83,0.4) 0, transparent 55%), " +
                    "radial-gradient(circle at 50% 40%, rgba(11,122,83,0.5) 0, transparent 55%), " +
                    "radial-gradient(circle at 90% 80%, rgba(11,122,83,0.4) 0, transparent 55%)",
                }}
              />
            </div>
          </div>

          <div
            style={{
              flex: 0.9,
              background: "#fff",
              borderRadius: 10,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
              padding: 16,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 12,
              }}
            >
              <h3 style={{ margin: 0 }}>Appointments</h3>
              <label style={{ fontSize: 12, color: "#777" }}>
                <input type="checkbox" /> Show Follow Up Only
              </label>
            </div>

            <div
              style={{
                marginTop: 16,
                display: "flex",
                flexDirection: "column",
                gap: 6,
                alignItems: "center",
              }}
            >
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: 220,
                    height: 14,
                    background: "#e1f5ec",
                    borderRadius: 7,
                    display: "flex",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      flex: 1,
                      background: "#9ed8bd",
                      marginRight: 4,
                    }}
                  />
                  <div
                    style={{
                      flex: 2,
                      background: "#7fcdab",
                      marginRight: 4,
                    }}
                  />
                  <div style={{ flex: 1, background: "#61c29a" }} />
                </div>
              ))}
              <div style={{ fontSize: 12, color: "#777", marginTop: 8 }}>
                No appointments today
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function DashboardCard({ title, value, icon }: CardProps) {
  return (
    <div
      style={{
        flex: 1,
        background: "#fff",
        borderRadius: 10,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
        padding: 16,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          background: "#e1f5ec",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 8,
          fontSize: 18,
        }}
      >
        {icon || "🩺"}
      </div>
      <div style={{ fontSize: 13, color: "#555", textAlign: "center" }}>
        {title}
      </div>
      <div style={{ marginTop: 4, fontSize: 18, fontWeight: 700 }}>
        {String(value)}
      </div>
    </div>
  );
}