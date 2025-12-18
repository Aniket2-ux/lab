const express = require("express");
const router = express.Router();
const authMiddleware = require("./authMiddleware");
const LabTest = require("../models/LabTest");

// GET all lab tests
router.get("/", authMiddleware, async (req, res) => {
  const tests = await LabTest.findAll({
    order: [["name", "ASC"]],
  });
  res.json(tests);
});

// CREATE lab test (Settings → Lab)
router.post("/", authMiddleware, async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Test name required" });
  }

  const existing = await LabTest.findOne({ where: { name } });
  if (existing) {
    return res.status(400).json({ message: "Test already exists" });
  }

  const test = await LabTest.create({ name });
  res.json(test);
});

module.exports = router;
