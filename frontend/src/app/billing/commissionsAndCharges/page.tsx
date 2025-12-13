"use client";

import React from "react";
import Sidebar from "@/components/Sidebar";
import HeaderBar from "@/components/HeaderBar";

/**
 * SP & Referral Commissions page for:
 *  GET /billing/commissionsAndCharges
 *
 * Place this file at:
 *   frontend/src/app/billing/commissionsAndCharges/page.tsx
 *
 * This is a client component and intentionally UI-only (no backend wiring).
 */

export default function SpReferralPage() {
  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Sidebar />

      <main style={{ flex: 1, padding: 24, background: "#f5f7fb", overflowY: "auto" }}>
        <HeaderBar pageTitle="Billing" />

        {/* top small tabs */}
        <div style={{ marginTop: 8, marginBottom: 12 }}>
          <div style={{ display: "flex", gap: 16, alignItems: "center", fontSize: 14 }}>
            <div style={{ cursor: "pointer", color: "#6b7280" }}>New Bill</div>
            <div style={{ cursor: "pointer", color: "#6b7280" }}>Previous</div>
            <div style={{ cursor: "default", color: "#0b7a53", fontWeight: 700, borderBottom: "3px solid #0b7a53", paddingBottom: 6 }}>
              SP and Referral Commissions
            </div>
          </div>
        </div>

        <div style={{ background: "#fff", borderRadius: 10, boxShadow: "0 4px 12px rgba(0,0,0,0.05)", padding: 20 }}>
          {/* top row: search, client filter, create */}
          <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1 }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                padding: "8px 12px",
                borderRadius: 6,
                border: "1px solid #e5e7eb",
                background: "#fff",
                width: "100%"
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.6 }}>
                  <path d="M21 21l-4.35-4.35" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16z" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <input
                  placeholder="Search..."
                  style={{ border: "none", outline: "none", marginLeft: 10, flex: 1, fontSize: 14 }}
                />
              </div>
            </div>

            <select style={{ padding: "8px 12px", borderRadius: 6, border: "1px solid #e5e7eb", background: "#fff" }}>
              <option value="">CLIENT</option>
              {/* dynamic client options go here */}
            </select>

            <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
              <button
                type="button"
                style={{
                  padding: "8px 12px",
                  borderRadius: 6,
                  border: "1px solid #0b7a53",
                  background: "#0b7a53",
                  color: "#fff",
                  fontWeight: 600,
                  cursor: "pointer"
                }}
              >
                CREATE NEW
              </button>

              <button
                type="button"
                aria-label="Export"
                style={{
                  padding: "8px 10px",
                  borderRadius: 6,
                  border: "1px solid #e5e7eb",
                  background: "#fff",
                  cursor: "pointer"
                }}
              >
                📄
              </button>
            </div>
          </div>

          {/* small status tabs row */}
          <div style={{ display: "flex", gap: 12, marginBottom: 12, alignItems: "center", borderBottom: "1px solid #eee", paddingBottom: 8 }}>
            {["Billed", "Credited", "Draft", "Cancelled", "Proforma Draft", "All"].map((s) => (
              <div key={s} style={{ cursor: "pointer", paddingBottom: 8, color: s === "Billed" ? "#0b7a53" : "#6b7280", fontWeight: s === "Billed" ? 700 : 500 }}>
                {s}
              </div>
            ))}
          </div>

          {/* table header */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr 1fr 1fr 1fr 1fr", gap: 12, alignItems: "center", fontWeight: 700, padding: "8px 6px", borderBottom: "1px solid #eee" }}>
            <div>BILL NUMBER</div>
            <div>CLIENT</div>
            <div>DATE</div>
            <div style={{ textAlign: "right" }}>TOTAL AMOUNT</div>
            <div style={{ textAlign: "right" }}>PAID AMT.</div>
            <div style={{ textAlign: "center" }}>DUE AMT.</div>
          </div>

          {/* empty state (centered) */}
          <div style={{ minHeight: 360, display: "flex", alignItems: "center", justifyContent: "center", padding: 28 }}>
            <div style={{ textAlign: "center", color: "#6b7280" }}>
              <svg width="220" height="150" viewBox="0 0 220 150" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <rect x="10" y="10" rx="6" width="200" height="18" fill="#e6f4ef"/>
                <rect x="18" y="14" width="120" height="10" rx="4" fill="#bfead7"/>
                <rect x="10" y="36" rx="6" width="200" height="18" fill="#e6f4ef"/>
                <rect x="18" y="40" width="150" height="10" rx="4" fill="#bfead7"/>
                <rect x="10" y="62" rx="6" width="200" height="18" fill="#e6f4ef"/>
                <rect x="18" y="66" width="100" height="10" rx="4" fill="#bfead7"/>
                <rect x="10" y="88" rx="6" width="200" height="18" fill="#e6f4ef"/>
                <rect x="18" y="92" width="170" height="10" rx="4" fill="#bfead7"/>
                <rect x="10" y="114" rx="6" width="200" height="18" fill="#e6f4ef"/>
                <rect x="18" y="118" width="80" height="10" rx="4" fill="#bfead7"/>
              </svg>

              <div style={{ fontSize: 14, marginTop: 18 }}>There are no items to display...</div>
            </div>
          </div>

          {/* footer / pagination */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 12 }}>
            <div style={{ color: "#6b7280" }}>Showing 0 - 0 of 0</div>
            <div style={{ display: "flex", gap: 8 }}>
              <button disabled style={{ padding: "8px 12px", borderRadius: 6, border: "1px solid #e5e7eb", background: "#fff" }}>◀︎</button>
              <div style={{ minWidth: 36, textAlign: "center", color: "#6b7280" }}>1</div>
              <button disabled style={{ padding: "8px 12px", borderRadius: 6, border: "1px solid #e5e7eb", background: "#fff" }}>▶︎</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
