"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import HeaderBar from "@/components/HeaderBar";

type BillItem = {
  description?: string;
  dept?: string;
  qty?: number;
  unit?: string;
  rate?: number;
  amount?: number;
};

type Bill = {
  id: string | number;
  billNumber?: string;
  clientName?: string;
  clientPhone?: string;
  clientAge?: number | null;
  clientGender?: string | null;
  createdAt?: string;
  issueDate?: string;
  dueDate?: string | null;
  totalAmount?: number;
  paidAmount?: number;
  status?: string;
  referrer?: string | null;
  paymentMethod?: string | null;
  items?: BillItem[];
  notes?: string | null;
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5000";
const LOCAL_STORAGE_KEY = "okhati_bills";

export default function BillDetailPage() {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bill, setBill] = useState<Bill | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  // extract id from pathname: expects URL like /billing/bills/:id
  const idFromPath = (() => {
    if (!pathname) return null;
    const parts = pathname.split("/").filter(Boolean);
    const idx = parts.indexOf("bills");
    if (idx >= 0 && parts.length > idx + 1) return parts[idx + 1];
    return parts[parts.length - 1] ?? null;
  })();

  useEffect(() => {
    let cancelled = false;

    async function tryFetch(url: string) {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        return { ok: true as const, data: json };
      } catch (e) {
        return { ok: false as const, error: (e as any)?.message ?? String(e) };
      }
    }

    async function load() {
      if (!idFromPath) {
        setError("Missing bill id in URL");
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);

      // try backend first
      const tryUrls = [`${API_BASE}/api/billing/${idFromPath}`, `${API_BASE}/api/invoices/${idFromPath}`];
      for (const u of tryUrls) {
        const r = await tryFetch(u);
        if (cancelled) return;
        if (r.ok) {
          const b = normalizeFromBackend(r.data);
          setBill(b);
          setLoading(false);
          return;
        }
      }

      // fallback: localStorage
      try {
        const raw = typeof window !== "undefined" ? window.localStorage.getItem(LOCAL_STORAGE_KEY) : null;
        const arr = raw ? JSON.parse(raw) : [];
        const found = (arr || []).find((x: any) => String(x.id) === String(idFromPath) || String(x.billNumber) === String(idFromPath));
        if (found) {
          const b = normalizeFromLocal(found);
          setBill(b);
        } else {
          setError("Bill not found (backend & local).");
        }
      } catch (e) {
        setError("Failed to read local data");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [idFromPath]);

  function normalizeFromBackend(raw: any): Bill {
    return {
      id: raw.id ?? raw._id ?? `id-${Math.random()}`,
      billNumber: raw.billNumber ?? raw.invoiceNumber ?? raw.id,
      clientName: raw.clientName ?? raw.client?.fullName ?? raw.client?.name ?? "WalkIn Customer",
      clientPhone: raw.client?.phone ?? undefined,
      clientAge: raw.client?.age ?? null,
      clientGender: raw.client?.gender ?? null,
      createdAt: raw.createdAt ?? raw.issueDate ?? new Date().toISOString(),
      issueDate: raw.issueDate ?? raw.createdAt ?? new Date().toISOString(),
      dueDate: raw.dueDate ?? null,
      totalAmount: Number(raw.totalAmount ?? raw.total ?? 0),
      paidAmount: Number(raw.paidAmount ?? raw.paid ?? 0),
      status: raw.status ?? "unknown",
      referrer: raw.referrer ?? raw.referredBy ?? null,
      paymentMethod: raw.paymentMethod ?? null,
      items: Array.isArray(raw.items) ? raw.items.map((it: any) => ({
        description: it.description,
        dept: it.dept,
        qty: Number(it.qty ?? 0),
        unit: it.unit ?? "pcs",
        rate: Number(it.rate ?? 0),
        amount: Number(it.amount ?? (it.qty || 0) * (it.rate || 0)),
      })) : [],
      notes: raw.remarks ?? raw.notes ?? null,
    };
  }

  function normalizeFromLocal(raw: any): Bill {
    return {
      id: raw.id ?? `local-${Date.now()}`,
      billNumber: raw.billNumber ?? raw.id ?? `INV-${Date.now()}`,
      clientName: raw.clientName ?? "WalkIn Customer",
      clientPhone: raw.clientPhone ?? undefined,
      clientAge: raw.clientAge ?? null,
      clientGender: raw.clientGender ?? null,
      createdAt: raw.createdAt ?? raw.issueDate ?? new Date().toISOString(),
      issueDate: raw.issueDate ?? raw.createdAt ?? new Date().toISOString(),
      dueDate: raw.dueDate ?? null,
      totalAmount: Number(raw.totalAmount ?? raw.total ?? 0),
      paidAmount: Number(raw.paidAmount ?? raw.paid ?? 0),
      status: raw.status ?? "unknown",
      referrer: raw.referrer ?? null,
      paymentMethod: raw.paymentMethod ?? null,
      items: Array.isArray(raw.items) ? raw.items : [],
      notes: raw.notes ?? raw.remarks ?? null,
    };
  }

  // ---------- actions ----------
  function saveBillLocally(updated: Bill) {
    try {
      const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
      const arr = raw ? JSON.parse(raw) : [];
      const idx = (arr || []).findIndex((x: any) => String(x.id) === String(updated.id));
      const plain = {
        ...updated,
        createdAt: updated.createdAt,
        issueDate: updated.issueDate,
        totalAmount: updated.totalAmount,
        paidAmount: updated.paidAmount,
        status: updated.status,
      };
      if (idx >= 0) arr[idx] = plain;
      else arr.unshift(plain);
      window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(arr.slice(0, 1000)));
      setBill(updated);
      setMessage("Saved locally.");
      setTimeout(() => setMessage(null), 2500);
      return true;
    } catch (e) {
      console.error("saveBillLocally failed", e);
      setError("Failed to save locally.");
      return false;
    }
  }

  function markAsPaid() {
    if (!bill) return;
    const updated: Bill = { ...bill, paidAmount: bill.totalAmount ?? 0, status: "Billed" };
    saveBillLocally(updated);
  }

  function cancelBill() {
    if (!bill) return;
    if (!confirm("Cancel this bill?")) return;
    const updated: Bill = { ...bill, status: "Cancelled" };
    saveBillLocally(updated);
  }

  function deleteBill() {
    if (!bill) return;
    if (!confirm("Delete this bill permanently?")) return;
    try {
      const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
      const arr = raw ? JSON.parse(raw) : [];
      const newArr = (arr || []).filter((x: any) => String(x.id) !== String(bill.id));
      window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newArr));
      router.push("/billing/previous");
    } catch (e) {
      console.error("delete failed", e);
      setError("Delete failed");
    }
  }

  function editBill() {
    if (!bill) return;
    router.push(`/billing?edit=${encodeURIComponent(String(bill.id))}`);
  }

  // ---------------- Real-backend flows (placeholders) ----------------
  // I implemented example calls — replace the endpoint strings below
  // with real backend endpoints and adjust payload/response handling accordingly.

  async function createCreditNote() {
    if (!bill) return alert("No bill selected");
    setMessage("Creating credit note...");
    try {
      // Example endpoint: POST /api/billing/:id/credit-note
      const res = await fetch(`${API_BASE}/api/billing/${bill.id}/credit-note`, { method: "POST" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setMessage("Credit note created.");
      // optionally update UI or open credit note
      if (json?.id) router.push(`/billing/credit-notes/${json.id}`);
    } catch (e) {
      console.warn("credit note failed", e);
      setMessage("Credit note failed — check backend or use local flow.");
      setTimeout(()=>setMessage(null), 3000);
    }
  }

  async function printEstimate() {
    if (!bill) return alert("No bill selected");
    setMessage("Generating estimate...");
    try {
      // Example endpoint: GET /api/billing/:id/estimate (returns PDF URL or blob)
      const res = await fetch(`${API_BASE}/api/billing/${bill.id}/estimate`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      // assume backend returns { url: "..." } or a blob
      const contentType = res.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        const json = await res.json();
        if (json.url) window.open(json.url, "_blank");
      } else {
        // assume PDF blob
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        window.open(url, "_blank");
      }
      setMessage(null);
    } catch (e) {
      console.warn("print estimate failed", e);
      setMessage("Print estimate failed — check backend.");
      setTimeout(()=>setMessage(null), 3000);
    }
  }

  function openPrintPreview() {
    if (!bill) return;
    const html = `
      <html><head><meta charset="utf-8"><title>Invoice ${bill.billNumber}</title>
      <style>
        body{font-family:Arial,Helvetica,sans-serif;padding:20px;color:#222}
        table{width:100%;border-collapse:collapse;margin-top:12px}
        th,td{padding:8px;border:1px solid:#ddd;font-size:13px;text-align:left}
        .totals{margin-top:12px;display:flex;justify-content:flex-end}
        .box{min-width:220px;font-size:13px}
      </style>
      </head>
      <body>
        <h2>Invoice: ${escapeHtml(String(bill.billNumber ?? ""))}</h2>
        <div>Client: ${escapeHtml(String(bill.clientName ?? ""))}</div>
        <div>Issue Date: ${escapeHtml(String(bill.issueDate ?? ""))}</div>

        <table>
          <thead><tr><th>Description</th><th>Dept</th><th>Qty</th><th>Unit</th><th>Rate</th><th>Amount</th></tr></thead>
          <tbody>
            ${(bill.items || []).map(it => `
              <tr>
                <td>${escapeHtml(String(it.description ?? ""))}</td>
                <td>${escapeHtml(String(it.dept ?? ""))}</td>
                <td>${Number(it.qty ?? 0)}</td>
                <td>${escapeHtml(String(it.unit ?? ""))}</td>
                <td>Rs. ${(Number(it.rate ?? 0)).toFixed(2)}</td>
                <td>Rs. ${(Number(it.amount ?? ((it.qty ?? 0) * (it.rate ?? 0)))).toFixed(2)}</td>
              </tr>`).join("")}
          </tbody>
        </table>

        <div class="totals"><div class="box">
          <div>Gross: Rs. ${(bill.totalAmount ?? 0).toFixed(2)}</div>
          <div>Paid: Rs. ${(bill.paidAmount ?? 0).toFixed(2)}</div>
          <div style="font-weight:700;margin-top:8px">Total: Rs. ${(bill.totalAmount ?? 0).toFixed(2)}</div>
        </div></div>
        <script>window.onload = () => window.print();</script>
      </body></html>
    `;
    try {
      const w = window.open("", "_blank", "noopener,noreferrer");
      if (!w) { setError("Popup blocked"); return; }
      w.document.open();
      w.document.write(html);
      w.document.close();
    } catch (e) {
      setError("Unable to open print preview");
    }
  }

  function downloadPDFPlaceholder() {
    alert("PDF download is a placeholder. Integrate server-side PDF generation or client-side library.");
  }

  function shareInvoice() {
    if (!navigator.share) {
      alert("Sharing not supported in this browser. You can copy the URL manually.");
      return;
    }
    navigator.share?.({
      title: `Invoice ${bill?.billNumber ?? ""}`,
      text: `Invoice for ${bill?.clientName ?? ""}`,
      url: window.location.href,
    });
  }

  function escapeHtml(str: string) {
    return String(str).replace(/[&<>"']/g, (m) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m] as string)
    );
  }

  const grossTotal = useMemo(() => {
    if (!bill?.items) return 0;
    return bill.items.reduce((s, it) => s + (Number(it.amount ?? ((it.qty ?? 0) * (it.rate ?? 0))) || 0), 0);
  }, [bill]);

  // ---------- render ----------
  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Sidebar />
      <main style={{ flex: 1, padding: 24, background: "#f5f7fb", overflowY: "auto" }}>
        <HeaderBar pageTitle="Billing" />

        {loading ? (
          <div style={{ padding: 24 }}>Loading...</div>
        ) : error ? (
          <div style={{ color: "#b91c1c", padding: 24 }}>{error}</div>
        ) : bill ? (
          <>
            {/* Top action bar — STICKY */}
            <div style={{ position: "sticky", top: 12, zIndex: 80, background: "transparent", paddingBottom: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={statusPillStyles(bill.status)}>{bill.status}</div>

                  <div style={{ display: "flex", gap: 10, alignItems: "center", fontSize: 13 }}>
                    <ActionLink icon={<IconX />} label="Cancel" onClick={cancelBill} />
                    <ActionLink icon={<IconCopy />} label="Copy" onClick={() => { navigator.clipboard?.writeText(window.location.href); setMessage("Link copied"); setTimeout(()=>setMessage(null),2000); }} />
                    <ActionLink icon={<IconFilePlus />} label="Credit Note" onClick={createCreditNote} />
                    <ActionLink icon={<IconPeople />} label="SP and Referral" onClick={() => router.push("/billing/sp-and-referral")} />
                  </div>
                </div>

                <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                  <StickyButton icon={<IconFileText />} label="Print Estimate" onClick={printEstimate} />
                  <StickyButton icon={<IconEye />} label="Preview" onClick={openPrintPreview} />
                  <StickyButton icon={<IconPrinter />} label="Print Default" onClick={downloadPDFPlaceholder} />
                  <IconCircleButton onClick={() => alert("Settings clicked")} />
                </div>
              </div>
              {message && <div style={{ color: "#0b7a53", marginTop: 8 }}>{message}</div>}
            </div>

            <div style={{ display: "flex", gap: 20, alignItems: "flex-start", marginTop: 12 }}>
              {/* LEFT: detailed invoice */}
              <div style={{ flex: 1.6, background: "#fff", borderRadius: 10, padding: 20, boxShadow: "0 6px 18px rgba(0,0,0,0.04)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
                  <div>
                    <h2 style={{ margin: 0 }}>Invoice</h2>
                    <div style={{ color: "#6b7280", fontSize: 13 }}>{bill.clientName}</div>
                    <div style={{ color: "#6b7280", fontSize: 13 }}>{bill.clientPhone ?? ""}</div>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontWeight: 700 }}>Total: Rs. {(bill.totalAmount ?? 0).toFixed(2)}</div>
                    <div style={{ color: "#6b7280", fontSize: 13 }}>Status: {bill.status}</div>
                  </div>
                </div>

                <div style={{ marginTop: 12, fontSize: 13, color: "#6b7280" }}>
                  <div>Invoice #: <strong>{bill.billNumber}</strong></div>
                  <div>Issue Date: {bill.issueDate ? new Date(bill.issueDate).toLocaleDateString() : "-"}</div>
                  <div>Due Date: {bill.dueDate ? new Date(bill.dueDate).toLocaleDateString() : "-"}</div>
                  <div>Referrer: {bill.referrer ?? "-"}</div>
                </div>

                {/* items */}
                <div style={{ marginTop: 18 }}>
                  <div style={{ background: "#f9fafb", padding: "10px", borderRadius: 6, fontWeight: 700, display: "grid", gridTemplateColumns: "4fr 1fr 1fr 1fr 1fr", gap: 8 }}>
                    <div>Description</div>
                    <div style={{ textAlign: "center" }}>DEPT</div>
                    <div style={{ textAlign: "center" }}>QTY</div>
                    <div style={{ textAlign: "center" }}>RATE</div>
                    <div style={{ textAlign: "center" }}>AMOUNT</div>
                  </div>

                  {(bill.items || []).map((it, idx) => (
                    <div key={idx} style={{ display: "grid", gridTemplateColumns: "4fr 1fr 1fr 1fr 1fr", gap: 8, padding: "10px 0", borderBottom: "1px solid #f3f4f6", alignItems: "center" }}>
                      <div>{it.description}</div>
                      <div style={{ textAlign: "center" }}>{it.dept}</div>
                      <div style={{ textAlign: "center" }}>{it.qty ?? 0}</div>
                      <div style={{ textAlign: "center" }}>Rs. {(it.rate ?? 0).toFixed(2)}</div>
                      <div style={{ textAlign: "center" }}>Rs. {(it.amount ?? ((it.qty ?? 0) * (it.rate ?? 0))).toFixed(2)}</div>
                    </div>
                  ))}
                </div>

                {/* totals */}
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 12 }}>
                  <div style={{ minWidth: 260, border: "1px solid #eee", padding: 12, borderRadius: 6, background: "#fafafa" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <div>Gross</div>
                      <div>Rs. {grossTotal.toFixed(2)}</div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                      <div>Paid</div>
                      <div>Rs. {(bill.paidAmount ?? 0).toFixed(2)}</div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, marginTop: 8 }}>
                      <div>Total</div>
                      <div>Rs. {(bill.totalAmount ?? 0).toFixed(2)}</div>
                    </div>
                  </div>
                </div>

                {bill.notes && (
                  <div style={{ marginTop: 14, color: "#374151" }}>
                    <div style={{ fontWeight: 600, marginBottom: 6 }}>Notes</div>
                    <div style={{ whiteSpace: "pre-wrap" }}>{bill.notes}</div>
                  </div>
                )}
              </div>

              {/* RIGHT: summary & actions (buttons in one row) */}
              <div style={{ width: 420 }}>
                <div style={{ background: "#fff", borderRadius: 10, padding: 18, boxShadow: "0 6px 18px rgba(0,0,0,0.04)" }}>
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ color: "#6b7280", fontSize: 13 }}>Bill Number</div>
                    <div style={{ fontWeight: 700, fontSize: 16 }}>{bill.billNumber}</div>
                  </div>

                  <div style={{ marginBottom: 10 }}>
                    <div style={{ color: "#6b7280", fontSize: 13 }}>Issue Date</div>
                    <div>{bill.issueDate ? new Date(bill.issueDate).toLocaleDateString() : "-"}</div>
                  </div>

                  <div style={{ marginBottom: 10 }}>
                    <div style={{ color: "#6b7280", fontSize: 13 }}>Due Date</div>
                    <div>{bill.dueDate ? new Date(bill.dueDate).toLocaleDateString() : "-"}</div>
                  </div>

                  <div style={{ marginBottom: 6 }}>
                    <div style={{ color: "#6b7280", fontSize: 13 }}>Status</div>
                    <div style={{ fontWeight: 700, textTransform: "capitalize" }}>{bill.status}</div>
                  </div>

                  <div style={{ marginBottom: 12 }}>
                    <div style={{ color: "#6b7280", fontSize: 13 }}>Payment</div>
                    <div>{bill.paidAmount && bill.paidAmount > 0 ? `${bill.paymentMethod ?? "Cash"} — Rs. ${bill.paidAmount.toFixed(2)}` : "Unpaid"}</div>
                  </div>

                  <div style={{ marginBottom: 12 }}>
                    <div style={{ color: "#6b7280", fontSize: 13 }}>Referrer</div>
                    <div>{bill.referrer ?? "-"}</div>
                  </div>

                  {/* ACTIONS: single row, responsive wrap */}
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", marginTop: 6 }}>
                    <button onClick={editBill} style={actionBtn}>
                      <IconEdit /> <span style={{ marginLeft: 8 }}>Edit</span>
                    </button>

                    <button onClick={openPrintPreview} style={actionOutline}>
                      <IconPrinter /> <span style={{ marginLeft: 8 }}>Print</span>
                    </button>

                    <button onClick={downloadPDFPlaceholder} style={actionOutline}>
                      <IconDownload /> <span style={{ marginLeft: 8 }}>Download PDF</span>
                    </button>

                    <button onClick={shareInvoice} style={actionOutline}>
                      <IconShare /> <span style={{ marginLeft: 8 }}>Share</span>
                    </button>

                    <button onClick={markAsPaid} style={actionPrimary}>
                      <IconCheck /> <span style={{ marginLeft: 8 }}>Mark as Paid</span>
                    </button>

                    <button onClick={cancelBill} style={actionDanger}>
                      <IconX /> <span style={{ marginLeft: 8 }}>Cancel</span>
                    </button>

                    <button onClick={deleteBill} style={actionGhost}>
                      <IconTrash /> <span style={{ marginLeft: 8 }}>Delete</span>
                    </button>
                  </div>

                  {message && <div style={{ marginTop: 12, color: "#0b7a53" }}>{message}</div>}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div>No bill selected.</div>
        )}
      </main>
    </div>
  );
}

