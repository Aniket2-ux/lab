// backend/src/routes/clients.js
const express = require("express");
const router = express.Router();
const Client = require("../models/Client");

/* ================================
   GET /api/clients
================================ */
router.get("/", async (req, res) => {
  try {
    const clients = await Client.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.json(clients);
  } catch (err) {
    console.error("ERROR FETCHING CLIENTS:", err);
    res.status(500).json({ error: "Failed to fetch clients" });
  }
});

/* ================================
   POST /api/clients
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
      internalNotes = null,
    } = req.body;

    if (!fullName || !fullName.trim()) {
      return res.status(400).json({
        error: "Full name is required",
      });
    }

    const client = await Client.create({
      fullName: fullName.trim(),
      phone,
      email,
      age,
      gender,
      address,
      internalNotes,
    });

    res.status(201).json(client);
  } catch (err) {
    console.error("CREATE CLIENT ERROR:", err);
    res.status(500).json({
      error: err.message || "Failed to create client",
    });
  }
});

/* ================================
   DELETE /api/clients/:id
================================ */
router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!id) {
      return res.status(400).json({ error: "Invalid client id" });
    }

    const deleted = await Client.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).json({ error: "Client not found" });
    }

    res.json({ success: true });
  } catch (err) {
    console.error("DELETE CLIENT ERROR:", err);
    res.status(500).json({ error: "Failed to delete client" });
  }
});

module.exports = router;
