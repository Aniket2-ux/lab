// frontend/src/lib/billing.ts
export async function createInvoice(payload: any) {
  const res = await fetch("http://localhost:5000/api/billing", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const txt = await res.text().catch(()=>null);
    throw new Error(`API error ${res.status} ${txt || ""}`);
  }
  return res.json();
}