/* ----------------- Small helper components & icons ----------------- */

function StickyButton({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick?: () => void }) {
  return (
    <button onClick={onClick} style={{ ...outlineBtn, transition: "transform .12s ease, box-shadow .12s ease" }} onMouseEnter={(e)=>applyHover(e.currentTarget)} onMouseLeave={(e)=>removeHover(e.currentTarget)}>
      <span style={{ marginRight: 8, display: "inline-flex", alignItems: "center" }}>{icon}</span>
      <span style={{ fontSize: 13 }}>{label}</span>
    </button>
  );
}

function IconCircleButton({ onClick }: { onClick?: () => void }) {
  return (
    <button onClick={onClick} style={iconCircleStyle} onMouseEnter={(e)=>applyHover(e.currentTarget)} onMouseLeave={(e)=>removeHover(e.currentTarget)}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" stroke="#0b7a53" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
    </button>
  );
}

function ActionLink({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick?: () => void }) {
  return (
    <button onClick={onClick} style={actionLinkStyle} onMouseEnter={(e)=>applyHover(e.currentTarget)} onMouseLeave={(e)=>removeHover(e.currentTarget)}>
      <span style={{ marginRight: 8, display: "inline-flex", alignItems: "center" }}>{icon}</span>
      <span>{label}</span>
    </button>
  );
}

