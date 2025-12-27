"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import HeaderBar from "@/components/HeaderBar";
import { apiClient } from "@/lib/apiClient";

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
        // ✅ Using apiClient for GET request
        const data = await apiClient<any>("/api/settings/account");
        
        if (!cancelled) {
          setAccount(data.account ?? { fiscalPeriods: [], vouchers: [] });
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
    setAccount((a) => ({ 
      ...a, 
      fiscalPeriods: a.fiscalPeriods.map((f) => (f.id === id ? { ...f, ...patch } : f)) 
    }));
  }
  function removeFiscal(id: string) {
    setAccount((a) => ({ 
      ...a, 
      fiscalPeriods: a.fiscalPeriods.filter((f) => f.id !== id) 
    }));
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
    setAccount((a) => ({ 
      ...a, 
      vouchers: a.vouchers.map((v) => (v.id === id ? { ...v, ...patch } : v)) 
    }));
  }
  function removeVoucher(id: string) {
    setAccount((a) => ({ 
      ...a, 
      vouchers: a.vouchers.filter((v) => v.id !== id) 
    }));
  }

  async function handleSave() {
    setSaving(true);
    setError(null);
    try {
      // ✅ Using apiClient for POST request
      const data = await apiClient<any>("/api/settings/account", {
        method: "POST",
        body: JSON.stringify({ account }),
      });
      
      setAccount(data.account ?? account);
      alert("Settings saved successfully");
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
          {/* Left Navigation */}
          <aside style={{ width: 260, background: "#fff", borderRadius: 8, padding: 16, boxShadow: "0 6px 18px rgba(0,0,0,0.04)" }}>
            <div style={{ fontWeight: 700, marginBottom: 12 }}>Company Profile</div>
            <div style={{ color: "#6b7280", fontSize: 13 }}>Manage your company profile.</div>
            <nav style={{ marginTop: 20 }}>
              <div 
                style={{ padding: "8px 6px", borderRadius: 6, background: activeTab === "fiscal" ? "#e6f4ef" : "transparent", cursor: "pointer", fontSize: 14 }} 
                onClick={() => setActiveTab("fiscal")}
              >
                Account (Fiscal Period)
              </div>
              <div 
                style={{ padding: "8px 6px", borderRadius: 6, background: activeTab === "vouchers" ? "#e6f4ef" : "transparent", cursor: "pointer", marginTop: 6, fontSize: 14 }} 
                onClick={() => setActiveTab("vouchers")}
              >
                Voucher Number
              </div>
              <div style={{ padding: "8px 6px", marginTop: 12, color: "#9ca3af", fontSize: 12 }}>
                More sections coming soon...
              </div>
            </nav>
          </aside>

          {/* Main Content Area */}
          <section style={{ flex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <h2 style={{ margin: 0, fontSize: 20 }}>Account Setting</h2>
              <button 
                onClick={handleSave} 
                disabled={saving} 
                style={{ 
                  padding: "8px 24px", 
                  borderRadius: 6, 
                  background: "#0b7a53", 
                  color: "#fff", 
                  border: "none", 
                  fontWeight: 600,
                  cursor: saving ? "not-allowed" : "pointer",
                  opacity: saving ? 0.7 : 1
                }}
              >
                {saving ? "Saving..." : "SAVE"}
              </button>
            </div>

            {loading ? (
              <div style={{ padding: 40, textAlign: "center", background: "#fff", borderRadius: 8 }}>Loading settings...</div>
            ) : error ? (
              <div style={{ color: "#dc2626", padding: 16, background: "#fee2e2", borderRadius: 8, marginBottom: 12 }}>{error}</div>
            ) : (
              <div style={{ background: "#fff", borderRadius: 8, padding: 20, boxShadow: "0 6px 18px rgba(0,0,0,0.04)" }}>
                {/* Tabs */}
                <div style={{ display: "flex", gap: 24, borderBottom: "1px solid #eee", paddingBottom: 0, marginBottom: 16 }}>
                  <div 
                    style={{ 
                      cursor: "pointer", 
                      paddingBottom: 12, 
                      borderBottom: activeTab === "fiscal" ? "3px solid #0b7a53" : "3px solid transparent", 
                      color: activeTab === "fiscal" ? "#0b7a53" : "#6b7280",
                      fontWeight: activeTab === "fiscal" ? 700 : 500
                    }} 
                    onClick={() => setActiveTab("fiscal")}
                  >
                    FISCAL PERIOD
                  </div>
                  <div 
                    style={{ 
                      cursor: "pointer", 
                      paddingBottom: 12, 
                      borderBottom: activeTab === "vouchers" ? "3px solid #0b7a53" : "3px solid transparent", 
                      color: activeTab === "vouchers" ? "#0b7a53" : "#6b7280",
                      fontWeight: activeTab === "vouchers" ? 700 : 500
                    }} 
                    onClick={() => setActiveTab("vouchers")}
                  >
                    VOUCHER NUMBER
                  </div>
                </div>

                {/* Fiscal Period tab */}
                {activeTab === "fiscal" && (
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                      <div style={{ fontWeight: 700 }}>Fiscal Period List</div>
                      <button onClick={addFiscal} style={{ padding: "6px 12px", borderRadius: 6, border: "1px solid #0b7a53", color: "#0b7a53", background: "#fff", cursor: "pointer", fontSize: 13 }}>
                        + Add Period
                      </button>
                    </div>

                    {account.fiscalPeriods.length === 0 ? (
                      <div style={{ color: "#6b7280", padding: 32, textAlign: "center", border: "1px dashed #e5e7eb", borderRadius: 8 }}>
                        No fiscal periods defined.
                      </div>
                    ) : (
                      <div style={{ display: "grid", gap: 12 }}>
                        {account.fiscalPeriods.map((f) => (
                          <div key={f.id} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 120px", gap: 12, alignItems: "center", padding: 12, border: "1px solid #f3f4f6", borderRadius: 8 }}>
                            <div>
                              <label style={{ fontSize: 11, color: "#777", display: "block", marginBottom: 4 }}>Fiscal Year</label>
                              <input value={f.fiscalYear || ""} onChange={(e) => updateFiscal(f.id, { fiscalYear: e.target.value })} placeholder="e.g. 2080/81" style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #e5e7eb" }} />
                            </div>
                            <div>
                              <label style={{ fontSize: 11, color: "#777", display: "block", marginBottom: 4 }}>Start Date</label>
                              <input type="date" value={(f.startDate || "").slice(0, 10)} onChange={(e) => updateFiscal(f.id, { startDate: e.target.value })} style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #e5e7eb" }} />
                            </div>
                            <div>
                              <label style={{ fontSize: 11, color: "#777", display: "block", marginBottom: 4 }}>End Date</label>
                              <input type="date" value={(f.endDate || "").slice(0, 10)} onChange={(e) => updateFiscal(f.id, { endDate: e.target.value })} style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #e5e7eb" }} />
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "flex-end" }}>
                              <label style={{ fontSize: 12, display: "flex", alignItems: "center", gap: 4 }}>
                                <input type="checkbox" checked={!!f.active} onChange={(e) => updateFiscal(f.id, { active: e.target.checked })} /> Active
                              </label>
                              <button onClick={() => removeFiscal(f.id)} style={{ background: "transparent", border: "none", color: "#dc2626", cursor: "pointer", fontSize: 12 }}>Remove</button>
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
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                      <div style={{ fontWeight: 700 }}>Voucher Configuration</div>
                      <button onClick={addVoucher} style={{ padding: "6px 12px", borderRadius: 6, border: "1px solid #0b7a53", color: "#0b7a53", background: "#fff", cursor: "pointer", fontSize: 13 }}>
                        + Create Voucher
                      </button>
                    </div>

                    {account.vouchers.length === 0 ? (
                      <div style={{ color: "#6b7280", padding: 32, textAlign: "center", border: "1px dashed #e5e7eb", borderRadius: 8 }}>
                        No voucher configurations found.
                      </div>
                    ) : (
                      <div style={{ overflowX: "auto" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                          <thead>
                            <tr style={{ textAlign: "left", borderBottom: "2px solid #f3f4f6", color: "#6b7280" }}>
                              <th style={{ padding: "12px 8px" }}>Type</th>
                              <th style={{ padding: "12px 8px" }}>Code</th>
                              <th style={{ padding: "12px 8px" }}>Fiscal</th>
                              <th style={{ padding: "12px 8px" }}>Prefix</th>
                              <th style={{ padding: "12px 8px" }}>Start</th>
                              <th style={{ padding: "12px 8px" }}>End</th>
                              <th style={{ padding: "12px 8px" }}>Sample</th>
                              <th style={{ padding: "12px 8px" }}></th>
                            </tr>
                          </thead>
                          <tbody>
                            {account.vouchers.map((v) => (
                              <tr key={v.id} style={{ borderBottom: "1px solid #f9fafb" }}>
                                <td style={{ padding: "8px 4px" }}><input value={v.type || ""} onChange={(e) => updateVoucher(v.id, { type: e.target.value })} style={{ width: 80, padding: 6, borderRadius: 4, border: "1px solid #e5e7eb" }} /></td>
                                <td style={{ padding: "8px 4px" }}><input value={v.code || ""} onChange={(e) => updateVoucher(v.id, { code: e.target.value })} style={{ width: 60, padding: 6, borderRadius: 4, border: "1px solid #e5e7eb" }} /></td>
                                <td style={{ padding: "8px 4px" }}><input value={v.fiscal || ""} onChange={(e) => updateVoucher(v.id, { fiscal: e.target.value })} style={{ width: 80, padding: 6, borderRadius: 4, border: "1px solid #e5e7eb" }} /></td>
                                <td style={{ padding: "8px 4px" }}><input value={v.prefix || ""} onChange={(e) => updateVoucher(v.id, { prefix: e.target.value })} style={{ width: 60, padding: 6, borderRadius: 4, border: "1px solid #e5e7eb" }} /></td>
                                <td style={{ padding: "8px 4px" }}><input type="number" value={String(v.startVoucher || "")} onChange={(e) => updateVoucher(v.id, { startVoucher: Number(e.target.value || 0) })} style={{ width: 60, padding: 6, borderRadius: 4, border: "1px solid #e5e7eb" }} /></td>
                                <td style={{ padding: "8px 4px" }}><input type="number" value={String(v.endVoucher || "")} onChange={(e) => updateVoucher(v.id, { endVoucher: Number(e.target.value || 0) })} style={{ width: 60, padding: 6, borderRadius: 4, border: "1px solid #e5e7eb" }} /></td>
                                <td style={{ padding: "8px 4px" }}><input value={v.sampleDisplay || ""} onChange={(e) => updateVoucher(v.id, { sampleDisplay: e.target.value })} placeholder="INV-001" style={{ width: 100, padding: 6, borderRadius: 4, border: "1px solid #e5e7eb" }} /></td>
                                <td style={{ padding: "8px 4px" }}>
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