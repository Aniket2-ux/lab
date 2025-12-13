"use client";

import Sidebar from "@/components/Sidebar";
import HeaderBar from "@/components/HeaderBar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SPAndReferralPage() {
  const router = useRouter();

  useEffect(() => { window.scrollTo(0,0); }, []);

  return (
    <div style={{ display:"flex", height:"100vh", overflow:"hidden" }}>
      <Sidebar />
      <main style={{ flex:1, padding:24, background:"#f5f7fb", overflowY:"auto" }}>
        <HeaderBar pageTitle="Billing" />
        <div style={{ marginTop:8, marginBottom:12 }}>
          <div style={{ display:"flex", gap:16, alignItems:"center", fontSize:14 }}>
            <div style={{ cursor:"pointer", color:"#6b7280" }} onClick={() => router.push("/billing")}>New Bill</div>
            <div style={{ cursor:"pointer", color:"#6b7280" }} onClick={() => router.push("/billing/previous")}>Previous</div>
            <div style={{ cursor:"pointer", color:"#0b7a53", fontWeight:700, paddingBottom:6, borderBottom:"2px solid #0b7a53" }}>SP and Referral Commissions</div>
          </div>
        </div>

        <div style={{ background:"#fff", borderRadius:10, boxShadow:"0 4px 12px rgba(0,0,0,0.05)", padding:20 }}>
          <div style={{ fontWeight:700, marginBottom:8 }}>SP and Referral Commissions</div>
          <div style={{ color:"#6b7280", background:"#fff", padding:16, borderRadius:8 }}>
            <div style={{ display:"flex", gap:12, alignItems:"center", marginBottom:12 }}>
              <input placeholder="Search..." style={{ padding:"8px 12px", borderRadius:6, border:"1px solid #e5e7eb", flex:1 }} />
              <select style={{ padding:"8px 12px", borderRadius:6, border:"1px solid #e5e7eb" }}><option>CLIENT</option></select>
              <div style={{ marginLeft:"auto", display:"flex", gap:8 }}>
                <button onClick={() => router.push("/billing")} style={{ padding:"8px 12px", borderRadius:6, border:"1px solid #0b7a53", background:"#0b7a53", color:"#fff" }}>CREATE NEW</button>
              </div>
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"1fr 2fr 1fr 1fr 1fr 1fr", gap:12, alignItems:"center", fontWeight:700, padding:"8px 6px", borderBottom:"1px solid #eee" }}>
              <div>BILL NUMBER</div><div>CLIENT</div><div>DATE</div><div style={{textAlign:"right"}}>TOTAL AMOUNT</div><div style={{textAlign:"right"}}>PAID AMT.</div><div style={{textAlign:"center"}}>STATUS</div>
            </div>

            <div style={{ padding:48, textAlign:"center", color:"#6b7280", minHeight:220 }}>
              <svg width="260" height="140" viewBox="0 0 260 140" fill="none" style={{ marginBottom:12 }}>
                <rect x="10" y="10" rx="6" width="240" height="18" fill="#f1fbf6"/>
                <rect x="22" y="14" width="120" height="10" rx="4" fill="#bfead7"/>
                <rect x="10" y="36" rx="6" width="240" height="18" fill="#f1fbf6"/>
                <rect x="22" y="40" width="150" height="10" rx="4" fill="#bfead7"/>
                <rect x="10" y="62" rx="6" width="240" height="18" fill="#f1fbf6"/>
                <rect x="22" y="66" width="100" height="10" rx="4" fill="#bfead7"/>
                <rect x="10" y="88" rx="6" width="240" height="18" fill="#f1fbf6"/>
                <rect x="22" y="92" width="170" height="10" rx="4" fill="#bfead7"/>
              </svg>
              <div style={{ fontSize:15, fontWeight:500 }}>There are no items to display...</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
