const express = require("express");
const bcrypt = require("bcryptjs");
const ClientReport = require("../models/ClientReport");

const router = express.Router();

/* ===============================
   ADMIN: CREATE REPORT
================================ */
router.post("/", async (req, res) => {
  try {
    const { reportCode, clientName, testName, pdfPath, password } = req.body;

    if (!reportCode || !clientName || !testName || !pdfPath || !password) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const report = await ClientReport.create({
      reportCode,
      clientName,
      testName,
      pdfPath,
      passwordHash,
    });

    res.json({ success: true, report });
  } catch (err) {
    console.error("Create report error:", err);
    res.status(500).json({ error: "Failed to create report" });
  }
});

/* ===============================
   CLIENT: VERIFY & VIEW REPORT
================================ */
router.post("/verify", async (req, res) => {
  try {
    const { reportCode, password } = req.body;

    const report = await ClientReport.findOne({ where: { reportCode } });
    if (!report) {
      return res.status(404).json({ error: "Report not found" });
    }

    const ok = await bcrypt.compare(password, report.passwordHash);
    if (!ok) {
      return res.status(401).json({ error: "Invalid password" });
    }

    res.json({
      clientName: report.clientName,
      testName: report.testName,
      pdfPath: report.pdfPath,
    });
  } catch (err) {
    console.error("Verify report error:", err);
    res.status(500).json({ error: "Verification failed" });
  }
});

module.exports = router;
