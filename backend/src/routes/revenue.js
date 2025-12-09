// backend/src/routes/revenue.js
const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");

let Bill = null;

// Try to load Bill model if exists
try {
  Bill = require("../models/Bill");
} catch {
  console.log("Bill model not found — Revenue will return 0");
}

// Utility: start-of-day timestamp
const getStartOfToday = () => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
};

// GET revenue today + total
router.get("/", async (req, res) => {
  try {
    if (!Bill) {
      return res.json({ today: 0, total: 0 });
    }

    const startOfToday = getStartOfToday();

    const total = await Bill.sum("totalAmount") || 0;

    const today = await Bill.sum("totalAmount", {
      where: { createdAt: { [Op.gte]: startOfToday } },
    }) || 0;

    res.json({ today, total });
  } catch (err) {
    console.error("Revenue error:", err);
    res.status(500).json({ error: "Revenue error" });
  }
});

module.exports = router;
