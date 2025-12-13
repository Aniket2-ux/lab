// backend/src/controllers/invoiceController.js
const sequelize = require("../db");

async function createInvoice(req, res) {
  try {
    const payload = req.body || {};
    console.log("📥 POST /api/invoices payload:", JSON.stringify(payload, null, 2));

    // Prefer Bill model (your repo uses Bill), fallback to Invoice
    const BillModel = sequelize.models.Bill || sequelize.models.Invoice;

    if (!BillModel) {
      console.error("❌ No Bill or Invoice model found in sequelize.models. Models available:", Object.keys(sequelize.models));
      return res.status(500).json({ error: "Server misconfigured: invoice model missing" });
    }

    // Map frontend fields to model fields. Adjust names if your Bill model is different.
    const clientId = payload.clientId ?? null;
    const clientName = payload.clientName ?? payload.customer ?? "WalkIn Customer";
    const issueDate = payload.issueDate ? new Date(payload.issueDate) : new Date();
    const totalAmount = Number(payload.totalAmount ?? payload.total ?? 0);
    const paymentMethod = payload.paymentMethod ?? payload.payment_method ?? null;
    const remarks = payload.remarks ?? payload.note ?? null;
    const items = Array.isArray(payload.items) ? payload.items : [];

    // Use only fields your model expects - adapt these keys if your Bill model uses different column names
    const createObj = {
      clientId,
      clientName,
      issueDate,
      totalAmount,
      paymentMethod,
      remarks,
    };

    // create the bill row
    const created = await BillModel.create(createObj);

    // if BillItem model exists and there are items, create them
    if (Array.isArray(items) && items.length > 0) {
      const BillItem = sequelize.models.BillItem || sequelize.models.Bill_Items || null;
      if (BillItem) {
        const rows = items.map((it) => ({
          billId: created.id,
          description: it.description ?? it.name ?? "",
          dept: it.dept ?? null,
          qty: Number(it.qty) || 1,
          unit: it.unit ?? "pcs",
          rate: Number(it.rate) || 0,
          amount: Number(it.amount ?? (it.qty * it.rate)) || 0,
        }));
        try {
          await BillItem.bulkCreate(rows);
        } catch (err) {
          console.error("⚠️ Failed to create BillItem rows:", err);
        }
      } else {
        console.warn("ℹ️ BillItem model not found; skipping items creation.");
      }
    }

    console.log("✅ Created invoice/bill id:", created.id);
    return res.status(201).json({ data: created });
  } catch (err) {
    // log full error (stack)
    console.error("🔥 createInvoice error:", err && err.stack ? err.stack : err);
    // return helpful message (don't leak secrets but include reason)
    return res.status(500).json({ error: "Failed to create invoice", details: err.message || err });
  }
}

module.exports = {
  createInvoice,
};
