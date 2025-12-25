// backend/src/routes/services.js
const express = require("express");
const router = express.Router();
const Service = require("../models/Service");

/* ================================
   GET /api/services
================================ */
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

/* ================================
   POST /api/services
================================ */
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
    console.error("Failed to create service", err);
    res.status(500).json({ error: "Failed to create service" });
  }
});

module.exports = router;
