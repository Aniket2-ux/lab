const express = require("express");
const router = express.Router();
const { Test, TestCategory, SampleType, Method } = require("../models");

// GET all tests with relations
router.get("/", async (_req, res) => {
  const data = await Test.findAll({
    include: [
      { model: TestCategory, attributes: ["id", "name"] },
      { model: SampleType, attributes: ["id", "name"] },
      { model: Method, attributes: ["id", "name"] },
    ],
    order: [["name", "ASC"]],
  });
  res.json(data);
});

// CREATE test
router.post("/", async (req, res) => {
  const {
    code,
    name,
    unit,
    price,
    category_id,
    sample_type_id,
    method_id,
  } = req.body;

  if (
    !code ||
    !name ||
    !unit ||
    !price ||
    !category_id ||
    !sample_type_id ||
    !method_id
  ) {
    return res.status(400).json({ error: "All fields required" });
  }

  const test = await Test.create({
    code,
    name,
    unit,
    price,
    category_id,
    sample_type_id,
    method_id,
  });

  res.json(test);
});

module.exports = router;
