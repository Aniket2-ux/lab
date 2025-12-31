const express = require("express");
const bcrypt = require("bcryptjs");
const ClientReport = require("../models/ClientReport");

const router = express.Router();

/**
 * ADMIN: Create client report
 */
router.post("/", async (req, res) => {
  try {
    const { clientId, clientName, testName, pdfPath, password } = req.body;

    if (!clientId || !clientName || !testName || !pdfPath || !password) {
      return res.status(400).json({ error: "All fields required" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const report = await ClientReport.create({
      clientId,
      clientName,
      testName,
      pdfPath,
      reportCode: `REP-${Date.now()}`,
      passwordHash,
    });

    res.json({ success: true, report });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create report" });
  }
});

/**
 * CLIENT: Verify password and get report
 */
router.post("/verify", async (req, res) => {
  try {
    const { reportCode, password } = req.body;

    const report = await ClientReport.findOne({ where: { reportCode } });

    if (!report) {
      return res.status(404).json({ error: "Report not found" });
    }

    const match = await bcrypt.compare(password, report.passwordHash);

    if (!match) {
      return res.status(401).json({ error: "Invalid password" });
    }

    res.json({
      success: true,
      report: {
        clientName: report.clientName,
        testName: report.testName,
        pdfPath: report.pdfPath,
        createdAt: report.createdAt,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Verification failed" });
  }
});

module.exports = router;
