const express = require("express");
const Service = require("../models/Service");

const router = express.Router();

/**
 * GET /api/services
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
 */
router.post("/", async (req, res) => {
  try {
    const {
      name,
      type = "other",
      serviceCode = null,
      price = 0,
      departments = [],
    } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ error: "Service name is required" });
    }

    const department =
      Array.isArray(departments) && departments.length > 0
        ? departments[0]?.department || null
        : null;

    const service = await Service.create({
      name: name.trim(),
      serviceCode,
      type,
      department,
      price,
    });

    res.status(201).json(service);
  } catch (err) {
    console.error("Failed to create service", err);
    res.status(500).json({ error: "Failed to create service" });
  }
});

/**
 * DELETE /api/services/:id
 */
router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ error: "Invalid service id" });

    const deleted = await Service.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).json({ error: "Service not found" });
    }

    res.json({ success: true });
  } catch (err) {
    console.error("Failed to delete service", err);
    res.status(500).json({ error: "Failed to delete service" });
  }
});

/**
 * POST /api/services/bulk-delete
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
