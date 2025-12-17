// backend/src/routes/lab.js
const express = require("express");
const router = express.Router();
const LabRecord = require("../models/LabRecord");

// GET all lab records
router.get("/", async (req, res) => {
  const records = await LabRecord.findAll({
    order: [["createdAt", "DESC"]],
  });
  res.json(records);
});

// CREATE lab record (ONLY from billing finalize)
router.post("/", async (req, res) => {
  const record = await LabRecord.create({
    billId: req.body.billId,
    billNumber: req.body.billNumber,
    clientName: req.body.clientName,
    issueDate: req.body.issueDate,
    items: req.body.items,
    status: "Pending",
  });

  res.json(record);
});

module.exports = router;
