require("dotenv").config();

const express = require("express");
const cors = require("cors");
const sequelize = require("./db");

const app = express();
const PORT = process.env.PORT || 5000;

/* =========================
   MIDDLEWARE
========================= */
app.use(
  cors({
    origin: "*", // frontend on :3000 or public IP
    credentials: true,
  })
);

app.use(express.json());

/* =========================
   REGISTER MODELS (SAFE)
========================= */
[
  "User",
  "Client",
  "Service",
  "Medicine",
  "LabTest",
  "Prescription",
  "Bill",
  "BillItem",
  "CreditNote",
  "LabRecord",
  "ClientReport",
   "Visit", 
].forEach((model) => {
  try {
    require(`./models/${model}`);
  } catch (e) {
    console.warn(`⚠️ Model not loaded: ${model}`);
  }
});
// 🔥 FORCE LOAD (VERY IMPORTANT)
require("./models/Prescription");
require("./models/PrescriptionItem");

/* =========================
   ROUTES
========================= */
const authRoutes = require("./routes/auth");
const clientRoutes = require("./routes/clients");
const servicesRoutes = require("./routes/services");
const medicinesRoutes = require("./routes/medicines");
const prescriptionsRoutes = require("./routes/prescriptions");
const revenueRoutes = require("./routes/revenue");
const reportRoutes = require("./routes/reportRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const settingsRouter = require("./routes/settings");
const settingsProfileRouter = require("./routes/settingsProfile");

// single source of truth
const billingRoutes = require("./routes/billing");
const labRecordsRoutes = require("./routes/labRecords");
const labTestsRoutes = require("./routes/labTests");

/* =========================
   MOUNT ROUTES
========================= */
app.use("/api/auth", authRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/services", servicesRoutes);
app.use("/api/medicines", medicinesRoutes);
app.use("/api/prescriptions", prescriptionsRoutes);
app.use("/api/revenue", revenueRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.use("/api/settings", settingsRouter);
app.use("/api/settings", settingsProfileRouter);

app.use("/api/billing", billingRoutes);
app.use("/api/lab", labRecordsRoutes);
app.use("/api/lab-tests", labTestsRoutes);
app.use("/api/client-reports", require("./routes/clientReports"));
app.use("/uploads", express.static("uploads"));
app.use("/api/doctors", require("./routes/doctors"));
app.use("/api/vendors/supplier", require("./routes/vendors/supplier"));
app.use("/api/test-categories", require("./routes/testCategories"));
app.use("/api/sample-types", require("./routes/sampleTypes"));
app.use("/api/methods", require("./routes/methods"));
app.use("/api/tests", require("./routes/tests"));
app.use("/api/test-parameters", require("./routes/testParameters"));
app.use("/api/profiles", require("./routes/profiles"));
app.use("/api/report-template", require("./routes/reportTemplate"));
app.use("/api/doctors", require("./routes/doctors"));
app.use("/api/visits", require("./routes/visits"));







/* =========================
   HEALTH CHECK
========================= */
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", message: "Backend is working" });
});

/* =========================
   FALLBACKS
========================= */
app.use("/api", (_req, res) => {
  res.status(404).json({ error: "API route not found" });
});


app.get("/", (_req, res) => {
  res.send("Okhati clone backend running");
});

/* =========================
   START SERVER
========================= */
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected");

    await sequelize.sync();
    console.log("✅ Database synced");

    app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

  } catch (err) {
    console.error("❌ Server failed to start:", err);
    process.exit(1);
  }
})();
