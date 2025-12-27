"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import apiClient from "@/lib/apiClient";


export default function BillDetailTopActions({
  billId,
}: {
  billId: string | number;
}) {
  const router = useRouter();

  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [loadingCredit, setLoadingCredit] = useState(false);

  async function handleCreateCreditNote() {
    setActionError(null);
    setActionMessage(null);
    setLoadingCredit(true);

    try {
      // ✅ USE apiClient (NO localhost, NO manual headers)
      const data = await apiClient<any>(
        `/api/billing/${billId}/credit-note`,
        {
          method: "POST",
          body: JSON.stringify({
            note: "Created from UI",
            issueDate: new Date().toISOString().slice(0, 10),
          }),
        }
      );

      // ---- Normalize backend responses safely ----
      const creditNumber =
        data.creditNumber ??
        data.number ??
        data.creditNo ??
        data.id;

      const previewUrl = data.previewUrl ?? data.url ?? null;
      const creditNoteId = data.creditNoteId ?? data.id ?? null;

      setActionMessage(
        creditNumber
          ? `Credit note created (${creditNumber}).`
          : "Credit note created."
      );

      if (previewUrl) {
        window.open(previewUrl, "_blank");
      } else if (creditNoteId) {
        router.push(`/billing/credit-notes/${creditNoteId}`);
      }
    } catch (err: any) {
      console.error("Credit note API failed", err);
      setActionError(
        err?.message ||
          "Credit note failed — check backend or permissions."
      );
    } finally {
      setLoadingCredit(false);
    }
  }

  return (
    <div>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <button className="btn btn-muted">Cancel</button>

        <button
          className="btn btn-outline"
          onClick={() =>
            navigator.clipboard?.writeText(window.location.href)
          }
        >
          Copy
        </button>

        <button
          className="btn btn-primary"
          onClick={handleCreateCreditNote}
          disabled={loadingCredit}
        >
          {loadingCredit ? "Creating..." : "Credit Note"}
        </button>
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
