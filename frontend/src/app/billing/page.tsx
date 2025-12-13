"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import HeaderBar from "@/components/HeaderBar";
import CreateClientDrawer from "@/components/CreateClientDrawer";

/* ------------ Types ------------ */
type BillItem = {
  id: number;
  description: string;
  dept: string;
  qty: number;
  unit: string;
  rate: number;
};

type DiscountMode = "%" | "Rs";

type Client = {
  id: number;
  fullName: string;
  age: number | null;
  gender: string | null;
  phone: string | null;
};

type DateInfo = {
  formattedDate: string;
  formattedSubDate: string;
  time: string;
};

type Bill = {
  id: string | number;
  billNumber?: string;
  clientName?: string;
  createdAt?: string;
  issueDate?: string;
  totalAmount?: number;
  paidAmount?: number;
  status?: string;
};

type LabPayload = {
  billId?: string | number;
  billNumber?: string;
  clientName?: string;
  issueDate?: string;
  items: {
    description: string;
    dept?: string;
    qty: number;
    rate: number;
    amount: number;
    unit?: string;
  }[];
  grossTotal?: number;
  totalAmount?: number;
  status?: string;
};

/* ------------ Config ------------ */
const API_BASE = (process.env.NEXT_PUBLIC_API_BASE as string) || "http://localhost:5000";
const LOCAL_STORAGE_KEY = "okhati_bills";

