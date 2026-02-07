const express = require("express");
const router = express.Router();
const { TestParameter, Test } = require("../models");

// GET all parameters (with test)
router.get("/", async (_req, res) => {
  const data = await TestParameter.findAll({
    include: [{ model: Test, attributes: ["id", "name", "code"] }],
    order: [["name", "ASC"]],
  });
  res.json(data);
});

// GET parameters by test
router.get("/by-test/:testId", async (req, res) => {
  const data = await TestParameter.findAll({
    where: { test_id: req.params.testId },
    order: [["id", "ASC"]],
  });
  res.json(data);
});

// CREATE parameter
router.post("/", async (req, res) => {
  const {
    test_id,
    name,
    unit,
    normal_min,
    normal_max,
    critical_low,
    critical_high,
  } = req.body;

  if (!test_id || !name || !unit || normal_min == null || normal_max == null) {
    return res.status(400).json({ error: "Required fields missing" });
  }

  const record = await TestParameter.create({
    test_id,
    name,
    unit,
    normal_min,
    normal_max,
    critical_low,
    critical_high,
  });

  res.json(record);
});

module.exports = router;
