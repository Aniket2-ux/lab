const express = require("express");
const router = express.Router();
const authMiddleware = require("./authMiddleware");
const LabTest = require("../models/LabTest");

/* GET LAB TESTS */
router.get("/", authMiddleware, async (req, res) => {
  const tests = await LabTest.findAll({ order: [["name", "ASC"]] });
  res.json(tests);
});

/* CREATE LAB TEST */
router.post("/", authMiddleware, async (req, res) => {
  const { name, unit, normalRange, price } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Name required" });
  }

  const exists = await LabTest.findOne({ where: { name } });
  if (exists) {
    return res.status(400).json({ message: "Already exists" });
  }

  const test = await LabTest.create({
    name,
    unit,
    normalRange,
    price,
  });

  res.json(test);
});

module.exports = router;
