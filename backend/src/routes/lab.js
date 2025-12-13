const express = require("express");
const Bill = require("../models/Bill");
const BillItem = require("../models/BillItem");

const router = express.Router();

/**
 * GET /api/lab/records
 * Show lab records from finalized bills
 */
router.get("/records", async (req, res) => {
  try {
    const bills = await Bill.findAll({
      where: { status: "finalized" },
      include: [
        {
          model: BillItem,
          as: "items",
          where: { dept: "Lab" },
          required: true,
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    const records = bills.map((bill) => ({
      id: bill.id,
      billNumber: `LAB-${bill.id}`,
      clientName: bill.clientName,
      issueDate: bill.issueDate,
      status: "Ordered",
      items: bill.items,
      totalAmount: bill.totalAmount,
      createdAt: bill.createdAt,
      updatedAt: bill.updatedAt,
    }));

    res.json(records);
  } catch (err) {
    console.error("❌ Lab fetch failed", err);
    res.status(500).json({ error: "Failed to load lab records" });
  }
});

module.exports = router;
