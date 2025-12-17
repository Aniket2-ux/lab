const express = require("express");
const router = express.Router();
const LabRecord = require("../models/LabRecord");

/**
 * POST /api/lab/records
 */
router.post("/records", async (req, res) => {
  try {
    const {
      billId,
      billNumber,
      clientName,
      issueDate,
      items,
      status = "Ordered",
    } = req.body;

    if (!billId || !clientName || !issueDate || !Array.isArray(items)) {
      return res.status(400).json({
        error: "billId, clientName, issueDate, items are required",
      });
    }

    const record = await LabRecord.create({
      billId: String(billId),
      billNumber: billNumber || String(billId),
      clientName,
      issueDate,
      items,
      status,
    });

    res.status(201).json(record);
  } catch (err) {
    console.error("❌ LAB CREATE ERROR:", err);
    res.status(500).json({
      error: "Failed to create lab record",
      details: err.message,
    });
  }
});

/**
 * GET /api/lab/records
 * NORMALIZE OLD + NEW DATA
 */
router.get("/records", async (_req, res) => {
  try {
    const records = await LabRecord.findAll({
      order: [["createdAt", "DESC"]],
    });

    const normalized = records.map((r) => {
      let parsedItems = [];

      if (Array.isArray(r.items)) {
        parsedItems = r.items;
      } else if (typeof r.items === "string") {
        try {
          parsedItems = JSON.parse(r.items);
        } catch {
          parsedItems = [];
        }
      }

      return {
        ...r.toJSON(),
        items: parsedItems,
      };
    });

    res.json(normalized);
  } catch (err) {
    console.error("❌ LAB FETCH ERROR:", err);
    res.status(500).json({ error: "Failed to fetch lab records" });
  }
});

module.exports = router;
