const express = require("express");
const router = express.Router();
const { TestCategory } = require("../models");

/* GET all categories */
router.get("/", async (req, res) => {
  const data = await TestCategory.findAll({ order: [["name", "ASC"]] });
  res.json(data);
});

/* CREATE category */
router.post("/", async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Name required" });

  const category = await TestCategory.create({ name });
  res.json(category);
});

module.exports = router;
