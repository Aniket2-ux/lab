const API_BASE = process.env.NEXT_PUBLIC_API_BASE!;

export async function createInvoice(payload: any) {
  const res = await fetch(`${API_BASE}/api/billing`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const txt = await res.text().catch(() => null);
    throw new Error(`API error ${res.status} ${txt || ""}`);
  }

  return res.json();
}
