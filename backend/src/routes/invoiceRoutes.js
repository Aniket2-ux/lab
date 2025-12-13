const express = require("express");
const router = express.Router();
const invoiceController = require("../controllers/invoiceController");

router.post("/", invoiceController.createInvoice);

module.exports = router;
/**
 * POST /api/invoices
 * This is a simple demo handler that just logs the invoice payload
 * and returns a fake id. You can plug in Sequelize here later.
 */
router.post("/", async (req, res) => {
  try {
    const invoice = req.body;
    console.log("Received invoice payload:", JSON.stringify(invoice, null, 2));

    // TODO: replace this with real DB save (Sequelize)
    const fakeId = Date.now(); // just something unique for now

    res.status(201).json({
      id: fakeId,
      message: "Invoice received (demo, not yet saved to DB)",
    });
  } catch (err) {
    console.error("Error in POST /api/invoices", err);
    res.status(500).json({ error: "Failed to save invoice" });
  }
});

module.exports = router;
