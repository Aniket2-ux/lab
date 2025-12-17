const express = require("express");
const { Op } = require("sequelize");

const Bill = require("../models/Bill");
const BillItem = require("../models/BillItem");
const LabRecord = require("../models/LabRecord");

const router = express.Router();

/**
 * POST /api/billing
 * Create bill + bill items + lab record (if finalized + lab items)
 */
router.post("/", async (req, res) => {
  try {
    const {
      clientName,
      issueDate,
      items = [],
      grossTotal = 0,
      discount = 0,
      taxableAmount = 0,
      roundingOff = 0,
      totalAmount = 0,
      paymentMethod,
      remarks,
      status = "draft",
      action,
    } = req.body;

    if (!clientName || !issueDate) {
      return res.status(400).json({
        error: "clientName and issueDate are required",
      });
    }

    /* =========================
       FINAL STATUS
    ========================= */
    const finalStatus =
      action === "finalize" ||
      action === "finalise" ||
      String(status).toLowerCase() === "finalized"
        ? "finalized"
        : "draft";

    /* =========================
       🔑 BILL NUMBER (FIX)
    ========================= */
    const generatedBillNumber = `INV-${Date.now()}`;

    /* =========================
       CREATE BILL
    ========================= */
    const bill = await Bill.create({
      billNumber: generatedBillNumber,
      clientName,
      issueDate,
      grossTotal: Number(grossTotal) || 0,
      discount: Number(discount) || 0,
      taxableAmount: Number(taxableAmount) || 0,
      roundingOff: Number(roundingOff) || 0,
      totalAmount: Number(totalAmount) || 0,
      paymentMethod: paymentMethod || null,
      remarks: remarks || null,
      status: finalStatus,
    });

    /* =========================
       BILL ITEMS
    ========================= */
    if (Array.isArray(items) && items.length > 0) {
      await BillItem.bulkCreate(
        items.map((it) => ({
          billId: bill.id,
          description: it.description || "",
          dept: it.dept || "",
          qty: Number(it.qty) || 1,
          unit: it.unit || "pcs",
          rate: Number(it.rate) || 0,
          amount:
            Number(it.amount) ||
            Number(it.qty || 0) * Number(it.rate || 0),
        }))
      );
    }

    /* =========================
       LAB ITEM DETECTION
    ========================= */
    const labItems = items.filter((i) => {
      const dept = String(i.dept || "").toLowerCase();
      const desc = String(i.description || "").toLowerCase();

      return (
        dept.includes("lab") ||
        desc.includes("cbc") ||
        desc.includes("test") ||
        desc.includes("blood") ||
        desc.includes("urine")
      );
    });

    console.log("🧪 BILL → LAB DEBUG", {
      billNumber: generatedBillNumber,
      finalStatus,
      labItemsCount: labItems.length,
    });

    /* =========================
       CREATE LAB RECORD (FIX)
    ========================= */
    if (finalStatus === "finalized" && labItems.length > 0) {
      await LabRecord.create({
        billId: String(bill.id),
        billNumber: generatedBillNumber, // ✅ FIXED
        clientName,
        issueDate,
        items: labItems.map((i) => ({
          description: i.description,
          qty: Number(i.qty) || 1,
          rate: Number(i.rate) || 0,
          amount:
            Number(i.amount) ||
            Number(i.qty || 0) * Number(i.rate || 0),
          unit: i.unit || "pcs",
          dept: "Lab",
        })),
        status: "Ordered",
      });

      console.log("✅ LAB RECORD CREATED:", generatedBillNumber);
    }

    res.status(201).json({
      success: true,
      billId: bill.id,
      billNumber: generatedBillNumber,
      status: finalStatus,
    });
  } catch (err) {
    console.error("❌ BILLING ERROR:", err);
    res.status(500).json({
      error: "Failed to create bill",
      details: err.message,
    });
  }
});

/**
 * GET /api/billing/summary
 */
router.get("/summary", async (_req, res) => {
  try {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const [todaySales, totalSales] = await Promise.all([
      Bill.sum("totalAmount", {
        where: {
          status: "finalized",
          createdAt: { [Op.between]: [todayStart, todayEnd] },
        },
      }),
      Bill.sum("totalAmount", {
        where: { status: "finalized" },
      }),
    ]);

    res.json({
      todaySales: Number(todaySales || 0),
      totalSales: Number(totalSales || 0),
    });
  } catch {
    res.status(500).json({ error: "Failed to get summary" });
  }
});

module.exports = router;
