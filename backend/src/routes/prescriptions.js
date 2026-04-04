const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");

const Prescription = require("../models/prescription"); // ✅ FIX casing
const PrescriptionItem = require("../models/PrescriptionItem"); // ✅ NEW

/* =========================
   CREATE PRESCRIPTION (OPD)
========================= */
router.post("/", async (req, res) => {
  try {
    const {
      visitId,
      clientId,
      diagnosis,
      notes,
      items = [],
    } = req.body;

    // 1. Create prescription
    const prescription = await Prescription.create({
      visitId,
      clientId,
      diagnosis,
      notes,
    });

    // 2. Create items (medicine + service)
    const formattedItems = items.map((item) => ({
      prescriptionId: prescription.id,
      type: item.type,
      name: item.name,
      dosage: item.dosage,
      duration: item.duration,
      quantity: item.quantity,
      price: item.price,
    }));

    await PrescriptionItem.bulkCreate(formattedItems);

    res.status(201).json({
      success: true,
      prescription,
    });
  } catch (error) {
    console.error("Error creating prescription:", error);
    res.status(500).json({ error: "Error creating prescription" });
  }
});

/* =========================
   GET PRESCRIPTION BY VISIT
========================= */
router.get("/visit/:visitId", async (req, res) => {
  try {
    const { visitId } = req.params;

    const prescription = await Prescription.findOne({
      where: { visitId },
      include: [PrescriptionItem],
    });

    res.json(prescription);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching prescription" });
  }
});

/* =========================
   COUNT (UNCHANGED)
========================= */
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

/* =========================
   FOLLOWUPS (KEEP AS IS)
========================= */
router.get("/followups", async (req, res) => {
  res.json([]);
});

module.exports = router;