// small hover helpers
function applyHover(el: HTMLElement) {
  el.style.transform = "translateY(-4px)";
  (el.style as any).boxShadow = "0 8px 20px rgba(0,0,0,0.08)";
}
function removeHover(el: HTMLElement) {
  el.style.transform = "";
  (el.style as any).boxShadow = "";
}

/* ----------------- Icons (inline SVGs) ----------------- */

const IconX = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden><path d="M18 6L6 18M6 6l12 12" stroke="#dc2626" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
);

const IconCopy = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="9" y="9" width="10" height="10" rx="2" stroke="#0b7a53" strokeWidth="1.2"/><rect x="5" y="5" width="10" height="10" rx="2" stroke="#0b7a53" strokeWidth="1.2" /></svg>
);

const IconFilePlus = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="#0b7a53" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 2v6h6" stroke="#0b7a53" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 11v6M9 14h6" stroke="#0b7a53" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
);

const IconPeople = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 0 0-3-3.87" stroke="#0b7a53" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 21v-2a4 4 0 0 1 3-3.87" stroke="#0b7a53" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="7" r="4" stroke="#0b7a53" strokeWidth="1.2"/></svg>
);

const IconFileText = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="#0b7a53" strokeWidth="1.2"/><path d="M14 2v6h6" stroke="#0b7a53" strokeWidth="1.2"/><path d="M8 13h8M8 17h6" stroke="#0b7a53" strokeWidth="1.2" strokeLinecap="round"/></svg>
);

