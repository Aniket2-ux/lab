const express = require("express");
const bcrypt = require("bcryptjs");
const ClientReport = require("../models/ClientReport");
const ReportParameter = require("../models/ReportParameter");

const router = express.Router();

/* CREATE REPORT */
router.post("/", async (req, res) => {
  const { clientName, testName, password, parameters } = req.body;

  const passwordHash = await bcrypt.hash(password, 10);
  const reportCode = "REP-" + Date.now();

  const report = await ClientReport.create({
    reportCode,
    clientName,
    testName,
    passwordHash,
  });

  for (const p of parameters) {
    await ReportParameter.create({
      reportId: report.id,
      ...p,
    });
  }

  res.json({ success: true, reportCode });
});

/* VIEW REPORT */
router.post("/view", async (req, res) => {
  const { reportCode, password } = req.body;

  const report = await ClientReport.findOne({
    where: { reportCode },
    include: ReportParameter,
  });

  if (!report) return res.status(404).json({ error: "Not found" });

  const ok = await bcrypt.compare(password, report.passwordHash);
  if (!ok) return res.status(401).json({ error: "Wrong password" });

  res.json(report);
});

module.exports = router;
