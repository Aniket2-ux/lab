const express = require("express");
const router = express.Router();
const Service = require("../models/Service");

/* ================================
   GET /api/services
   Get all services
================================ */
router.get("/", async (req, res) => {
  try {
    const services = await Service.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.json(services);
  } catch (err) {
    console.error("Error fetching services:", err);
    res.status(500).json({ error: "Failed to fetch services" });
  }
});

/* ================================
   POST /api/services
   Create new service
================================ */
router.post("/", async (req, res) => {
  try {
    const {
      name,
      type = "other",
      serviceCode,
      unit = null,
      price = 0,
      taxPercent = 0,
      materialCharge = 0,
      labCharge = 0,
      providerRates = null,
      departments = [],
    } = req.body;

    /* ---------- VALIDATION ---------- */

    if (!name || !name.trim()) {
      return res.status(400).json({
        error: "Service name is required",
      });
    }

    // Auto-generate serviceCode if missing
    const finalServiceCode =
      serviceCode && serviceCode.trim()
        ? serviceCode.trim().toUpperCase()
        : name
            .trim()
            .toUpperCase()
            .replace(/[^A-Z0-9]+/g, "_")
            .replace(/^_|_$/g, "");

    // Prevent duplicates
    const existing = await Service.findOne({
      where: { serviceCode: finalServiceCode },
    });

    if (existing) {
      return res.status(400).json({
        error: `Service code '${finalServiceCode}' already exists`,
      });
    }

    const department =
      Array.isArray(departments) && departments.length > 0
        ? departments[0]?.department || null
        : null;

    /* ---------- CREATE ---------- */

    const service = await Service.create({
      name: name.trim(),
      serviceCode: finalServiceCode,
      type,
      department,
      price,
      // Future-ready fields (enable later if column exists)
      // meta: { unit, taxPercent, materialCharge, labCharge, providerRates },
    });

    res.status(201).json(service);
  } catch (err) {
    console.error("Error creating service:", err);
    res.status(500).json({ error: "Failed to create service" });
  }
});

/* ================================
   DELETE /api/services/:id
================================ */
router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!id) {
      return res.status(400).json({ error: "Invalid service id" });
    }

    const deleted = await Service.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).json({ error: "Service not found" });
    }

    res.json({ success: true });
  } catch (err) {
    console.error("Error deleting service:", err);
    res.status(500).json({ error: "Failed to delete service" });
  }
});

/* ================================
   POST /api/services/bulk-delete
================================ */
router.post("/bulk-delete", async (req, res) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        error: "ids array is required",
      });
    }

    const deletedCount = await Service.destroy({
      where: { id: ids },
    });

    res.json({
      success: true,
      deleted: deletedCount,
    });
  } catch (err) {
    console.error("Error bulk deleting services:", err);
    res.status(500).json({ error: "Failed to delete services" });
  }
});

module.exports = router;
