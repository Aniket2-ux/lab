const express = require("express");
const bcrypt = require("bcryptjs");
const ClientReport = require("../models/ClientReport");

const router = express.Router();

/**
 * CREATE REPORT
 */
router.post("/", async (req, res) => {
  try {
    const {
      clientId,
      patientName,
      age,
      gender,
      doctorName,
      password,
      testData,
    } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const report = await ClientReport.create({
      clientId,
      patientName,
      age,
      gender,
      doctorName,
      passwordHash,
      testData,
    });

    res.json(report);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create report" });
  }
});

/**
 * LIST REPORTS (ADMIN VIEW)
 */
router.get("/", async (_req, res) => {
  const reports = await ClientReport.findAll({
    order: [["createdAt", "DESC"]],
  });
  res.json(reports);
});

/**
 * CLIENT ACCESS (PASSWORD)
 */
router.post("/access", async (req, res) => {
  const { clientId, password } = req.body;

  const report = await ClientReport.findOne({ where: { clientId } });
  if (!report) return res.status(404).json({ error: "Not found" });

  const ok = await bcrypt.compare(password, report.passwordHash);
  if (!ok) return res.status(401).json({ error: "Invalid password" });

  res.json(report);
});

module.exports = router;
