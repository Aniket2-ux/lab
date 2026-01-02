const express = require("express");
const router = express.Router();

/**
 * TEMP in-memory doctors
 * (later you can connect DB)
 */
let doctors = [];

// GET all doctors
router.get("/", (_req, res) => {
  res.json(doctors);
});

// ADD doctor
router.post("/", (req, res) => {
  const { name, phone } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Doctor name required" });
  }

  const doctor = {
    id: Date.now(),
    name,
    phone: phone || null,
  };

  doctors.push(doctor);
  res.status(201).json(doctor);
});

module.exports = router;
