const express = require("express");
const router = express.Router();
const Visit = require("../models/Visit");

// ✅ CREATE VISIT
router.post("/", async (req, res) => {
  try {
    const { clientId, notes } = req.body;

    const visit = await Visit.create({
      clientId,
      notes,
    });

    res.json(visit);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create visit" });
  }
});

// ✅ GET VISITS BY CLIENT
router.get("/:clientId", async (req, res) => {
  try {
    const visits = await Visit.findAll({
      where: { clientId: req.params.clientId },
      order: [["createdAt", "DESC"]],
    });

    res.json(visits);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch visits" });
  }
});

module.exports = router;