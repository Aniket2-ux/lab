"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../components/Sidebar";
import HeaderBar from "../../components/HeaderBar";

export default function StockPage() {
  const router = useRouter();

  // Auth check
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/");
  }, [router]);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main area */}
      <main style={{ flex: 1, padding: 24, background: "#f5f7fb" }}>
        {/* Subscription bar + Title */}
        <HeaderBar pageTitle="Stock" />

        {/* Top Tabs */}
        <div style={{ display: "flex", gap: 18, marginBottom: 20 }}>
          {["For Sales", "For Internal Use", "Transactions", "Purchase Draft"].map((tab) => (
            <button
              key={tab}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: 14,
                color: "#444",
                fontWeight: 500,
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Categories */}
        <div style={{ display: "flex", gap: 18, marginBottom: 20 }}>
          {["All", "Medicine", "Supplements", "Kits", "Derma", "Surgical", "Hair", "Other"].map(
            (cat, i) => (
              <span
                key={cat}
                style={{
                  fontWeight: i === 0 ? 700 : 400,
                  borderBottom: i === 0 ? "2px solid #0b7a53" : "none",
                  cursor: "pointer",
                  paddingBottom: 6,
                }}
              >
                {cat}
              </span>
            )
          )}
        </div>

        {/* Table UI */}
        <div
          style={{
            background: "#fff",
            borderRadius: 12,
            padding: 16,
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          }}
        >
          {/* Search + Button Area */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 14,
            }}
          >
            <input
              type="text"
              placeholder="Search product or code..."
              style={{
                width: 260,
                padding: 8,
                borderRadius: 6,
                border: "1px solid #ccc",
                fontSize: 14,
              }}
            />

            <button
              style={{
                padding: "8px 16px",
                borderRadius: 6,
                background: "#0b7a53",
                color: "#fff",
                border: "none",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              + ENTER PURCHASE
            </button>
          </div>

          {/* Table Headers */}
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: 14,
            }}
          >
            <thead>
              <tr style={{ background: "#f4f6f8", textAlign: "left" }}>
                <th style={cellHead}>NAME</th>
                <th style={cellHead}>QTY</th>
                <th style={cellHead}>GENERIC NAME</th>
                <th style={cellHead}>UNIT/PACKAGE</th>
                <th style={cellHead}>IS NARCOTICS</th>
                <th style={cellHead}>EXPIRY DATE</th>
                <th style={cellHead}>PRODUCT CODE</th>
                <th style={cellHead}>DEPARTMENT</th>
                <th style={cellHead}>IS CENTRAL STORE</th>
              </tr>
            </thead>

            {/* Dummy Empty UI */}
            <tbody>
              <tr>
                <td
                  colSpan={9}
                  style={{
                    textAlign: "center",
                    padding: "40px 0",
                    color: "#999",
                  }}
                >
                  📦 No stock items yet
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

const cellHead: React.CSSProperties = {
  padding: "10px 12px",
  fontWeight: 600,
  fontSize: 13,
  color: "#333",
};
