const router = require("express").Router();
const bcrypt = require("bcryptjs");
const ClientReport = require("../models/ClientReport");
const ReportItem = require("../models/ReportItem");

/* CREATE REPORT */
router.post("/", async (req, res) => {
  const { header, items, password } = req.body;

  const report = await ClientReport.create({
    ...header,
    reportCode: "REP-" + Date.now(),
    passwordHash: await bcrypt.hash(password, 10),
    reportDate: new Date(),
  });

  for (const row of items) {
    await ReportItem.create({ ...row, reportId: report.id });
  }

  res.json(report);
});

/* VIEW REPORT */
router.post("/view", async (req, res) => {
  const { reportCode, password } = req.body;

  const report = await ClientReport.findOne({
    where: { reportCode },
    include: ReportItem,
  });

  if (!report) return res.status(404).json({ error: "Not found" });

  const ok = await bcrypt.compare(password, report.passwordHash);
  if (!ok) return res.status(401).json({ error: "Wrong password" });

  res.json(report);
});

module.exports = router;
