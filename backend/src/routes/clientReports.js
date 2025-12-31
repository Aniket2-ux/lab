const express = require("express");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const ClientReport = require("../models/ClientReport");

const router = express.Router();

/* ===========================
   CREATE REPORT (ADMIN)
=========================== */
router.post("/", async (req, res) => {
  try {
    const {
      patientName,
      age,
      gender,
      doctorName,
      password,
      tests,
    } = req.body;

    if (!patientName || !age || !gender || !doctorName || !password || !tests) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const reportCode = uuidv4().slice(0, 8).toUpperCase();
    const passwordHash = await bcrypt.hash(password, 10);

    const report = await ClientReport.create({
      reportCode,
      patientName,
      age,
      gender,
      doctorName,
      tests,
      passwordHash,
    });

    res.json({
      success: true,
      reportCode,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create report" });
  }
});

/* ===========================
   CLIENT ACCESS REPORT
=========================== */
router.post("/access", async (req, res) => {
  try {
    const { reportCode, password } = req.body;

    const report = await ClientReport.findOne({ where: { reportCode } });
    if (!report) return res.status(404).json({ error: "Invalid report code" });

    const ok = await bcrypt.compare(password, report.passwordHash);
    if (!ok) return res.status(401).json({ error: "Wrong password" });

    res.json(report);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
