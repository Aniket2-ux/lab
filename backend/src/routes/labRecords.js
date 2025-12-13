// backend/src/routes/labRecords.js
const express = require("express");
const fs = require("fs");
const path = require("path");
const sequelize = require("../db"); // your sequelize instance

const router = express.Router();

/**
 * POST /api/lab/records
 * Body:
 * {
 *   billId?: string|number,
 *   billNumber?: string,
 *   clientName?: string,
 *   issueDate?: string,
 *   items: [{ description, qty, rate, amount, dept }]
 * }
 */
router.post("/records", async (req, res) => {
  try {
    const { billId, billNumber, clientName, issueDate, items = [] } = req.body;

    // keep only lab items
    const labItems = (items || []).filter((it) => {
      const dept = (it.dept || "").toString().toLowerCase();
      return dept === "lab" || dept === "pathology" || dept === "radiology" || dept === "labtest";
    });

    if (!labItems.length) {
      return res.status(400).json({ error: "No lab items found" });
    }

    // If Sequelize model LabTest exists, use it
    const models = sequelize && sequelize.models ? sequelize.models : null;
    if (models && models.LabTest) {
      // map fields to the model - tolerant mapping (you may adjust field names)
      const toCreate = labItems.map((it) => ({
        testName: it.description ?? it.name ?? "Unnamed Test",
        qty: Number(it.qty ?? 1),
        rate: Number(it.rate ?? 0),
        amount: Number(it.amount ?? (Number(it.qty ?? 1) * Number(it.rate ?? 0))),
        clientName: clientName ?? null,
        billId: billId ?? null,
        billNumber: billNumber ?? null,
        issueDate: issueDate ? new Date(issueDate) : new Date(),
        status: "Ordered",
        orderedAt: new Date(),
      }));

      const created = await models.LabTest.bulkCreate(toCreate);
      return res.status(201).json({ saved: true, createdCount: created.length, created });
    }

    // Fallback: append to a JSON file under backend/data
    const dataDir = path.join(__dirname, "..", "data");
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

    const filePath = path.join(dataDir, "lab_records.json");
    let existing = [];
    try {
      const raw = fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : "";
      existing = raw ? JSON.parse(raw) : [];
    } catch (e) {
      existing = [];
    }

    const records = labItems.map((it) => ({
      id: `local-lab-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
      testName: it.description ?? it.name ?? "Unnamed Test",
      qty: Number(it.qty ?? 1),
      rate: Number(it.rate ?? 0),
      amount: Number(it.amount ?? (Number(it.qty ?? 1) * Number(it.rate ?? 0))),
      clientName: clientName ?? null,
      billId: billId ?? null,
      billNumber: billNumber ?? null,
      issueDate: issueDate ?? new Date().toISOString(),
      status: "Ordered",
      orderedAt: new Date().toISOString(),
    }));

    const merged = existing.concat(records).slice(0, 5000);
    fs.writeFileSync(filePath, JSON.stringify(merged, null, 2), "utf8");

    return res.status(201).json({ saved: true, createdCount: records.length, fallbackFile: filePath });
  } catch (err) {
    console.error("labRecords POST error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
