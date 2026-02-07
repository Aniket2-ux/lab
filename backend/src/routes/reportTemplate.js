const router = require("express").Router();
const { ReportTemplate } = require("../models");

// GET
router.get("/", async (_req, res) => {
  const data = await ReportTemplate.findOne();
  res.json(data);
});

// SAVE / UPDATE
router.post("/", async (req, res) => {
  const [record] = await ReportTemplate.findOrCreate({
    where: {},
    defaults: req.body,
  });

  if (record) await record.update(req.body);
  res.json(record);
});

module.exports = router;
