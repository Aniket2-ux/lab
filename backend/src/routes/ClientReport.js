const express = require("express");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const path = require("path");

const ClientReport = require("../models/ClientReport");

const router = express.Router();

/* ---------------- UPLOAD SETUP ---------------- */
const upload = multer({
  dest: "uploads/reports/",
});

/* ---------------- ADMIN CREATE REPORT ---------------- */
router.post(
  "/",
  upload.single("pdf"),
  async (req, res) => {
    try {
      const { reportCode, clientName, testName, password } = req.body;

      if (!req.file || !password) {
        return res.status(400).json({ error: "Missing data" });
      }

      const hash = await bcrypt.hash(password, 10);

      const report = await ClientReport.create({
        reportCode,
        clientName,
        testName,
        pdfPath: req.file.path,
        passwordHash: hash,
      });

      res.json({ success: true, reportCode: report.reportCode });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Report creation failed" });
    }
  }
);

/* ---------------- CLIENT ACCESS REPORT ---------------- */
router.post("/access", async (req, res) => {
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
      clientName: report.clientName,
      testName: report.testName,
      pdfUrl: `/${report.pdfPath}`,
    });
  } catch {
    res.status(500).json({ error: "Access failed" });
  }
});

module.exports = router;
