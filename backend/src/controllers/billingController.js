// backend/src/controllers/billingController.js
const fs = require("fs");
const path = require("path");

const DATA_FILE = path.join(__dirname, "..", "data", "bills.json");

function readData() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, "[]", "utf8");
    }
    const raw = fs.readFileSync(DATA_FILE, "utf8");
    return JSON.parse(raw || "[]");
  } catch (e) {
    console.error("readData error:", e);
    return [];
  }
}

function writeData(arr) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(arr, null, 2), "utf8");
    return true;
  } catch (e) {
    console.error("writeData error:", e);
    return false;
  }
}

function normalizeBillIncoming(body) {
  const now = new Date().toISOString();
  return {
    id: body.id ?? `local-${Date.now()}`,
    billNumber: body.billNumber ?? `INV-${Date.now()}`,
    clientName: body.clientName ?? "WalkIn Customer",
    createdAt: body.createdAt ?? now,
    issueDate: body.issueDate ?? now,
    totalAmount: Number(body.totalAmount ?? body.total ?? 0),
    paidAmount: Number(body.paidAmount ?? 0),
    status: body.status ?? "Draft",
    // keep entire payload for later inspection
    payload: body,
  };
}

exports.getBills = (req, res) => {
  const arr = readData();
  // return array in same shape frontend expects
  return res.json(arr);
};

exports.getBillById = (req, res) => {
  const id = req.params.id;
  const arr = readData();
  const bill = arr.find((b) => String(b.id) === String(id));
  if (!bill) return res.status(404).json({ error: "Not found" });
  return res.json(bill);
};

exports.createBill = (req, res) => {
  try {
    const payload = req.body || {};
    const bill = normalizeBillIncoming(payload);
    const arr = readData();
    // unshift newest first
    arr.unshift(bill);
    writeData(arr);
    // return created bill
    return res.status(201).json(bill);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Failed to save bill" });
  }
};

exports.createCreditNote = (req, res) => {
  // Very simple: create a new credit-note entry tied to the bill
  try {
    const billId = req.params.id;
    const arr = readData();
    const bill = arr.find((b) => String(b.id) === String(billId));
    if (!bill) {
      return res.status(404).json({ error: "Bill not found" });
    }
    // Create a credit note record (simple)
    const cn = {
      id: `cn-${Date.now()}`,
      forBillId: bill.id,
      createdAt: new Date().toISOString(),
      amount: req.body.amount ?? 0,
      note: req.body.note ?? "Credit note created",
    };
    // store credit notes inside bill.creditNotes array (simple)
    bill.creditNotes = bill.creditNotes || [];
    bill.creditNotes.unshift(cn);

    writeData(arr);
    return res.status(201).json(cn);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Credit note failed" });
  }
};

exports.printEstimate = (req, res) => {
  // For demo, return a simple "estimate" payload (in real app you'd generate PDF)
  const billId = req.params.id;
  const arr = readData();
  const bill = arr.find((b) => String(b.id) === String(billId));
  if (!bill) return res.status(404).json({ error: "Bill not found" });

  const estimate = {
    billNumber: bill.billNumber,
    clientName: bill.clientName,
    estimateDate: new Date().toISOString(),
    total: bill.totalAmount ?? 0,
    items: bill.payload?.items ?? [],
  };

  // optionally return PDF or HTML; here we return JSON for simplicity
  return res.json({ ok: true, estimate });
};
