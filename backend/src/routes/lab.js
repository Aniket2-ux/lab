// backend/src/routes/lab.js
const express = require("express");
const LabTest = require("../models/LabTest");

const router = express.Router();

/**
 * GET /api/lab
 * Returns all lab tests ordered by newest first
 */
router.get("/", async (req, res) => {
  try {
    const tests = await LabTest.findAll({
      order: [["id", "DESC"]],
    });

    res.json(
      tests.map((t) => ({
        id: t.id,
        clientName: t.clientName,
        testName: t.testName,
        orderedOn: t.orderedOn,
        status: t.status,
        tat: t.tat,
      }))
    );
  } catch (err) {
    console.error("Failed to fetch lab tests", err);
    res.status(500).json({ error: "Failed to fetch lab tests" });
  }
});

module.exports = router;
