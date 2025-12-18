require("dotenv").config();

const express = require("express");
const cors = require("cors");
const sequelize = require("./db");

const app = express();
const PORT = process.env.PORT || 5000;

/* =========================
   MIDDLEWARE
========================= */
app.use(cors());
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
  "prescription",
  "Bill",
  "BillItem",
  "CreditNote",
  "LabRecord",
].forEach((model) => {
  try {
    require(`./models/${model}`);
  } catch (e) {
    console.warn(`⚠️ Model not loaded: ${model}`);
  }
});

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

// ✅ SINGLE SOURCE OF TRUTH
const billingRoutes = require("./routes/billing");
const labRecordsRoutes = require("./routes/labRecords");

/* ✅ FIX: ENSURE FILE NAME MATCHES EXACTLY */
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

// ✅ ONLY ONE BILLING ROUTE
app.use("/api/billing", billingRoutes);

// ✅ ONLY ONE LAB ROUTE (records)
app.use("/api/lab", labRecordsRoutes);

// ✅ LAB TEST MASTER (settings → lab)
app.use("/api/lab-tests", labTestsRoutes);

/* =========================
   HEALTH CHECK
========================= */
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Backend is working" });
});

/* =========================
   FALLBACK
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
    await sequelize.sync();

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Backend running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Server failed to start:", err);
  }
})();
