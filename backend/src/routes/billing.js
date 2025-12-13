const express = require("express");
const { Op } = require("sequelize");

const Bill = require("../models/Bill");
const BillItem = require("../models/BillItem");
const LabRecord = require("../models/LabRecord");

const router = express.Router();

/**
 * POST /api/billing
 * Create bill + bill items + lab record (if lab items exist)
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
      status = "draft", // IMPORTANT
    } = req.body;

    if (!clientName || !issueDate) {
      return res.status(400).json({
        error: "clientName and issueDate are required",
      });
    }

    // 1️⃣ Create Bill
    const bill = await Bill.create({
      clientName,
      issueDate,
      grossTotal: Number(grossTotal) || 0,
      discount: Number(discount) || 0,
      taxableAmount: Number(taxableAmount) || 0,
      roundingOff: Number(roundingOff) || 0,
      totalAmount: Number(totalAmount) || 0,
      paymentMethod: paymentMethod || null,
      remarks: remarks || null,
      status,
    });

    // 2️⃣ Create Bill Items
    if (Array.isArray(items) && items.length > 0) {
      await BillItem.bulkCreate(
        items.map((it) => ({
          billId: bill.id,
          description: it.description || "",
          dept: it.dept || null,
          qty: Number(it.qty) || 1,
          unit: it.unit || "pcs",
          rate: Number(it.rate) || 0,
          amount:
            Number(it.amount) ||
            (Number(it.qty || 0) * Number(it.rate || 0)),
        }))
      );
    }

    // 3️⃣ CREATE LAB RECORD (ONLY IF FINALIZED + LAB ITEMS)
    const labItems = items.filter((i) => i.dept === "Lab");

    if (status === "finalized" && labItems.length > 0) {
      await LabRecord.create({
        billId: bill.id,
        clientName,
        testNames: labItems.map((i) => i.description).join(", "),
        status: "Ordered",
      });

      console.log("🧪 Lab record created for bill:", bill.id);
    }

    res.status(201).json({
      success: true,
      billId: bill.id,
    });
  } catch (err) {
    console.error("❌ Billing failed:", err);
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
  } catch (err) {
    res.status(500).json({ error: "Failed to get summary" });
  }
});

module.exports = router;
