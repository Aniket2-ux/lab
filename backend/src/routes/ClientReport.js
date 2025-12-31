const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

const { Client, LabRecord } = require("../models");

/*
  PURPOSE:
  - Admin creates report
  - Admin sets password
  - Client can VIEW report using phone/email + password
*/

/* =========================
   ADMIN: CREATE / UPDATE PASSWORD
========================= */
router.post("/set-password", async (req, res) => {
  try {
    const { clientId, password } = req.body;

    if (!clientId || !password) {
      return res.status(400).json({ error: "clientId and password required" });
    }

    const hash = await bcrypt.hash(password, 10);

    await Client.update(
      { reportPassword: hash },
      { where: { id: clientId } }
    );

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to set password" });
  }
});

/* =========================
   CLIENT: VIEW REPORT
========================= */
router.post("/view", async (req, res) => {
  try {
    const { identifier, password } = req.body;

    // identifier = phone OR email
    const client = await Client.findOne({
      where: {
        $or: [{ phone: identifier }, { email: identifier }],
      },
    });

    if (!client || !client.reportPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, client.reportPassword);
    if (!match) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const reports = await LabRecord.findAll({
      where: { clientId: client.id },
      order: [["createdAt", "DESC"]],
    });

    res.json({
      client: {
        id: client.id,
        name: client.fullName,
      },
      reports,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch reports" });
  }
});

module.exports = router;
