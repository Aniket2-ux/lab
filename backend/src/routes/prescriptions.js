const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");

const Prescription = require("../models/prescription");
const PrescriptionItem = require("../models/PrescriptionItem");

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

    // 🔴 VALIDATION (IMPORTANT)
    if (!visitId || !clientId) {
      return res.status(400).json({
        error: "visitId and clientId are required",
      });
    }

    // 1️⃣ Create prescription
    const prescription = await Prescription.create({
      visitId,
      clientId,
      diagnosis,
      notes,
    });

    // 2️⃣ Create items (only if exist)
    if (items.length > 0) {
      const formattedItems = items.map((item) => ({
        prescriptionId: prescription.id,
        type: item.type || null,
        name: item.name || null,
        dosage: item.dosage || null,
        duration: item.duration || null,
        quantity: item.quantity || null,
        price: item.price || null,
      }));

      await PrescriptionItem.bulkCreate(formattedItems);
    }

    // 3️⃣ Fetch with items (RETURN CLEAN DATA)
    const fullPrescription = await Prescription.findByPk(
      prescription.id,
      {
        include: [
          {
            model: PrescriptionItem,
            as: "items", // ⚠️ depends on your model relation
          },
        ],
      }
    );

    res.status(201).json({
      success: true,
      prescription: fullPrescription,
    });
  } catch (error) {
    console.error("❌ Error creating prescription:", error);
    res.status(500).json({
      error: "Error creating prescription",
      details: error.message,
    });
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
      include: [
        {
          model: PrescriptionItem,
          as: "items", // ⚠️ IMPORTANT
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    if (!prescription) {
      return res.status(404).json({
        error: "Prescription not found",
      });
    }

    res.json(prescription);
  } catch (err) {
    console.error("❌ Error fetching prescription:", err);
    res.status(500).json({
      error: "Error fetching prescription",
      details: err.message,
    });
  }
});

/* =========================
   COUNT
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
    console.error("❌ Error counting prescriptions:", err);
    res.status(500).json({ error: "Error counting prescriptions" });
  }
});

/* =========================
   FOLLOWUPS
========================= */
router.get("/followups", async (req, res) => {
  res.json([]);
});

module.exports = router;