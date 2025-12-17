// frontend/src/app/settings/account/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import HeaderBar from "@/components/HeaderBar";

type FiscalPeriod = {
  id: string;
  fiscalYear?: string;
  startDate?: string;
  endDate?: string;
  active?: boolean;
};

type VoucherRow = {
  id: string;
  type?: string;
  code?: string;
  fiscal?: string;
  prefix?: string;
  startVoucher?: number | string;
  endVoucher?: number | string;
  sampleDisplay?: string;
  nextFiscal?: string;
};

type AccountSettings = {
  fiscalPeriods: FiscalPeriod[];
  vouchers: VoucherRow[];
};

const API_BASE = (process.env.NEXT_PUBLIC_API_BASE as string) || "http://localhost:5000";

export default function AccountSettingsPage() {
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<"fiscal" | "vouchers">("fiscal");
  const [account, setAccount] = useState<AccountSettings>({ fiscalPeriods: [], vouchers: [] });

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE}/api/settings/account`, { cache: "no-store" });
        if (!res.ok) {
          const t = await res.text().catch(() => "");
          throw new Error(t || `HTTP ${res.status}`);
        }
        const json = await res.json();
        if (!cancelled) {
          setAccount(json.account ?? { fiscalPeriods: [], vouchers: [] });
        }
      } catch (e: any) {
        console.error("load account settings failed", e);
        if (!cancelled) setError(e?.message || "Failed to load account settings");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  // helpers to update local state
  function addFiscal() {
    setAccount((a) => ({
      ...a,
      fiscalPeriods: [
        ...a.fiscalPeriods,
        { id: String(Date.now()), fiscalYear: "", startDate: "", endDate: "", active: false },
      ],
    }));
  }
  function updateFiscal(id: string, patch: Partial<FiscalPeriod>) {
    setAccount((a) => ({ ...a, fiscalPeriods: a.fiscalPeriods.map((f) => (f.id === id ? { ...f, ...patch } : f)) }));
  }
  function removeFiscal(id: string) {
    setAccount((a) => ({ ...a, fiscalPeriods: a.fiscalPeriods.filter((f) => f.id !== id) }));
  }

  function addVoucher() {
    setAccount((a) => ({
      ...a,
      vouchers: [
        ...a.vouchers,
        {
          id: String(Date.now()),
          type: "",
          code: "",
          fiscal: "",
          prefix: "",
          startVoucher: 1,
          endVoucher: 1,
          sampleDisplay: "",
          nextFiscal: "",
        },
      ],
    }));
  }
  function updateVoucher(id: string, patch: Partial<VoucherRow>) {
    setAccount((a) => ({ ...a, vouchers: a.vouchers.map((v) => (v.id === id ? { ...v, ...patch } : v)) }));
  }
  function removeVoucher(id: string) {
    setAccount((a) => ({ ...a, vouchers: a.vouchers.filter((v) => v.id !== id) }));
  }

  async function handleSave() {
    setSaving(true);
    setError(null);
    try {
      const body = { account };
      const res = await fetch(`${API_BASE}/api/settings/account`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const t = await res.text().catch(() => "");
        throw new Error(t || `HTTP ${res.status}`);
      }
      const json = await res.json();
      setAccount(json.account ?? account);
    } catch (e: any) {
      console.error("save failed", e);
      setError(e?.message || "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <main style={{ flex: 1, padding: 24, background: "#f5f7fb", overflowY: "auto" }}>
        <HeaderBar pageTitle="Settings" />

        <div style={{ marginTop: 12, display: "flex", gap: 16 }}>
          {/* left nav (looks like your screenshot) */}
          <aside style={{ width: 260, background: "#fff", borderRadius: 8, padding: 16, boxShadow: "0 6px 18px rgba(0,0,0,0.04)" }}>
            <div style={{ fontWeight: 700, marginBottom: 12 }}>Company Profile</div>
            <div style={{ color: "#6b7280", fontSize: 13 }}>Manage your company profile.</div>
            <nav style={{ marginTop: 20 }}>
              <div style={{ padding: "8px 6px", borderRadius: 6, background: activeTab === "fiscal" ? "#e6f4ef" : "transparent", cursor: "pointer" }} onClick={() => setActiveTab("fiscal")}>Account (Fiscal Period)</div>
              <div style={{ padding: "8px 6px", borderRadius: 6, background: activeTab === "vouchers" ? "#e6f4ef" : "transparent", cursor: "pointer", marginTop: 6 }} onClick={() => setActiveTab("vouchers")}>Voucher Number</div>
              <div style={{ padding: "8px 6px", marginTop: 12, color: "#6b7280" }}>Other sections (Users, Modules, Others...) — add later</div>
            </nav>
          </aside>

          {/* content */}
          <section style={{ flex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <h2 style={{ margin: 0 }}>Account Setting</h2>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={handleSave} disabled={saving} style={{ padding: "8px 12px", borderRadius: 6, background: "#0b7a53", color: "#fff", border: "none", cursor: "pointer" }}>
                  {saving ? "Saving..." : "SAVE"}
                </button>
              </div>
            </div>

            {loading ? (
              <div style={{ padding: 28 }}>Loading...</div>
            ) : error ? (
              <div style={{ color: "red", padding: 12 }}>{error}</div>
            ) : (
              <div style={{ background: "#fff", borderRadius: 8, padding: 20, boxShadow: "0 6px 18px rgba(0,0,0,0.04)" }}>
                {/* Tabs */}
                <div style={{ display: "flex", gap: 24, borderBottom: "1px solid #eee", paddingBottom: 12, marginBottom: 16 }}>
                  <div style={{ cursor: "pointer", paddingBottom: activeTab === "fiscal" ? 8 : 12, borderBottom: activeTab === "fiscal" ? "3px solid #0b7a53" : "3px solid transparent", color: activeTab === "fiscal" ? "#0b7a53" : "#6b7280" }} onClick={() => setActiveTab("fiscal")}>FISCAL PERIOD</div>
                  <div style={{ cursor: "pointer", paddingBottom: activeTab === "vouchers" ? 8 : 12, borderBottom: activeTab === "vouchers" ? "3px solid #0b7a53" : "3px solid transparent", color: activeTab === "vouchers" ? "#0b7a53" : "#6b7280" }} onClick={() => setActiveTab("vouchers")}>VOUCHER NUMBER</div>
                </div>

                {/* Fiscal Period tab */}
                {activeTab === "fiscal" && (
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                      <div style={{ fontWeight: 700 }}>Fiscal Period</div>
                      <div>
                        <button onClick={addFiscal} style={{ padding: "6px 10px", borderRadius: 6, border: "1px solid #e5e7eb", background: "#fff" }}>+ Add Period</button>
                      </div>
                    </div>

                    {account.fiscalPeriods.length === 0 ? (
                      <div style={{ color: "#6b7280", padding: 16 }}>No fiscal periods yet. Click "+ Add Period" to create one.</div>
                    ) : (
                      <div style={{ display: "grid", gap: 12 }}>
                        {account.fiscalPeriods.map((f) => (
                          <div key={f.id} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 80px", gap: 8, alignItems: "center", padding: 8, border: "1px solid #f3f4f6", borderRadius: 6 }}>
                            <input value={f.fiscalYear || ""} onChange={(e) => updateFiscal(f.id, { fiscalYear: e.target.value })} placeholder="Fiscal Year" style={{ padding: 8, borderRadius: 4, border: "1px solid #e5e7eb" }} />
                            <input type="date" value={(f.startDate || "").slice(0, 10)} onChange={(e) => updateFiscal(f.id, { startDate: e.target.value })} style={{ padding: 8, borderRadius: 4, border: "1px solid #e5e7eb" }} />
                            <input type="date" value={(f.endDate || "").slice(0, 10)} onChange={(e) => updateFiscal(f.id, { endDate: e.target.value })} style={{ padding: 8, borderRadius: 4, border: "1px solid #e5e7eb" }} />
                            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                              <label style={{ fontSize: 13 }}><input type="checkbox" checked={!!f.active} onChange={(e) => updateFiscal(f.id, { active: e.target.checked })} /> Active</label>
                              <button onClick={() => removeFiscal(f.id)} style={{ marginLeft: "auto", background: "transparent", border: "none", color: "#dc2626", cursor: "pointer" }}>Remove</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Voucher tab */}
                {activeTab === "vouchers" && (
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                      <div style={{ fontWeight: 700 }}>Accounting Vouchers</div>
                      <div>
                        <button onClick={addVoucher} style={{ padding: "6px 10px", borderRadius: 6, border: "1px solid #e5e7eb", background: "#fff" }}>+ Create Voucher</button>
                      </div>
                    </div>

                    {account.vouchers.length === 0 ? (
                      <div style={{ color: "#6b7280", padding: 16 }}>No vouchers yet. Click "Create Voucher" to add entries.</div>
                    ) : (
                      <div style={{ overflowX: "auto" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                          <thead>
                            <tr style={{ textAlign: "left", borderBottom: "1px solid #eee" }}>
                              <th style={{ padding: "8px 6px" }}>Voucher Type</th>
                              <th style={{ padding: "8px 6px" }}>Voucher Code</th>
                              <th style={{ padding: "8px 6px" }}>Fiscal</th>
                              <th style={{ padding: "8px 6px" }}>Prefix</th>
                              <th style={{ padding: "8px 6px" }}>Start</th>
                              <th style={{ padding: "8px 6px" }}>End</th>
                              <th style={{ padding: "8px 6px" }}>Sample Display</th>
                              <th style={{ padding: "8px 6px" }}>Next Fiscal</th>
                              <th style={{ padding: "8px 6px" }}></th>
                            </tr>
                          </thead>
                          <tbody>
                            {account.vouchers.map((v) => (
                              <tr key={v.id} style={{ borderBottom: "1px solid #fafafa" }}>
                                <td style={{ padding: 6 }}><input value={v.type || ""} onChange={(e) => updateVoucher(v.id, { type: e.target.value })} style={{ padding: 6, borderRadius: 4, border: "1px solid #e5e7eb" }} /></td>
                                <td style={{ padding: 6 }}><input value={v.code || ""} onChange={(e) => updateVoucher(v.id, { code: e.target.value })} style={{ padding: 6, borderRadius: 4, border: "1px solid #e5e7eb" }} /></td>
                                <td style={{ padding: 6 }}><input value={v.fiscal || ""} onChange={(e) => updateVoucher(v.id, { fiscal: e.target.value })} style={{ padding: 6, borderRadius: 4, border: "1px solid #e5e7eb" }} /></td>
                                <td style={{ padding: 6 }}><input value={v.prefix || ""} onChange={(e) => updateVoucher(v.id, { prefix: e.target.value })} style={{ padding: 6, borderRadius: 4, border: "1px solid #e5e7eb" }} /></td>
                                <td style={{ padding: 6 }}><input type="number" value={String(v.startVoucher || "")} onChange={(e) => updateVoucher(v.id, { startVoucher: Number(e.target.value || 0) })} style={{ padding: 6, borderRadius: 4, border: "1px solid #e5e7eb" }} /></td>
                                <td style={{ padding: 6 }}><input type="number" value={String(v.endVoucher || "")} onChange={(e) => updateVoucher(v.id, { endVoucher: Number(e.target.value || 0) })} style={{ padding: 6, borderRadius: 4, border: "1px solid #e5e7eb" }} /></td>
                                <td style={{ padding: 6 }}><input value={v.sampleDisplay || ""} onChange={(e) => updateVoucher(v.id, { sampleDisplay: e.target.value })} style={{ padding: 6, borderRadius: 4, border: "1px solid #e5e7eb" }} /></td>
                                <td style={{ padding: 6 }}><input value={v.nextFiscal || ""} onChange={(e) => updateVoucher(v.id, { nextFiscal: e.target.value })} style={{ padding: 6, borderRadius: 4, border: "1px solid #e5e7eb" }} /></td>
                                <td style={{ padding: 6 }}>
                                  <button onClick={() => removeVoucher(v.id)} style={{ background: "transparent", border: "none", color: "#dc2626", cursor: "pointer" }}>Delete</button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
