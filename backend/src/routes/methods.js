const express = require("express");
const router = express.Router();
const { Method } = require("../models");

// GET all methods
router.get("/", async (_req, res) => {
  const data = await Method.findAll({ order: [["name", "ASC"]] });
  res.json(data);
});

// CREATE method
router.post("/", async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Name required" });

  const record = await Method.create({ name });
  res.json(record);
});

module.exports = router;