/* ------------ Component ------------ */
export default function BillingPage() {
  const router = useRouter();
  const pathname = usePathname();

  // mount flag
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const [activeTopTab, setActiveTopTab] = useState<"New Bill" | "Previous" | "SP and Referral Commissions">(
    "New Bill"
  );

  // client + referrer
  const [clientName, setClientName] = useState("WalkIn Customer");
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);

  const [issueDate, setIssueDate] = useState<string>(() => {
    const d = new Date();
    return d.toISOString().slice(0, 10);
  });
  const [referrer, setReferrer] = useState("");

  // items
  const [items, setItems] = useState<BillItem[]>([
    { id: 1, description: "", dept: "", qty: 1, unit: "pcs", rate: 0 },
  ]);

  const [remindValue, setRemindValue] = useState(0);
  const [remindUnit, setRemindUnit] = useState<"DAYS" | "WEEK" | "MONTH" | "YEARS">("DAYS");

  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [remarks, setRemarks] = useState("");

  const [discountMode, setDiscountMode] = useState<DiscountMode>("%");
  const [discountValue, setDiscountValue] = useState(0);
  const [roundingOff, setRoundingOff] = useState(0);

  const [paidAll, setPaidAll] = useState(true);
  const [tenderAmount, setTenderAmount] = useState(0);

  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // client search state
  const [allClients, setAllClients] = useState<Client[]>([]);
  const [clientSearch, setClientSearch] = useState("");
  const [clientDropdownOpen, setClientDropdownOpen] = useState(false);
  const [createClientOpen, setCreateClientOpen] = useState(false);

  // action states
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [qrPaymentUrl, setQrPaymentUrl] = useState("");
  const [nepalPayModalOpen, setNepalPayModalOpen] = useState(false);
  const [loadingAction, setLoadingAction] = useState(false);

  const clientFieldRef = useRef<HTMLDivElement | null>(null);

  /* ---------- Billing list (Previous view) ---------- */
  const [bills, setBills] = useState<Bill[]>([]);
  const [billsLoading, setBillsLoading] = useState(false);
  const [billsError, setBillsError] = useState<string | null>(null);

  // previous controls
  const [searchTerm, setSearchTerm] = useState("");
  const [clientFilter, setClientFilter] = useState<string | "">("");
  const [statusFilter, setStatusFilter] = useState<
    "Billed" | "Credited" | "Draft" | "Cancelled" | "Proforma Draft" | "All"
  >("Billed");
  const [page, setPage] = useState(1);
  const pageSize = 12;

  /* --------- Services (for datalist) --------- */
  const [services, setServices] = useState<
    { id: number | string; name: string; department?: string | null; price?: number }[]
  >([]);

  useEffect(() => {
    let canceled = false;
    async function loadServices() {
      try {
        const res = await fetch(`${API_BASE}/api/services`);
        if (!res.ok) return;
        const data = await res.json();
        if (canceled) return;
        const normalized = (Array.isArray(data) ? data : []).map((s: any) => ({
          id: s.id ?? s._id ?? s.serviceId ?? s.name,
          name: s.name ?? s.serviceName ?? "",
          department: s.department ?? s.dept ?? null,
          price: typeof s.price === "number" ? s.price : Number(s.price ?? s.clinicPrice ?? 0) || 0,
        }));
        setServices(normalized);
      } catch (e) {
        console.warn("loadServices failed", e);
      }
    }

    loadServices();
    function onFocus() {
      loadServices();
    }
    window.addEventListener("focus", onFocus);
    return () => {
      canceled = true;
      window.removeEventListener("focus", onFocus);
    };
  }, []);

  // load clients
  useEffect(() => {
    const loadClients = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/clients`);
        if (!res.ok) return;
        const data: Client[] = await res.json();
        setAllClients(data);
      } catch (e) {
        console.error("loadClients:", e);
      }
    };
    loadClients();
  }, []);

  // close client dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!clientFieldRef.current) return;
      if (!clientFieldRef.current.contains(e.target as Node)) {
        setClientDropdownOpen(false);
      }
    }
    if (clientDropdownOpen) {
      document.addEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [clientDropdownOpen]);

  // ---------- load previous bills when Previous tab active ----------
  useEffect(() => {
    if (activeTopTab !== "Previous") return;

    let canceled = false;

    const load = async () => {
      setBillsLoading(true);
      setBillsError(null);

      async function tryFetch(url: string) {
        try {
          const res = await fetch(url);
          if (res.status === 404) return { ok: false as const, status: 404, data: null as any };
          if (!res.ok) {
            const text = await res.text().catch(() => "");
            throw new Error(text || `HTTP ${res.status}`);
          }
          const text = await res.text().catch(() => "");
          try {
            const data = text ? JSON.parse(text) : null;
            return { ok: true as const, status: res.status, data };
          } catch {
            return { ok: true as const, status: res.status, data: text };
          }
        } catch (err: any) {
          return { ok: false as const, status: 0, data: err?.message ?? String(err) };
        }
      }

      try {
        const urlsToTry = [`${API_BASE}/api/billing`, `${API_BASE}/api/invoices`];

        let responseData: any[] | null = null;

        for (const u of urlsToTry) {
          const r = await tryFetch(u);

          if (r.ok && Array.isArray(r.data)) {
            responseData = r.data;
            break;
          }

          if (r.ok && r.data && !Array.isArray(r.data)) {
            if (Array.isArray((r.data as any).items)) {
              responseData = (r.data as any).items;
              break;
            }
            if (Array.isArray((r.data as any).data)) {
              responseData = (r.data as any).data;
              break;
            }
          }

          if (r.status === 404) continue;
        }

        if (canceled) return;

        if (!responseData) {
          const raw = typeof window !== "undefined" ? window.localStorage.getItem(LOCAL_STORAGE_KEY) : null;
          const local = raw ? JSON.parse(raw) : [];
          const normalized: Bill[] = (local || []).map((b: any) => ({
            id: b.id,
            billNumber: b.billNumber ?? b.id,
            clientName: b.clientName ?? "Unknown",
            createdAt: b.createdAt ?? b.issueDate ?? new Date().toISOString(),
            totalAmount: Number(b.totalAmount ?? b.total ?? 0),
            paidAmount: Number(b.paidAmount ?? b.paid ?? 0),
            status: b.status ?? "unknown",
          }));
          setBills(normalized);
          setBillsLoading(false);
          return;
        }

        const normalized: Bill[] = (responseData || []).map((b: any) => ({
          id: b.id,
          billNumber: b.billNumber ?? b.invoiceNumber ?? b.id ?? `#${b.id}`,
          clientName: b.clientName ?? b.client?.fullName ?? b.client?.name ?? "Unknown",
          createdAt: b.issueDate ?? b.createdAt ?? b.created_at,
          totalAmount: typeof b.totalAmount === "number" ? b.totalAmount : Number(b.totalAmount ?? b.total ?? 0),
          paidAmount: typeof b.paidAmount === "number" ? b.paidAmount : Number(b.paidAmount ?? b.paid ?? 0),
          status: b.status || b.state || "unknown",
        }));

        setBills(normalized);
      } catch (err: any) {
        console.error("Failed to load bills:", err);
        setBillsError(err?.message || "Failed to load bills");
        setBills([]);
      } finally {
        if (!canceled) setBillsLoading(false);
      }
    };

    load();
    return () => {
      canceled = true;
    };
  }, [activeTopTab]);

  // derived filters for preview
  const filteredBills = bills
    .filter((b) => {
      if (statusFilter !== "All") {
        const sf = statusFilter.toLowerCase();
        const status = String(b.status || "").toLowerCase();

        if (statusFilter === "Billed") {
          if (!["billed", "finalized", "paid"].some((s) => status.includes(s))) {
            return false;
          }
        } else if (!status.includes(sf)) {
          return false;
        }
      }

      if (searchTerm.trim()) {
        const s = searchTerm.toLowerCase();
        return (b.clientName || "").toLowerCase().includes(s) || String(b.billNumber || "").toLowerCase().includes(s);
      }

      if (clientFilter) {
        return (b.clientName || "") === clientFilter;
      }

      return true;
    })
    .slice((page - 1) * pageSize, page * pageSize);

  // derived values
  const grossTotal = items.reduce((sum, it) => sum + (Number(it.qty) || 0) * (Number(it.rate) || 0), 0);
  const discountAmount = discountMode === "%" ? (grossTotal * (Number(discountValue) || 0)) / 100 : Number(discountValue) || 0;
  const taxableAmount = Math.max(grossTotal - discountAmount, 0);
  const totalAmount = Math.max(taxableAmount + (Number(roundingOff) || 0), 0);
  const changeAmount = paidAll ? Math.max((Number(tenderAmount) || 0) - totalAmount, 0) : 0;
  const totalInWords = totalAmount === 0 ? "Zero rupees" : `Approximately Rs. ${totalAmount.toFixed(2)}`;

  // item handlers
  const handleItemChange = (id: number, field: keyof BillItem, value: string | number) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, [field]: value } : it)));
  };

  const addItemRow = () => {
    setItems((prev) => [
      ...prev,
      { id: prev.length ? prev[prev.length - 1].id + 1 : 1, description: "", dept: "", qty: 1, unit: "pcs", rate: 0 },
    ]);
  };

  const removeItemRow = (id: number) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  // client dropdown logic
  const filteredClients = allClients.filter((c) => {
    if (!clientSearch.trim()) return true;
    const term = clientSearch.toLowerCase();
    return c.fullName.toLowerCase().includes(term) || (c.phone || "").toLowerCase().includes(term);
  });

  const handleSelectClient = (c: Client) => {
    setSelectedClientId(c.id);
    setClientName(c.fullName);
    setClientSearch("");
    setClientDropdownOpen(false);
  };

  const handleAddClientClick = () => {
    setCreateClientOpen(true);
    setClientDropdownOpen(false);
  };

  const handleClientCreated = (c: any) => {
    setAllClients((prev) => [c, ...prev]);
    handleSelectClient(c);
    setCreateClientOpen(false);
  };

  const showNameInInput = clientDropdownOpen ? clientSearch : clientName || "";

  // helpers
  function escapeHtml(str: string) {
    return String(str).replace(/[&<>"']/g, (m) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m] as string)
    );
  }

  function buildPaymentUrl() {
    const payload = { clientName, totalAmount, invoiceDate: issueDate };
    return `okhati-pay://pay?data=${encodeURIComponent(JSON.stringify(payload))}`;
  }

  function saveBillToLocalStorageSync(b: Bill): boolean {
    try {
      if (typeof window === "undefined" || !window.localStorage) {
        console.warn("localStorage not available");
        return false;
      }
      const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
      const arr: Bill[] = raw ? JSON.parse(raw) : [];
      arr.unshift(b);
      const trimmed = arr.slice(0, 1000);
      window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(trimmed));
      console.log("[okhati] saved bill to localStorage", b);
      return true;
    } catch (e) {
      console.error("[okhati] failed to save bill to localStorage:", e);
      return false;
    }
  }

  async function postBillToBackend(payload: Record<string, any>) {
    const res = await fetch(`${API_BASE}/api/billing`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(text || `HTTP ${res.status}`);
    }
    const json = await res.json().catch(() => null);
    return json ?? {};
  }

  // ---------- NEW: post to lab endpoint (if there are items) ----------
  async function postToLabIfNeeded(payload: LabPayload) {
    // only post if payload has items
    if (!payload || !Array.isArray(payload.items) || payload.items.length === 0) return null;

    // filter only lab items (case-insensitive dept === "lab")
    const labItems = payload.items.filter((it) => {
      if (!it) return false;
      const d = String(it.dept ?? "").trim().toLowerCase();
      return d === "lab";
    });

    if (labItems.length === 0) {
      // nothing to post
      return null;
    }

    // prepare final payload with only lab items
    const finalPayload: LabPayload = {
      ...payload,
      items: labItems.map((it) => ({
        description: it.description,
        dept: it.dept,
        qty: Number(it.qty) || 0,
        rate: Number(it.rate) || 0,
        amount: Number(it.amount ?? (Number(it.qty) * Number(it.rate))) || 0,
        unit: it.unit ?? "pcs",
      })),
    };

    try {
      const res = await fetch(`${API_BASE}/api/lab/records`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalPayload),
      });
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        console.warn("lab POST failed:", text || `HTTP ${res.status}`);
        return null;
      }
      const json = await res.json().catch(() => null);
      console.log("lab record created:", json);
      return json;
    } catch (e) {
      console.warn("lab POST error:", e);
      return null;
    }
  }

  // save / finalise handlers
  const handleSaveDraft = async () => {
    setError(null);
    setMessage(null);
    setLoadingAction(true);

    try {
      const payload = {
        clientName,
        issueDate,
        items: items.map((it) => ({
          description: it.description,
          dept: it.dept,
          qty: Number(it.qty) || 0,
          unit: it.unit,
          rate: Number(it.rate) || 0,
          amount: (Number(it.qty) || 0) * (Number(it.rate) || 0),
        })),
        grossTotal,
        discount: discountAmount,
        taxableAmount,
        roundingOff,
        totalAmount,
        paymentMethod,
        remarks,
        status: "draft",
      };

      let data: any = {};
      try {
        data = await postBillToBackend(payload);
      } catch (e) {
        console.warn("backend save draft failed, will save locally", e);
      }

      // create local bill object
      const billObj: Bill = {
        id: data?.id ?? `local-${Date.now()}`,
        billNumber: data?.billNumber ?? `INV-${Date.now()}`,
        clientName: clientName || "WalkIn Customer",
        createdAt: new Date().toISOString(),
        issueDate: issueDate,
        totalAmount: Number(totalAmount || 0),
        paidAmount: 0,
        status: "Draft",
      };

      const ok = saveBillToLocalStorageSync(billObj);
      if (!ok) {
        setError("Could not save locally — check browser settings (storage disabled?). See console for details.");
        setLoadingAction(false);
        return;
      }

      // Optional: post to lab even for draft (if you prefer only finalized to go to lab, remove/skip this)
      try {
        const labPayload: LabPayload = {
          billId: billObj.id,
          billNumber: billObj.billNumber,
          clientName: billObj.clientName,
          issueDate: billObj.issueDate,
          items: payload.items,
          grossTotal,
          totalAmount,
          status: "Ordered",
        };
        // call but ignore failure
        await postToLabIfNeeded(labPayload);
      } catch (e) {
        console.warn("postToLabIfNeeded (draft) failed", e);
      }

      setMessage(`Draft saved (id: ${billObj.id}). Opening Previous list...`);
      router.push("/billing/previous");
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Failed to save draft");
    } finally {
      setLoadingAction(false);
    }
  };

  const handleFinalise = async () => {
    setError(null);
    setMessage(null);
    setLoadingAction(true);

    try {
      const payload = {
        clientName,
        issueDate,
        items: items.map((it) => ({
          description: it.description,
          dept: it.dept,
          qty: Number(it.qty) || 0,
          unit: it.unit,
          rate: Number(it.rate) || 0,
          amount: (Number(it.qty) || 0) * (Number(it.rate) || 0),
        })),
        grossTotal,
        discount: discountAmount,
        taxableAmount,
        roundingOff,
        totalAmount,
        paymentMethod,
        remarks,
        status: "finalized",
      };

      let data: any = {};
      try {
        data = await postBillToBackend(payload);
      } catch (e) {
        console.warn("backend finalise failed, saving locally", e);
      }

      const billObj: Bill = {
        id: data?.id ?? `local-${Date.now()}`,
        billNumber: data?.billNumber ?? `INV-${Date.now()}`,
        clientName: clientName || "WalkIn Customer",
        createdAt: new Date().toISOString(),
        issueDate: issueDate,
        totalAmount: Number(totalAmount || 0),
        paidAmount: Number(tenderAmount || 0),
        status: "Billed",
      };

      const ok = saveBillToLocalStorageSync(billObj);
      if (!ok) {
        setError("Could not save locally — check browser settings (storage disabled?). See console.");
        setLoadingAction(false);
        return;
      }

      // ===== NEW: send to lab backend (only lab items will be posted) =====
      try {
        const labPayload: LabPayload = {
          billId: billObj.id,
          billNumber: billObj.billNumber,
          clientName: billObj.clientName,
          issueDate: billObj.issueDate,
          items: payload.items,
          grossTotal,
          totalAmount,
          status: "Ordered",
        };

        await postToLabIfNeeded(labPayload);
      } catch (e) {
        console.warn("postToLabIfNeeded failed", e);
      }

      setMessage(`Invoice ${billObj.billNumber} finalised. Opening Previous list...`);
      router.push("/billing/previous");
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Failed to finalise invoice");
    } finally {
      setLoadingAction(false);
    }
  };

  const handleFinaliseAndPrint = async () => {
    setError(null);
    setMessage(null);
    setLoadingAction(true);

    try {
      const payload = {
        clientName,
        issueDate,
        items: items.map((it) => ({
          description: it.description,
          dept: it.dept,
          qty: Number(it.qty) || 0,
          unit: it.unit,
          rate: Number(it.rate) || 0,
          amount: (Number(it.qty) || 0) * (Number(it.rate) || 0),
        })),
        grossTotal,
        discount: discountAmount,
        taxableAmount,
        roundingOff,
        totalAmount,
        paymentMethod,
        remarks,
        status: "finalized",
      };

      let data: any = {};
      try {
        data = await postBillToBackend(payload);
      } catch (e) {
        console.warn("backend finalise failed, saving locally", e);
      }

      const billObj: Bill = {
        id: data?.id ?? `local-${Date.now()}`,
        billNumber: data?.billNumber ?? `INV-${Date.now()}`,
        clientName: clientName || "WalkIn Customer",
        createdAt: new Date().toISOString(),
        issueDate: issueDate,
        totalAmount: Number(totalAmount || 0),
        paidAmount: Number(tenderAmount || 0),
        status: "Billed",
      };

      const ok = saveBillToLocalStorageSync(billObj);
      if (!ok) {
        setError("Could not save locally — check browser settings (storage disabled?). See console.");
        setLoadingAction(false);
        return;
      }

      // send to lab (only lab items)
      try {
        const labPayload: LabPayload = {
          billId: billObj.id,
          billNumber: billObj.billNumber,
          clientName: billObj.clientName,
          issueDate: billObj.issueDate,
          items: payload.items,
          grossTotal,
          totalAmount,
          status: "Ordered",
        };

        await postToLabIfNeeded(labPayload);
      } catch (e) {
        console.warn("postToLabIfNeeded failed", e);
      }

      setMessage(`Invoice ${billObj.billNumber} finalised — opening preview...`);
      openPrintPreview();
      router.push("/billing/previous");
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Failed to finalise and print");
    } finally {
      setLoadingAction(false);
    }
  };

  // Print & payment flows
  function openPrintPreview() {
    const html = `
      <html>
        <head>
          <title>Invoice Preview</title>
          <meta charset="utf-8" />
          <style>
            body { font-family: Arial, Helvetica, sans-serif; padding: 20px; color: #222 }
            .header { display:flex; justify-content:space-between; align-items:center }
            table.items { width: 100%; border-collapse: collapse; margin-top: 16px }
            table.items th, table.items td { padding: 8px; border: 1px solid #ddd; text-align: left; font-size: 13px; }
            .totals { margin-top: 16px; display:flex; justify-content:flex-end }
            .totals .box { min-width: 220px; font-size: 13px; }
            .meta { color: #555; font-size: 13px; margin-top: 6px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <h2 style="margin:0">Invoice</h2>
              <div class="meta">Client: ${escapeHtml(clientName)}</div>
              <div class="meta">Issue Date: ${escapeHtml(issueDate)}</div>
            </div>
            <div>
              <div style="font-weight:700; font-size:18px">Total: Rs. ${totalAmount.toFixed(2)}</div>
            </div>
          </div>

          <table class="items">
            <thead>
              <tr>
                <th>Description</th><th>Dept</th><th>Qty</th><th>Unit</th><th>Rate</th><th>Amount</th>
              </tr>
            </thead>
            <tbody>
              ${items
                .map(
                  (it) => `
                <tr>
                  <td>${escapeHtml(String(it.description || ""))}</td>
                  <td>${escapeHtml(String(it.dept || ""))}</td>
                  <td>${Number(it.qty)}</td>
                  <td>${escapeHtml(String(it.unit || ""))}</td>
                  <td>Rs. ${Number(it.rate).toFixed(2)}</td>
                  <td>Rs. ${(Number(it.qty) * Number(it.rate)).toFixed(2)}</td>
                </tr>`
                )
                .join("")}
            </tbody>
          </table>

          <div class="totals">
            <div class="box">
              <div>Gross: Rs. ${grossTotal.toFixed(2)}</div>
              <div>Discount: Rs. ${discountAmount.toFixed(2)}</div>
              <div>Taxable: Rs. ${taxableAmount.toFixed(2)}</div>
              <div>Rounding Off: Rs. ${Number(roundingOff).toFixed(2)}</div>
              <div style="font-weight:700; margin-top:8px">Total: Rs. ${totalAmount.toFixed(2)}</div>
            </div>
          </div>

          <script>
            window.onload = function() { window.print(); };
          </script>
        </body>
      </html>
    `;
    try {
      const w = window.open("", "_blank", "noopener,noreferrer");
      if (!w) {
        setError("Unable to open print window (popup blocked).");
        return;
      }
      w.document.open();
      w.document.write(html);
      w.document.close();
    } catch (e) {
      setError("Unable to open print preview.");
    }
  }

  function handlePayUsingQr() {
    const url = buildPaymentUrl();
    setQrPaymentUrl(url);
    setQrModalOpen(true);
  }

  async function copyQrLink() {
    try {
      if (!qrPaymentUrl) throw new Error("No QR link");
      await navigator.clipboard.writeText(qrPaymentUrl);
      setMessage("Payment link copied to clipboard.");
    } catch (e) {
      setError("Unable to copy link to clipboard.");
    }
  }

  function handlePayWithNepalPay() {
    setNepalPayModalOpen(true);
  }

  // Date info
  const [dateInfo, setDateInfo] = useState<DateInfo | null>(null);
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

  // routing / active states
  const path = pathname ?? "";
  const isNewActive = mounted ? (path === "/billing" || path === "/billing/") : activeTopTab === "New Bill";
  const isPreviousActive = mounted ? path.includes("/billing/previous") : activeTopTab === "Previous";
  const isSpActive = mounted ? path.includes("/billing/sp-and-referral") : activeTopTab === "SP and Referral Commissions";

  // ===== Render =====
  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Sidebar />

      <main style={{ flex: 1, padding: 24, background: "#f5f7fb", overflowY: "auto" }}>
        <HeaderBar pageTitle="Billing" />

        <div style={{ marginTop: 8, marginBottom: 12 }}>
          <div style={{ display: "flex", gap: 16, alignItems: "center", fontSize: 14 }}>
            <TopTab label="New Bill" active={isNewActive} onClick={() => { setActiveTopTab("New Bill"); router.push("/billing"); }} />
            <TopTab label="Previous" active={isPreviousActive} onClick={() => { setActiveTopTab("Previous"); router.push("/billing/previous"); }} />
            <TopTab
              label="SP and Referral Commissions"
              active={isSpActive}
              onClick={() => {
                setActiveTopTab("SP and Referral Commissions");
                router.push("/billing/sp-and-referral");
              }}
            />
          </div>
        </div>

        {/* ---------- Previous view ---------- */}
        {activeTopTab === "Previous" ? (
          <div style={{ background: "#fff", borderRadius: 10, boxShadow: "0 4px 12px rgba(0,0,0,0.05)", padding: 20 }}>
            <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
              <input placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ padding: "8px 12px", borderRadius: 6, border: "1px solid #e5e7eb", flex: 1 }} />

              <select value={clientFilter} onChange={(e) => setClientFilter((e.target.value || "") as any)} style={{ padding: "8px 12px", borderRadius: 6, border: "1px solid #e5e7eb" }}>
                <option value="">CLIENT</option>
                {allClients.map((c) => (
                  <option key={c.id} value={c.fullName}>
                    {c.fullName}
                  </option>
                ))}
              </select>

              <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
                <button onClick={() => { setActiveTopTab("New Bill"); window.scrollTo(0, 0); router.push("/billing"); }} style={{ padding: "8px 12px", borderRadius: 6, border: "1px solid #0b7a53", background: "#0b7a53", color: "#fff" }}>
                  CREATE NEW
                </button>
                <button onClick={() => {}} style={{ padding: "8px 10px", borderRadius: 6, border: "1px solid #e5e7eb", background: "#fff" }}>📄</button>
              </div>
            </div>

            <div style={{ display: "flex", gap: 12, marginBottom: 12, alignItems: "center", borderBottom: "1px solid #eee", paddingBottom: 8 }}>
              {(["Billed", "Credited", "Draft", "Cancelled", "Proforma Draft", "All"] as const).map((s) => (
                <div key={s} onClick={() => { setStatusFilter(s as any); setPage(1); }} style={{ cursor: "pointer", paddingBottom: statusFilter === s ? 6 : 8, borderBottom: statusFilter === s ? "2px solid #0b7a53" : "2px solid transparent", color: statusFilter === s ? "#0b7a53" : "#6b7280", fontWeight: statusFilter === s ? 700 : 500 }}>
                  {s}
                </div>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr 1fr 1fr 1fr 1fr", gap: 12, alignItems: "center", fontWeight: 700, padding: "8px 6px", borderBottom: "1px solid #eee" }}>
              <div>BILL NUMBER</div>
              <div>CLIENT</div>
              <div>DATE</div>
              <div style={{ textAlign: "right" }}>TOTAL AMOUNT</div>
              <div style={{ textAlign: "right" }}>PAID AMT.</div>
              <div style={{ textAlign: "center" }}>STATUS</div>
            </div>

            {billsLoading ? (
              <div style={{ padding: 28, textAlign: "center" }}>Loading...</div>
            ) : billsError ? (
              <div style={{ padding: 28, textAlign: "center", color: "#b91c1c" }}>{billsError}</div>
            ) : filteredBills.length === 0 ? (
              <div style={{ padding: 28, textAlign: "center", color: "#6b7280" }}>There are no items to display...</div>
            ) : (
              filteredBills.map((b) => (
                <div key={b.id} style={{ display: "grid", gridTemplateColumns: "1fr 2fr 1fr 1fr 1fr 1fr", gap: 12, alignItems: "center", padding: "10px 6px", borderBottom: "1px solid #f3f4f6" }}>
                  <div style={{ cursor: "pointer", color: "#0b7a53" }} onClick={() => router.push(`/billing/bills/${b.id}`)}>{b.billNumber}</div>
                  <div>{b.clientName}</div>
                  <div>{b.createdAt ? new Date(b.createdAt).toLocaleDateString() : ""}</div>
                  <div style={{ textAlign: "right" }}>Rs. {(b.totalAmount ?? 0).toFixed(2)}</div>
                  <div style={{ textAlign: "right" }}>Rs. {(b.paidAmount ?? 0).toFixed(2)}</div>
                  <div style={{ textAlign: "center", textTransform: "capitalize" }}>{b.status}</div>
                </div>
              ))
            )}

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 12 }}>
              <div style={{ color: "#6b7280" }}>
                Showing {bills.length === 0 ? 0 : Math.min((page - 1) * pageSize + 1, bills.length)} - {Math.min(page * pageSize, bills.length)} of {bills.length}
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page <= 1} style={{ padding: "6px 10px", borderRadius: 6, border: "1px solid #e5e7eb", background: "#fff" }}>Prev</button>
                <button onClick={() => setPage((p) => p + 1)} disabled={page * pageSize >= bills.length} style={{ padding: "6px 10px", borderRadius: 6, border: "1px solid #e5e7eb", background: "#fff" }}>Next</button>
              </div>
            </div>
          </div>
        ) : activeTopTab === "SP and Referral Commissions" ? (
          <div style={{ background: "#fff", borderRadius: 10, padding: 20, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
            <div style={{ fontWeight: 700, marginBottom: 8 }}>SP and Referral Commissions</div>
            <div style={{ color: "#6b7280" }}>This view is not implemented yet. Click the tab again to open the dedicated SP & Referral route.</div>
          </div>
        ) : (
          // NEW BILL editor
          <div style={{ background: "#fff", borderRadius: 10, boxShadow: "0 4px 12px rgba(0,0,0,0.05)", padding: 20, marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 24, marginBottom: 18 }}>
              <div style={{ flex: 1.2 }}>
                <div style={{ marginBottom: 10 }} ref={clientFieldRef}>
                  <label style={labelStyle}>Client</label>
                  <div style={{ position: "relative" }}>
                    <input
                      style={{ ...inputStyle, width: "100%" }}
                      value={showNameInInput}
                      onChange={(e) => {
                        setClientSearch(e.target.value);
                        setClientDropdownOpen(true);
                      }}
                      onFocus={() => setClientDropdownOpen(true)}
                      placeholder="Search or type client..."
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedClientId(null);
                        setClientName("WalkIn Customer");
                        setClientSearch("");
                      }}
                      style={{ position: "absolute", right: 4, top: "50%", transform: "translateY(-50%)", border: "none", background: "transparent", cursor: "pointer", fontSize: 16, color: "#6b7280" }}
                      title="Clear selection"
                    >
                      ×
                    </button>

                    {clientDropdownOpen && (
                      <div style={{ position: "absolute", left: 0, right: 0, top: "100%", marginTop: 4, background: "#ffffff", borderRadius: 6, boxShadow: "0 8px 16px rgba(0,0,0,0.12)", maxHeight: 260, overflowY: "auto", zIndex: 20, fontSize: 13 }}>
                        {filteredClients.length === 0 && <div style={{ padding: "8px 10px", color: "#6b7280" }}>No clients match.</div>}
                        {filteredClients.map((c) => (
                          <div key={c.id} onClick={() => handleSelectClient(c)} style={{ padding: "8px 10px", cursor: "pointer", borderBottom: "1px solid #f3f4f6", background: c.id === selectedClientId ? "#e0f2fe" : "#ffffff" }}>
                            <div style={{ fontWeight: 600 }}>{c.fullName}</div>
                            <div style={{ fontSize: 11, color: "#6b7280" }}>{c.id} {c.age != null ? `, ${c.age} Y` : ""} {c.gender ? ` / ${c.gender}` : ""}</div>
                          </div>
                        ))}
                        <div onClick={handleAddClientClick} style={{ padding: "8px 10px", cursor: "pointer", borderTop: "1px solid #e5e7eb", background: "#f9fafb", fontWeight: 500, color: "#0b7a53" }}>
                          Add "{clientSearch || clientName || "client"}"
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div style={{ marginBottom: 10 }}>
                  <label style={labelStyle}>Issue Date</label>
                  <input type="date" style={inputStyle} value={issueDate} onChange={(e) => setIssueDate(e.target.value)} />
                </div>

                <div style={{ marginBottom: 10 }}>
                  <label style={labelStyle}>Referrer</label>
                  <input style={inputStyle} value={referrer} onChange={(e) => setReferrer(e.target.value)} placeholder="Referrer select or create..." />
                </div>
              </div>

              <div style={{ flex: 0.8, fontSize: 12, display: "grid", gridTemplateColumns: "1.1fr 1.3fr", rowGap: 8, columnGap: 10, alignItems: "center" }}>
                <span style={{ fontWeight: 600 }}>Invoice Number</span>
                <span>Auto</span>

                <span style={{ fontWeight: 600 }}>Insurance no.</span>
                <input style={inputStyle} placeholder="Insurance no." />

                <span style={{ fontWeight: 600 }}>Claim code</span>
                <input style={inputStyle} placeholder="Claim code" />
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
              <div style={{ flex: 1.4 }}>
                <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
                  <input type="checkbox" defaultChecked style={{ marginRight: 6 }} />
                  <span style={{ fontSize: 13 }}>Delivered</span>
                </div>

                <div style={{ background: "#f9fafb", borderRadius: 6, padding: "8px 10px", fontSize: 12, fontWeight: 600, display: "grid", gridTemplateColumns: "5fr 1.3fr 0.8fr 1fr 1.3fr 1.3fr 40px", columnGap: 6, marginBottom: 6 }}>
                  <div>Description / Product</div>
                  <div style={{ textAlign: "center" }}>DEPT</div>
                  <div style={{ textAlign: "center" }}>QTY</div>
                  <div style={{ textAlign: "center" }}>UNIT</div>
                  <div style={{ textAlign: "center" }}>RATE/QTY</div>
                  <div style={{ textAlign: "center" }}>AMOUNT</div>
                  <div></div>
                </div>

                {items.map((item) => {
                  const rowAmount = (Number(item.qty) || 0) * (Number(item.rate) || 0);
                  return (
                    <div key={item.id} style={{ display: "grid", gridTemplateColumns: "5fr 1.3fr 0.8fr 1fr 1.3fr 1.3fr 40px", columnGap: 6, marginBottom: 6 }}>
                      <div style={{ position: "relative" }}>
                        <input
                          list={`services-list-${item.id}`}
                          style={inputStyle}
                          placeholder="Enter description or select a product"
                          value={item.description}
                          onChange={(e) => {
                            const val = e.target.value;
                            handleItemChange(item.id, "description", val);
                            const matched = services.find((s) => String(s.name).toLowerCase() === String(val).toLowerCase());
                            if (matched) {
                              if (matched.department) handleItemChange(item.id, "dept", matched.department || "");
                              handleItemChange(item.id, "rate", Number(matched.price || 0));
                            }
                          }}
                          onBlur={(e) => {
                            const val = e.target.value.trim().toLowerCase();
                            if (!val) return;
                            const matched = services.find((s) => String(s.name).toLowerCase() === val);
                            if (matched) {
                              if (matched.department) handleItemChange(item.id, "dept", matched.department || "");
                              handleItemChange(item.id, "rate", Number(matched.price || 0));
                            }
                          }}
                        />
                        <datalist id={`services-list-${item.id}`}>{services.map((s) => <option key={s.id} value={s.name} />)}</datalist>
                      </div>

                      <select style={inputStyle} value={item.dept} onChange={(e) => handleItemChange(item.id, "dept", e.target.value)}>
                        <option value="">Dept</option>
                        <option value="Lab">Lab</option>
                        <option value="Radiology">Radiology</option>
                        <option value="Pathology">Pathology</option>
                      </select>
                      <input style={inputStyle} type="number" min={1} value={item.qty} onChange={(e) => handleItemChange(item.id, "qty", Number(e.target.value) || 0)} />
                      <select style={inputStyle} value={item.unit} onChange={(e) => handleItemChange(item.id, "unit", e.target.value)}>
                        <option value="pcs">pcs</option>
                        <option value="test">test</option>
                      </select>
                      <input style={inputStyle} type="number" min={0} value={item.rate} onChange={(e) => handleItemChange(item.id, "rate", Number(e.target.value) || 0)} />
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, border: "1px solid #e5e7eb", borderRadius: 4, background: "#f9fafb" }}>Rs. {rowAmount.toFixed(2)}</div>
                      <button type="button" onClick={() => removeItemRow(item.id)} style={{ border: "none", background: "transparent", cursor: "pointer", color: "#dc2626", fontSize: 18 }} title="Remove row">×</button>
                    </div>
                  );
                })}

                <button type="button" onClick={addItemRow} style={{ marginTop: 8, padding: "8px 14px", borderRadius: 4, border: "1px solid #0b7a53", background: "#e6f4ef", color: "#0b7a53", fontSize: 13, cursor: "pointer" }}>
                  ADD BILL ITEM
                </button>
              </div>

              <div style={{ flex: 0.9, fontSize: 13, display: "grid", rowGap: 8 }}>
                <RowLabelValue label="Gross total amount" value={grossTotal} />

                <div style={{ display: "grid", gridTemplateColumns: "1.4fr 3fr", alignItems: "center", columnGap: 6 }}>
                  <span style={{ color: "#4b5563" }}>Discount</span>
                  <div style={{ display: "flex", gap: 6 }}>
                    <select style={{ ...inputStyle, width: 70 }} value={discountMode} onChange={(e) => setDiscountMode(e.target.value as DiscountMode)}>
                      <option value="%">%</option>
                      <option value="Rs">Rs</option>
                    </select>
                    <input style={{ ...inputStyle, flex: 1 }} type="number" min={0} value={discountValue} onChange={(e) => setDiscountValue(Number(e.target.value) || 0)} />
                  </div>
                </div>

                <RowLabelValue label="Taxable Amount" value={taxableAmount} />

                <div style={{ display: "grid", gridTemplateColumns: "1.4fr 3fr", alignItems: "center", columnGap: 6 }}>
                  <span style={{ color: "#4b5563" }}>Rounding Off</span>
                  <input style={inputStyle} type="number" value={roundingOff} onChange={(e) => setRoundingOff(Number(e.target.value) || 0)} />
                </div>

                <RowLabelValue label="Total Amount" value={totalAmount} bold />

                <div style={{ fontSize: 12, color: "#6b7280" }}>{totalInWords}</div>

                <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
                  <input type="checkbox" checked={paidAll} onChange={(e) => setPaidAll(e.target.checked)} />
                  <span>Paid All</span>
                </div>

                <RowLabelInput label="Tender Amount" value={tenderAmount} onChange={(v) => setTenderAmount(v)} />

                <RowLabelValue label="Change Amount" value={changeAmount} />
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "flex-start", gap: 40, marginTop: 20 }}>
              <div style={{ flex: 1.4, fontSize: 13 }}>
                <div style={{ marginBottom: 12 }}>
                  <div style={{ marginBottom: 6, fontWeight: 600 }}>Remind On</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <button type="button" onClick={() => setRemindValue((v) => Math.max(v - 1, 0))} style={circleButton}>-</button>
                    <input style={{ ...inputStyle, width: 60, textAlign: "center" }} type="number" min={0} value={remindValue} onChange={(e) => setRemindValue(Math.max(Number(e.target.value) || 0, 0))} />
                    <button type="button" onClick={() => setRemindValue((v) => v + 1)} style={circleButton}>+</button>

                    {(["DAYS", "WEEK", "MONTH", "YEARS"] as const).map((u) => (
                      <button key={u} type="button" onClick={() => setRemindUnit(u)} style={{ padding: "5px 10px", borderRadius: 4, border: remindUnit === u ? "1px solid #0b7a53" : "1px solid #e5e7eb", background: remindUnit === u ? "#e6f4ef" : "#ffffff", fontSize: 11, cursor: "pointer" }}>
                        {u}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: 12 }}>
                  <div style={{ marginBottom: 4, fontWeight: 600 }}>Payment method</div>
                  <select style={{ ...inputStyle, width: 200 }} value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                    <option>Cash</option>
                    <option>Card</option>
                    <option>Online</option>
                  </select>
                </div>

                <div>
                  <div style={{ marginBottom: 4, fontWeight: 600 }}>Remarks</div>
                  <textarea style={{ ...inputStyle, minHeight: 80 }} value={remarks} onChange={(e) => setRemarks(e.target.value)} placeholder="Any notes or instructions..." />
                </div>
              </div>
            </div>

            <div style={{ position: "sticky", bottom: 0, left: 0, right: 0, marginLeft: -24, marginRight: -24, padding: "10px 24px", background: "#ffffff", borderTop: "1px solid #e5e7eb", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 13 }}>
              <div><strong>Total Amount:</strong> Rs. {totalAmount.toFixed(2)}</div>

              <div style={{ display: "flex", gap: 8 }}>
                <button type="button" style={bottomButtonMuted} onClick={handlePayUsingQr}>PAY USING QR CODE</button>
                <button type="button" style={bottomButtonMuted} onClick={handlePayWithNepalPay}>PAY WITH NEPAL PAY</button>
                <button type="button" style={bottomButtonMuted} onClick={openPrintPreview}>PRINT PREVIEW</button>
                <button type="button" style={bottomButtonGreen} onClick={handleSaveDraft} disabled={loadingAction}>{loadingAction ? "SAVING..." : "SAVE AS DRAFT"}</button>
                <button type="button" style={bottomButtonGreen} onClick={handleFinalise} disabled={loadingAction}>{loadingAction ? "PROCESSING..." : "FINALISE INVOICE"}</button>
                <button type="button" style={bottomButtonMuted} onClick={handleFinaliseAndPrint} disabled={loadingAction}>{loadingAction ? "PROCESSING..." : "FINALISE AND PRINT"}</button>
              </div>
            </div>

            {message && <div style={{ marginTop: 8, fontSize: 13, color: "#2e7d32" }}>{message}</div>}
            {error && <div style={{ marginTop: 8, fontSize: 13, color: "#b91c1c" }}>{error}</div>}

            {createClientOpen && (
              <CreateClientDrawer onClose={() => setCreateClientOpen(false)} onCreated={handleClientCreated} initialName={clientSearch || (clientName === "WalkIn Customer" ? "" : clientName)} />
            )}

            {qrModalOpen && (
              <div style={modalBackdropStyle}>
                <div style={modalStyle}>
                  <h3 style={{ marginTop: 0 }}>Pay using QR</h3>
                  <div style={{ margin: "12px 0" }}>
                    <img alt="qr" src={`https://chart.googleapis.com/chart?cht=qr&chs=250x250&chl=${encodeURIComponent(qrPaymentUrl)}`} />
                  </div>
                  <div style={{ wordBreak: "break-all", fontSize: 12 }}>{qrPaymentUrl}</div>
                  <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                    <button onClick={copyQrLink} style={bottomButtonGreen}>Copy Link</button>
                    <button onClick={() => setQrModalOpen(false)} style={bottomButtonMuted}>Close</button>
                  </div>
                </div>
              </div>
            )}

            {nepalPayModalOpen && (
              <div style={modalBackdropStyle}>
                <div style={modalStyle}>
                  <h3 style={{ marginTop: 0 }}>Pay with Nepal Pay</h3>
                  <div style={{ marginTop: 8 }}>This simulates redirecting to Nepal Pay. Replace with a real backend flow if needed.</div>
                  <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                    <button onClick={() => { setNepalPayModalOpen(false); setMessage("Nepal Pay flow simulated (no real payment)."); }} style={bottomButtonGreen}>OK</button>
                    <button onClick={() => setNepalPayModalOpen(false)} style={bottomButtonMuted}>Close</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

/* ------------ Small helper components ------------ */

function RowLabelValue({ label, value, bold }: { label: string; value: number; bold?: boolean; }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1.4fr 3fr", alignItems: "center", columnGap: 6 }}>
      <span style={{ color: "#4b5563" }}>{label}</span>
      <div style={{ ...inputStyle, display: "flex", alignItems: "center", justifyContent: "flex-start", border: "1px solid #e5e7eb", background: "#f9fafb", fontWeight: bold ? 700 : 500 }}>
        Rs. {value.toFixed(2)}
      </div>
    </div>
  );
}

function RowLabelInput({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void; }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1.4fr 3fr", alignItems: "center", columnGap: 6 }}>
      <span style={{ color: "#4b5563" }}>{label}</span>
      <input style={inputStyle} type="number" min={0} value={value} onChange={(e) => onChange(Number(e.target.value) || 0)} />
    </div>
  );
}

function TopTab({ label, active, onClick }: { label: string; active: boolean; onClick: () => void; }) {
  return (
    <div onClick={onClick} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === "Enter") onClick(); }} style={{ cursor: "pointer", color: active ? "#0b7a53" : "#6b7280", fontWeight: active ? 700 : 500, paddingBottom: active ? 6 : 8, borderBottom: active ? "2px solid #0b7a53" : "2px solid transparent" }}>
      {label}
    </div>
  );
}

/* shared styles */
const labelStyle: React.CSSProperties = { fontSize: 12, fontWeight: 600, marginBottom: 4, display: "block" };
const inputStyle: React.CSSProperties = { width: "100%", padding: "6px 8px", borderRadius: 4, border: "1px solid #d1d5db", fontSize: 13, boxSizing: "border-box" };
const circleButton: React.CSSProperties = { width: 28, height: 28, borderRadius: "50%", border: "1px solid #d1d5db", background: "#ffffff", cursor: "pointer", fontSize: 16 };
const bottomButtonMuted: React.CSSProperties = { padding: "8px 14px", borderRadius: 4, border: "1px solid #e5e7eb", background: "#f9fafb", color: "#374151", fontSize: 12, cursor: "pointer", whiteSpace: "nowrap" };
const bottomButtonGreen: React.CSSProperties = { padding: "8px 14px", borderRadius: 4, border: "none", background: "#0b7a53", color: "#ffffff", fontSize: 12, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" };

const modalBackdropStyle: React.CSSProperties = { position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 60 };
const modalStyle: React.CSSProperties = { background: "#fff", padding: 20, borderRadius: 8, width: 420, boxShadow: "0 6px 30px rgba(0,0,0,0.25)" };
