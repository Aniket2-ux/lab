// backend/src/routes/prescriptions.js
const express = require("express");
const router = express.Router();
const Prescription = require("../models/prescription"); // 👈 FIXED HERE
const { Op } = require("sequelize");

// CREATE prescription
router.post("/", async (req, res) => {
  try {
    const record = await Prescription.create(req.body);
    res.status(201).json(record);
  } catch (error) {
    console.error("Error creating prescription:", error);
    res.status(500).json({ error: "Error creating prescription" });
  }
});

// COUNT prescriptions (today + total)
router.get("/count", async (req, res) => {
  try {
    const now = new Date();
    const startOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      0,
      0,
      0
    );

    const totalCount = await Prescription.count();
    const todayCount = await Prescription.count({
      where: { createdAt: { [Op.gte]: startOfToday } },
    });

    res.json({ totalCount, todayCount });
  } catch (err) {
    console.error("Error counting prescriptions:", err);
    res.status(500).json({ error: "Error counting prescriptions" });
  }
});

// FOLLOWUPS (empty for now)
router.get("/followups", async (req, res) => {
  res.json([]);
});

module.exports = router;
