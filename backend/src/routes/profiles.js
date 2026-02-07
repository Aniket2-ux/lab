const express = require("express");
const router = express.Router();
const { Profile, Test } = require("../models");

// GET all profiles with tests
router.get("/", async (_req, res) => {
  const data = await Profile.findAll({
    include: [{ model: Test }],
    order: [["name", "ASC"]],
  });
  res.json(data);
});

// CREATE profile with tests
router.post("/", async (req, res) => {
  const { code, name, price, test_ids } = req.body;

  if (!code || !name || !price || !Array.isArray(test_ids)) {
    return res.status(400).json({ error: "Invalid data" });
  }

  const profile = await Profile.create({ code, name, price });
  await profile.setTests(test_ids);

  res.json(profile);
});

module.exports = router;
