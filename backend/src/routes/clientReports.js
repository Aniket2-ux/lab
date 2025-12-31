const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

const ClientReport = require("../models/ClientReport");

/* ===========================
   CREATE REPORT (ADMIN)
=========================== */
router.post("/", async (req, res) => {
  try {
    const { clientId, clientName, testName, password } = req.body;

    if (!clientId || !clientName || !testName || !password) {
      return res.status(400).json({ error: "All fields required" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const report = await ClientReport.create({
      reportCode: `REP-${Date.now()}`,
      clientName,
      testName,
      pdfPath: "", // later
      passwordHash,
    });

    res.json({ success: true, report });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create report" });
  }
});

/* ===========================
   LIST REPORTS (ADMIN)
=========================== */
router.get("/", async (_req, res) => {
  const reports = await ClientReport.findAll({
    order: [["createdAt", "DESC"]],
  });
  res.json(reports);
});

/* ===========================
   CLIENT ACCESS REPORT
=========================== */
router.post("/access", async (req, res) => {
  const { reportCode, password } = req.body;

  const report = await ClientReport.findOne({ where: { reportCode } });
  if (!report) return res.status(404).json({ error: "Report not found" });

  const ok = await bcrypt.compare(password, report.passwordHash);
  if (!ok) return res.status(401).json({ error: "Invalid password" });

  res.json({
    reportCode: report.reportCode,
    clientName: report.clientName,
    testName: report.testName,
    pdfPath: report.pdfPath,
  });
});

module.exports = router;
