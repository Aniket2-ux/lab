const express = require("express");
const router = express.Router();

/* ---------------- In-memory fallback (safe) ---------------- */
/* This prevents crashes even if DB model is missing */
let reports = [];

/* ---------------- GET all reports ---------------- */
router.get("/", (req, res) => {
  res.json(reports);
});

/* ---------------- CREATE report ---------------- */
router.post("/", (req, res) => {
  const { patientName, age, gender, doctorName, password, reportCode } =
    req.body;

  if (!patientName || !age || !gender || !doctorName || !password || !reportCode) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const newReport = {
    id: Date.now(),
    patientName,
    age,
    gender,
    doctorName,
    password,
    reportCode,
  };

  reports.unshift(newReport);
  res.json(newReport);
});

/* ---------------- VERIFY report (for client access page) ---------------- */
router.post("/verify", (req, res) => {
  const { reportCode, password } = req.body;

  const report = reports.find(
    (r) => r.reportCode === reportCode && r.password === password
  );

  if (!report) {
    return res.status(401).send("Invalid report code or password");
  }

  res.json({ id: report.id });
});

module.exports = router;
