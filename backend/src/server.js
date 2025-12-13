// backend/src/server.js
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
   REGISTER MODELS (ORDER MATTERS)
========================= */
try { require("./models/User"); } catch {}
try { require("./models/Client"); } catch {}
try { require("./models/Service"); } catch {}
try { require("./models/Medicine"); } catch {}
try { require("./models/LabTest"); } catch {}
try { require("./models/prescription"); } catch {}

// Billing + Lab (REQUIRED)
require("./models/Bill");
require("./models/BillItem");
require("./models/LabRecord"); // 🔴 REQUIRED FOR LAB SAVE

/* =========================
   IMPORT ROUTES
========================= */
const authRoutes = safeRequire("./routes/auth");
const clientRoutes = safeRequire("./routes/clients");
const servicesRoutes = safeRequire("./routes/services");
const medicinesRoutes = safeRequire("./routes/medicines");
const prescriptionsRoutes = safeRequire("./routes/prescriptions");
const revenueRoutes = safeRequire("./routes/revenue");
const reportRoutes = safeRequire("./routes/reportRoutes");
const dashboardRoutes = safeRequire("./routes/dashboardRoutes");

// IMPORTANT ROUTES
const billingRoutes = require("./routes/billing"); // 🔴 ONLY THIS
const labRoutes = require("./routes/lab");          // 🔴 ONLY THIS

// Optional settings
const settingsRoutes = safeRequire("./routes/settings");

/* =========================
   MOUNT ROUTES
========================= */
if (authRoutes) app.use("/api/auth", authRoutes);
if (clientRoutes) app.use("/api/clients", clientRoutes);
if (servicesRoutes) app.use("/api/services", servicesRoutes);
if (medicinesRoutes) app.use("/api/medicines", medicinesRoutes);
if (prescriptionsRoutes) app.use("/api/prescriptions", prescriptionsRoutes);
if (revenueRoutes) app.use("/api/revenue", revenueRoutes);
if (reportRoutes) app.use("/api/reports", reportRoutes);
if (dashboardRoutes) app.use("/api/dashboard", dashboardRoutes);
if (settingsRoutes) app.use("/api/settings", settingsRoutes);

// 🔴 SINGLE SOURCE OF TRUTH
app.use("/api/billing", billingRoutes);
app.use("/api/lab", labRoutes);

/* =========================
   HEALTH CHECK
========================= */
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Backend is working" });
});

/* =========================
   API 404
========================= */
app.use("/api", (req, res) => {
  res.status(404).json({ error: "API route not found" });
});

/* =========================
   ROOT
========================= */
app.get("/", (req, res) => {
  res.send("Okhati clone backend running");
});

/* =========================
   START SERVER
========================= */
async function start() {
  try {
    console.log("🔌 Connecting to database...");
    await sequelize.authenticate();
    console.log("✅ DB connected");

    await sequelize.sync();
    console.log("✅ DB synced");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Backend running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Backend failed to start", err);
    process.exit(1);
  }
}

start();

/* =========================
   SAFE REQUIRE HELPER
========================= */
function safeRequire(path) {
  try {
    return require(path);
  } catch (e) {
    console.warn(`⚠️ Optional route not loaded: ${path}`);
    return null;
  }
}
