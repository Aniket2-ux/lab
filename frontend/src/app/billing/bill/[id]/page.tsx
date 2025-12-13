"use client";
// snippets to add to your bill detail page component

import { useState } from "react";
import { useRouter } from "next/navigation";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5000";

export default function BillDetailTopActions({ billId }: { billId: string | number }) {
  const router = useRouter();
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [loadingCredit, setLoadingCredit] = useState(false);

  async function handleCreateCreditNote() {
    setActionError(null);
    setActionMessage(null);
    setLoadingCredit(true);

    try {
      const res = await fetch(`${API_BASE}/api/billing/${billId}/credit-note`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // optionally pass items if you want to customize:
        body: JSON.stringify({ note: "Created from UI", issueDate: new Date().toISOString().slice(0,10) }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.ok) {
        // backend returned an informative "no credit note model" message → fallback local flow
        const message = (data && (data.message || data.detail)) || `Credit note failed — check backend (${res.status})`;
        setActionError(message);
        // show the local fallback suggestion
        return;
      }

      setActionMessage(`Credit note created (${data.creditNumber}).`);
      // open preview route if present
      if (data.previewUrl) {
        // open in new tab
        window.open(data.previewUrl, "_blank");
      } else {
        // navigate to a local route if you have one
        router.push(`/billing/credit-notes/${data.creditNoteId}`);
      }
    } catch (err: any) {
      console.error("Credit note API failed", err);
      setActionError("Credit note failed — check backend or use local flow.");
    } finally {
      setLoadingCredit(false);
    }
  }

  return (
    <div>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <button className="btn btn-muted">Cancel</button>

        <button className="btn btn-outline" onClick={() => { navigator.clipboard?.writeText(window.location.href); }}>
          Copy
        </button>

        <button className="btn btn-primary" onClick={handleCreateCreditNote} disabled={loadingCredit}>
          {loadingCredit ? "Creating..." : "Credit Note"}
        </button>

        {/* other top actions */}
      </div>

      {actionMessage && (
        <div style={{ marginTop: 12, color: "#0b7a53" }}>
          {actionMessage}
        </div>
      )}

      {actionError && (
        <div style={{ marginTop: 12, color: "#b91c1c" }}>
          {actionError}
        </div>
      )}
    </div>
  );
}
