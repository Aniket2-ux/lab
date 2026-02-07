const express = require("express");
const router = express.Router();
const db = require("../models");

const TestCategory = db.TestCategory;

/* GET all categories */
router.get("/", async (req, res) => {
  try {
    const data = await TestCategory.findAll({
      order: [["name", "ASC"]],
    });
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

/* CREATE category */
router.post("/", async (req, res) => {
  try {
    const category = await TestCategory.create({
      name: req.body.name,
    });
    res.json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create category" });
  }
});

module.exports = router;
