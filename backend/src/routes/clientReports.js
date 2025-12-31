const router = require("express").Router();
const bcrypt = require("bcryptjs");
const ClientReport = require("../models/ClientReport");

router.post("/", async (req, res) => {
  const { password, ...rest } = req.body;

  const passwordHash = await bcrypt.hash(password, 10);

  const report = await ClientReport.create({
    ...rest,
    passwordHash,
  });

  res.json(report);
});

router.get("/", async (_, res) => {
  const reports = await ClientReport.findAll({
    order: [["createdAt", "DESC"]],
  });
  res.json(reports);
});

module.exports = router;
