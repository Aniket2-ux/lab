"use client";

import { useEffect, useMemo, useState } from "react";
import Sidebar from "@/components/Sidebar";
import HeaderBar from "@/components/HeaderBar";
import { useRouter } from "next/navigation";

type Bill = { id: string|number; billNumber?: string; clientName?: string; createdAt?: string; totalAmount?: number; paidAmount?: number; status?: string; };
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5000";
const LOCAL_STORAGE_KEY = "okhati_bills";

export default function BillingPreviousPage() {
  const router = useRouter();

  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string|null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [clientFilter, setClientFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<"Billed"|"Credited"|"Draft"|"Cancelled"|"Proforma Draft"|"All">("Billed");

  const [page, setPage] = useState(1);
  const pageSize = 12;

  useEffect(() => {
    let canceled = false;
    async function load() {
      setLoading(true); setError(null);
      try {
        const res = await fetch(`${API_BASE}/api/billing`);
        if (res.ok) {
          const data = await res.json();
          if (!canceled) { setBills(Array.isArray(data)?data:data.items||[]); setLoading(false); return; }
        }
      } catch (e) {
        // fallback to localStorage
      }

      // fallback -> localStorage
      try {
        const raw = (typeof window !== "undefined") ? window.localStorage.getItem(LOCAL_STORAGE_KEY) : null;
        const arr = raw ? JSON.parse(raw) : [];
        setBills(arr.slice().reverse());
      } catch (e) {
        setError("Failed to load local bills");
        setBills([]);
      } finally {
        if (!canceled) setLoading(false);
      }
    }

    load();

    function onStorage(e: StorageEvent) {
      if (e.key === LOCAL_STORAGE_KEY) {
        const arr = e.newValue ? JSON.parse(e.newValue) : [];
        setBills(arr.slice().reverse());
      }
    }
    window.addEventListener("storage", onStorage);
    return () => { canceled = true; window.removeEventListener("storage", onStorage); };
  }, []);

  const clients = useMemo(() => {
    const s = new Set<string>();
    bills.forEach(b => b.clientName && s.add(b.clientName));
    return Array.from(s);
  }, [bills]);

  const filtered = useMemo(() => {
    const t = searchTerm.trim().toLowerCase();
    return bills.filter(b => {
      if (statusFilter !== "All") {
        const s = (b.status||"").toLowerCase();
        if (statusFilter === "Billed") {
          if (!["billed","paid","finalized"].some(x=>s.includes(x))) return false;
        } else if (!s.includes(statusFilter.toLowerCase())) return false;
      }
      if (clientFilter && (b.clientName||"") !== clientFilter) return false;
      if (!t) return true;
      return (b.clientName||"").toLowerCase().includes(t) || String(b.billNumber||"").toLowerCase().includes(t) || String(b.id||"").toLowerCase().includes(t);
    }).slice((page-1)*pageSize, page*pageSize);
  }, [bills, searchTerm, clientFilter, statusFilter, page]);

  function goCreateNew(){ router.push("/billing"); }

  return (
    <div style={{ display:"flex", height:"100vh", overflow:"hidden" }}>
      <Sidebar />
      <main style={{ flex:1, padding:24, background:"#f5f7fb", overflowY:"auto" }}>
        <HeaderBar pageTitle="Billing" />
        <div style={{ marginTop:8, marginBottom:12 }}>
          <div style={{ display:"flex", gap:16, alignItems:"center", fontSize:14 }}>
            <div style={{ cursor:"pointer", color:"#6b7280" }} onClick={() => router.push("/billing")}>New Bill</div>
            <div style={{ cursor:"pointer", color:"#0b7a53", fontWeight:700, borderBottom:"2px solid #0b7a53", paddingBottom:6 }}>Previous</div>
            <div style={{ cursor:"pointer", color:"#6b7280" }} onClick={() => router.push("/billing/sp-and-referral")}>SP and Referral Commissions</div>
          </div>
        </div>

        <div style={{ background:"#fff", borderRadius:10, padding:20 }}>
          <div style={{ display:"flex", gap:12, marginBottom:12 }}>
            <input placeholder="Search..." value={searchTerm} onChange={(e)=>{ setSearchTerm(e.target.value); setPage(1); }} style={{ flex:1, padding:8, borderRadius:6, border:"1px solid #ccc" }} />
            <select value={clientFilter} onChange={(e)=>{ setClientFilter(e.target.value); setPage(1); }} style={{ padding:8, borderRadius:6, border:"1px solid #ccc" }}>
              <option value="">CLIENT</option>
              {clients.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <div style={{ marginLeft:"auto", display:"flex", gap:8 }}>
              <button onClick={goCreateNew} style={{ padding:"8px 12px", borderRadius:6, border:"1px solid #0b7a53", background:"#0b7a53", color:"#fff" }}>CREATE NEW</button>
            </div>
          </div>

          <div style={{ display:"flex", gap:12, marginBottom:12, borderBottom:"1px solid #eee", paddingBottom:8 }}>
            { ["Billed","Credited","Draft","Cancelled","Proforma Draft","All"].map(s => (
              <div key={s} onClick={()=>{ setStatusFilter(s as any); setPage(1); }} style={{ cursor:"pointer", paddingBottom: statusFilter===s?6:8, borderBottom: statusFilter===s ? "2px solid #0b7a53":"2px solid transparent", color: statusFilter===s?"#0b7a53":"#6b7280", fontWeight: statusFilter===s?700:500 }}>{s}</div>
            )) }
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 2fr 1fr 1fr 1fr 1fr", gap:12, alignItems:"center", fontWeight:700, padding:"8px 6px", borderBottom:"1px solid #eee" }}>
            <div>BILL NUMBER</div><div>CLIENT</div><div>DATE</div><div style={{textAlign:"right"}}>TOTAL AMOUNT</div><div style={{textAlign:"right"}}>PAID AMT.</div><div style={{textAlign:"center"}}>STATUS</div>
          </div>

          { loading ? <div style={{padding:28, textAlign:"center"}}>Loading...</div>
            : error ? <div style={{padding:28, textAlign:"center", color:"red"}}>{error}</div>
            : filtered.length === 0 ? <div style={{padding:28, textAlign:"center", color:"#777"}}>There are no items to display...</div>
            : filtered.map(b => (
              <div key={String(b.id)} style={{ display:"grid", gridTemplateColumns:"1fr 2fr 1fr 1fr 1fr 1fr", padding:"10px 6px", borderBottom:"1px solid #f3f4f6", gap:12, alignItems:"center" }}>
                <div style={{ color:"#0b7a53", cursor:"pointer" }} onClick={() => router.push(`/billing/bills/${b.id}`)}>{b.billNumber}</div>
                <div>{b.clientName}</div>
                <div>{ b.createdAt ? new Date(b.createdAt).toLocaleDateString() : "" }</div>
                <div style={{ textAlign:"right" }}>Rs. {(b.totalAmount ?? 0).toFixed(2)}</div>
                <div style={{ textAlign:"right" }}>Rs. {(b.paidAmount ?? 0).toFixed(2)}</div>
                <div style={{ textAlign:"center" }}>{b.status}</div>
              </div>
            ))
          }

          <div style={{ display:"flex", justifyContent:"space-between", paddingTop:12 }}>
            <div style={{ color:"#777" }}>Showing {bills.length === 0 ? 0 : Math.min((page-1)*pageSize+1, bills.length)} - {Math.min(page*pageSize, bills.length)} of {bills.length}</div>
            <div style={{ display:"flex", gap:8 }}>
              <button disabled={page<=1} onClick={() => setPage(p => Math.max(1, p-1))} style={{ padding:"6px 10px" }}>Prev</button>
              <button disabled={page*pageSize >= bills.length} onClick={() => setPage(p => p+1)} style={{ padding:"6px 10px" }}>Next</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