const IconEye = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" stroke="#0b7a53" strokeWidth="1.2"/><circle cx="12" cy="12" r="3" stroke="#0b7a53" strokeWidth="1.2"/></svg>
);

const IconPrinter = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M6 9V2h12v7" stroke="#0b7a53" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /><path d="M6 18H4a2 2 0 0 1-2-2v-5h20v5a2 2 0 0 1-2 2h-2" stroke="#0b7a53" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><rect x="8" y="13" width="8" height="6" rx="1" stroke="#0b7a53" strokeWidth="1.2"/></svg>
);

const IconEdit = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M3 21l3-1 11-11 3-3a2.828 2.828 0 0 0 0-4L18 1a2.828 2.828 0 0 0-4 0l-3 3-11 11-1 3 3-1z" stroke="#111827" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
);

const IconDownload = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="#0b7a53" strokeWidth="1.2"/><path d="M7 10l5 5 5-5" stroke="#0b7a53" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 15V3" stroke="#0b7a53" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
);

const IconShare = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7" stroke="#0b7a53" strokeWidth="1.2"/><path d="M16 6l-4-4-4 4" stroke="#0b7a53" strokeWidth="1.2"/><path d="M12 2v14" stroke="#0b7a53" strokeWidth="1.2"/></svg>
);

