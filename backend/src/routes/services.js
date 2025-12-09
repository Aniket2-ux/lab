// backend/src/routes/services.js
const express = require("express");
const Service = require("../models/Service");

const router = express.Router();

/**
 * GET /api/services
 * Return all services for the Services page.
 */
router.get("/", async (req, res) => {
  try {
    const services = await Service.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.json(services);
  } catch (err) {
    console.error("Failed to fetch services", err);
    res.status(500).json({ error: "Failed to fetch services" });
  }
});

/**
 * POST /api/services
 * Create a new service from the Create Service modal.
 */
router.post("/", async (req, res) => {
  try {
    const {
      type,
      name,
      serviceCode,
      unit,
      price,
      taxPercent,
      materialCharge,
      labCharge,
      providerRates,
      departments,
    } = req.body;

    const mainDept =
      Array.isArray(departments) && departments.length > 0
        ? departments[0].department || null
        : null;

    const created = await Service.create({
      name,
      serviceCode: serviceCode || null,
      type: type || "other",
      department: mainDept,
      price: price ?? 0,
      // If you want to store extra info, add JSON column in model and uncomment:
      // meta: { unit, taxPercent, materialCharge, labCharge, providerRates },
    });

    res.status(201).json(created);
  } catch (err) {
    console.error("Failed to create service", err);
    res.status(500).json({ error: "Failed to create service" });
  }
});

/**
 * DELETE /api/services/:id
 * Delete a single service.
 */
router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ error: "Invalid id" });

    const deleted = await Service.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ error: "Service not found" });

    res.json({ success: true });
  } catch (err) {
    console.error("Failed to delete service", err);
    res.status(500).json({ error: "Failed to delete service" });
  }
});

/**
 * POST /api/services/bulk-delete
 * Body: { ids: number[] }
 */
router.post("/bulk-delete", async (req, res) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: "ids array is required" });
    }

    const deletedCount = await Service.destroy({
      where: { id: ids },
    });

    res.json({ success: true, deleted: deletedCount });
  } catch (err) {
    console.error("Failed to bulk delete services", err);
    res.status(500).json({ error: "Failed to delete services" });
  }
});

module.exports = router;
