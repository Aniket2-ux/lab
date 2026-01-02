const express = require("express");
const router = express.Router(); // ✅ THIS WAS MISSING

const PDFDocument = require("pdfkit");
const { ClientReport, Client } = require("../models");

/**
 * GET /api/client-reports/:id/pdf
 * Download client report as PDF
 */
router.get("/:id/pdf", async (req, res) => {
  try {
    const report = await ClientReport.findByPk(req.params.id, {
      include: [{ model: Client }]
    });

    if (!report) {
      return res.status(404).json({ error: "Report not found" });
    }

    const doc = new PDFDocument({ size: "A4", margin: 50 });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `inline; filename=report-${report.id}.pdf`
    );

    doc.pipe(res);

    // -------- PDF CONTENT --------
    doc.fontSize(18).text("GM Diagnostic Lab", { align: "center" });
    doc.moveDown();

    doc.fontSize(12);
    doc.text(`Patient Name: ${report.Client?.fullName || "N/A"}`);
    doc.text(`Age: ${report.age || "-"}`);
    doc.text(`Gender: ${report.gender || "-"}`);
    doc.text(`Report Date: ${new Date(report.createdAt).toDateString()}`);
    doc.moveDown();

    doc.text("Report Details:");
    doc.moveDown();
    doc.text(report.reportText || "No report content");

    doc.end();
  } catch (err) {
    console.error("PDF error:", err);
    res.status(500).json({ error: "Failed to generate PDF" });
  }
});

module.exports = router; // ✅ REQUIRED
