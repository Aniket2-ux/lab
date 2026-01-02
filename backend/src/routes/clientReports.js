const PDFDocument = require("pdfkit");

router.get("/:id/pdf", async (req, res) => {
  const report = await ClientReport.findByPk(req.params.id);
  if (!report) return res.sendStatus(404);

  const doc = new PDFDocument({ margin: 40 });
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=report-${report.reportCode}.pdf`
  );

  doc.pipe(res);

  doc.fontSize(18).text("GM Diagnostic Lab", { align: "center" });
  doc.moveDown();
  doc.fontSize(12).text(`Patient: ${report.clientName}`);
  doc.text(`Doctor: ${report.doctorName}`);
  doc.text(`Test: ${report.testName}`);
  doc.text(`Date: ${new Date(report.createdAt).toDateString()}`);
  doc.moveDown();

  report.parameters.forEach((p) => {
    doc.text(`${p.name}: ${p.result} ${p.unit} (Normal: ${p.range})`);
  });

  doc.end();
});
