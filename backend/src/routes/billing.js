// backend/src/routes/billing.js
const express = require("express");
const { Op } = require("sequelize");
const Bill = require("../models/Bill");
const BillItem = require("../models/BillItem");

const router = express.Router();

/**
 * POST /api/billing
 * Creates a bill (draft or finalized).
 */
router.post("/", async (req, res) => {
  try {
    console.log("📥 /api/billing body:", JSON.stringify(req.body, null, 2));

    const {
      clientName,
      issueDate,
      items = [],
      grossTotal,
      discount,
      taxableAmount,
      roundingOff,
      totalAmount,
      paymentMethod,
      remarks,
      status = "draft",
    } = req.body;

    if (!clientName || !issueDate) {
      return res
        .status(400)
        .json({ error: "clientName and issueDate are required" });
    }

    // Ensure numbers are numbers (Postgres DECIMAL will choke on NaN)
    const safeGrossTotal = Number(grossTotal) || 0;
    const safeDiscount = Number(discount) || 0;
    const safeTaxableAmount = Number(taxableAmount) || 0;
    const safeRoundingOff = Number(roundingOff) || 0;
    const safeTotalAmount = Number(totalAmount) || 0;

    const bill = await Bill.create({
      clientName,
      issueDate,
      grossTotal: safeGrossTotal,
      discount: safeDiscount,
      taxableAmount: safeTaxableAmount,
      roundingOff: safeRoundingOff,
      totalAmount: safeTotalAmount,
      paymentMethod: paymentMethod || null,
      remarks: remarks || null,
      status,
    });

    if (Array.isArray(items) && items.length > 0) {
      const rows = items.map((it) => ({
        billId: bill.id,
        description: it.description || "",
        dept: it.dept || null,
        qty: Number(it.qty) || 1,
        unit: it.unit || "pcs",
        rate: Number(it.rate) || 0,
        amount: Number(it.amount) || 0,
      }));
      await BillItem.bulkCreate(rows);
    }

    console.log("✅ Bill created with id:", bill.id);
    res.status(201).json({ id: bill.id });
  } catch (err) {
    console.error("❌ Failed to create bill", err);
    res.status(500).json({
      error: "Failed to create bill",
      details: err.message,
    });
  }
});

/**
 * GET /api/billing/summary
 * -> { todaySales, totalSales }
 */
router.get("/summary", async (_req, res) => {
  try {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const [todaySalesRaw, totalSalesRaw] = await Promise.all([
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

    const todaySales = Number(todaySalesRaw || 0);
    const totalSales = Number(totalSalesRaw || 0);

    res.json({ todaySales, totalSales });
  } catch (err) {
    console.error("❌ Failed to get billing summary", err);
    res.status(500).json({ error: "Failed to get billing summary" });
  }
});

module.exports = router;
