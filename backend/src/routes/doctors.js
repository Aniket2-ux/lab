const router = require("express").Router();
const { Doctor } = require("../models");

router.get("/", async (_req, res) => {
  res.json(await Doctor.findAll());
});

router.post("/", async (req, res) => {
  const record = await Doctor.create(req.body);
  res.json(record);
});

module.exports = router;
