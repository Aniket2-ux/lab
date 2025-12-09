// backend/src/routes/clients.js
const express = require("express");
const router = express.Router();
const Client = require("../models/Client"); 
const { Op } = require("sequelize");

// GET all clients
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

// CREATE client
router.post("/", async (req, res) => {
  try {
    const {
      fullName,
      phone,
      email,
      age,
      gender,
      address,
      knownFrom,
      internalNotes,
    } = req.body;

    const client = await Client.create({
      fullName,
      phone,
      email,
      age,
      gender,
      address,
      knownFrom,
      internalNotes,
    });

    res.status(201).json(client);
  } catch (err) {
    console.error("Error creating client:", err);
    res.status(500).json({ error: "Server error creating client" });
  }
});

// COUNT clients
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