const IconCheck = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
);

const IconTrash = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M3 6h18" stroke="#ef4444" strokeWidth="1.2"/><path d="M8 6v12a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V6" stroke="#ef4444" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M10 6V4a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v2" stroke="#ef4444" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
);

/* ----------------- styles ----------------- */

const actionLinkStyle: React.CSSProperties = {
  background: "#fff",
  border: "1px solid transparent",
  color: "#0b7a53",
  cursor: "pointer",
  padding: "8px 10px",
  borderRadius: 8,
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  fontSize: 13,
  transition: "transform .12s ease, box-shadow .12s ease",
};

const outlineBtn: React.CSSProperties = {
  border: "1px solid #0b7a53",
  background: "#fff",
  color: "#0b7a53",
  padding: "8px 10px",
  borderRadius: 6,
  cursor: "pointer",
  fontSize: 13,
};

const iconCircleStyle: React.CSSProperties = {
  border: "1px solid #e6f2ea",
  background: "#fff",
  borderRadius: 8,
  width: 36,
  height: 36,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
};

function statusPillStyles(status?: string): React.CSSProperties {
  const s = (status || "").toLowerCase();
  const bg = s.includes("billed") || s.includes("paid") ? "#e6f4ef" : s.includes("cancel") ? "#fff1f2" : "#eef2ff";
  const color = s.includes("billed") || s.includes("paid") ? "#0b7a53" : s.includes("cancel") ? "#dc2626" : "#1f2937";
  return {
    padding: "6px 12px",
    borderRadius: 999,
    background: bg,
    color,
    fontWeight: 700,
    fontSize: 13,
    border: "1px solid rgba(0,0,0,0.03)",
  };
}

