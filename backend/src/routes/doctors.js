const express = require("express");
const router = express.Router();

/**
 * TEMP in-memory doctors list
 * (later you can connect DB)
 */
let doctors = [];

/**
 * GET all doctors
 * GET /api/doctors
 */
router.get("/", (_req, res) => {
  res.json(doctors);
});

/**
 * ADD doctor
 * POST /api/doctors
 * body: { name }
 */
router.post("/", (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Doctor name is required" });
  }

  const doctor = {
    id: Date.now(),
    name,
  };

  doctors.push(doctor);
  res.status(201).json(doctor);
});

module.exports = router;
