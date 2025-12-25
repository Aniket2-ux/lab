// backend/src/routes/services.js
const express = require("express");
const router = express.Router();
const Service = require("../models/Service");

/**
 * GET /api/services
 */
router.get("/", async (_req, res) => {
  try {
    const services = await Service.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.json(services);
  } catch (err) {
    console.error("FETCH SERVICES ERROR:", err);
    res.status(500).json({ error: "Failed to fetch services" });
  }
});

/**
 * POST /api/services
 */
router.post("/", async (req, res) => {
  try {
    const { name, type = "other", price = 0 } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ error: "Service name is required" });
    }

    const service = await Service.create({
      name: name.trim(),
      type,
      price,
    });

    res.status(201).json(service);
  } catch (err) {
    console.error("CREATE SERVICE ERROR:", err);
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
    console.error("DELETE SERVICE ERROR:", err);
    res.status(500).json({ error: "Failed to delete service" });
  }
});

module.exports = router;
