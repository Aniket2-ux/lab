const express = require("express");
const router = express.Router();
const reportController = require("../controllers/reportController");

router.get("/patient/appointments", reportController.getAppointmentReport);
router.get("/patient/prescriptions", reportController.getPrescriptionReport);
router.get("/patient/clients", reportController.getClientReport);
router.get("/patient/reminders", reportController.getRemindersReport);
router.get(
  "/patient/provider-efficiency",
  reportController.getProviderEfficiencyReport
);

module.exports = router; // ✅
