const express = require("express");
const router = express.Router();
const { ClientReport } = require("../models");

/**
 * CREATE REPORT
 */
router.post("/", async (req, res) => {
  try {
    const report = await ClientReport.create(req.body);
    res.json(report);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save report" });
  }
});

/**
 * LIST REPORTS (for internal page)
 */
router.get("/", async (_req, res) => {
  try {
    const reports = await ClientReport.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: "Failed to load reports" });
  }
});

/**
 * PATIENT ACCESS
 */
router.post("/access", async (req, res) => {
  const { reportCode, password } = req.body;

  const report = await ClientReport.findOne({
    where: { reportCode, password },
  });

  if (!report) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  res.json(report);
});

module.exports = router;
