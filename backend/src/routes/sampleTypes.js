const express = require("express");
const router = express.Router();
const { SampleType } = require("../models");

// GET all sample types
router.get("/", async (_req, res) => {
  const data = await SampleType.findAll({ order: [["name", "ASC"]] });
  res.json(data);
});

// CREATE sample type
router.post("/", async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Name required" });

  const record = await SampleType.create({ name });
  res.json(record);
});

module.exports = router;
