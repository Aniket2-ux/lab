const express = require("express");
const router = express.Router();
const Client = require("../models/Client");

/* ================================
   GET all clients
================================ */
router.get("/", async (req, res) => {
  try {
    const clients = await Client.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.json(clients);
  } catch (err) {
    console.error("Error fetching clients:", err);
    res.status(500).json({ error: "Server error fetching clients" });
  }
});

/* ================================
   CREATE client (FIXED)
================================ */
router.post("/", async (req, res) => {
  try {
    const {
      fullName,
      phone = null,
      email = null,
      age = null,
      gender = null,
      address = null,
      knownFrom = null,
      internalNotes = null,
    } = req.body;

    if (!fullName || !fullName.trim()) {
      return res.status(400).json({ error: "Full name is required" });
    }

    const client = await Client.create({
      fullName: fullName.trim(),
      phone,
      email,
      gender,
      age: age !== "" && age !== null ? Number(age) : null, // ✅ ONLY FIX
      address,
      knownFrom,
      internalNotes,
    });

    res.status(201).json(client);
  } catch (err) {
    console.error("Error creating client:", err);
    res.status(500).json({
      error: "Server error creating client",
      detail: err.message,
    });
  }
});

/* ================================
   COUNT clients
================================ */
router.get("/count", async (req, res) => {
  try {
    const count = await Client.count();
    res.json({ count });
  } catch (err) {
    console.error("Error counting clients:", err);
    res.status(500).json({ error: "Server error counting clients" });
  }
});

module.exports = router;
