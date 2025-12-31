const express = require("express");
const router = express.Router();
const Doctor = require("../models/Doctor");

/* GET all doctors */
router.get("/", async (_req, res) => {
  const doctors = await Doctor.findAll({ order: [["name", "ASC"]] });
  res.json(doctors);
});

/* CREATE doctor */
router.post("/", async (req, res) => {
  const { name, phone, registrationNo } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Doctor name required" });
  }

  const doctor = await Doctor.create({
    name,
    phone,
    registrationNo,
  });

  res.json(doctor);
});

module.exports = router;