const actionBtn: React.CSSProperties = {
  padding: "10px 12px",
  borderRadius: 8,
  background: "#f3f4f6",
  border: "1px solid #e5e7eb",
  color: "#111827",
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  transition: "transform .12s ease, box-shadow .12s ease",
};

const actionOutline: React.CSSProperties = {
  padding: "10px 12px",
  borderRadius: 8,
  background: "#fff",
  border: "1px solid #0b7a53",
  color: "#0b7a53",
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  transition: "transform .12s ease, box-shadow .12s ease",
};

const actionPrimary: React.CSSProperties = {
  padding: "10px 12px",
  borderRadius: 8,
  background: "#0b7a53",
  border: "none",
  color: "#fff",
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  transition: "transform .12s ease, box-shadow .12s ease",
};

const actionDanger: React.CSSProperties = {
  padding: "10px 12px",
  borderRadius: 8,
  background: "#fff",
  border: "1px solid #dc2626",
  color: "#dc2626",
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  transition: "transform .12s ease, box-shadow .12s ease",
};

const actionGhost: React.CSSProperties = {
  padding: "10px 12px",
  borderRadius: 8,
  background: "#fff",
  border: "1px solid #ef4444",
  color: "#ef4444",
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  transition: "transform .12s ease, box-shadow .12s ease",
};
