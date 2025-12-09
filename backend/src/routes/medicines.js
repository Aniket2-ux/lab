// backend/src/routes/medicines.js
const express = require("express");
const Medicine = require("../models/Medicine");

const router = express.Router();

// GET /api/medicines/barcode/:code
router.get("/barcode/:code", async (req, res) => {
  try {
    const { code } = req.params;

    const med = await Medicine.findOne({ where: { barcode: code } });

    if (!med) {
      return res.status(404).json({ error: "Medicine not found" });
    }

    res.json({
      id: med.id,
      barcode: med.barcode,
      name: med.name,
      department: med.department,
      unit: med.unit,
      price: Number(med.price),
    });
  } catch (err) {
    console.error("Failed to fetch medicine by barcode", err);
    res.status(500).json({ error: "Failed to fetch medicine" });
  }
});

module.exports = router;
