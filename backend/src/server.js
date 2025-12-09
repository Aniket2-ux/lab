// backend/src/server.js
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const sequelize = require("./db"); // your existing Sequelize instance

// ---------- Register models ----------
require("./models/User");
require("./models/Client");
require("./models/Service");
require("./models/Medicine");
require("./models/LabTest");
require("./models/prescription");

// Optional: Bill / BillItem (if they exist)
try {
  require("./models/Bill");
  require("./models/BillItem");
} catch (e) {
  console.warn("Bill/BillItem models not found, skipping…");
}

// ---------- Import routes ----------
const authRoutes = require("./routes/auth");
const clientRoutes = require("./routes/clients");
const billingRoutes = require("./routes/billing");
const servicesRoutes = require("./routes/services");
const medicinesRoutes = require("./routes/medicines");
const labRoutes = require("./routes/lab");
const prescriptionsRoutes = require("./routes/prescriptions");
const revenueRoutes = require("./routes/revenue"); // 👈 new

const app = express();
const PORT = process.env.PORT || 5000;

// ---------- Middlewares ----------
app.use(cors());
app.use(express.json());

// ---------- Health check (for dashboard) ----------
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Backend is working",
  });
});

// ---------- Route groups ----------
app.use("/api/auth", authRoutes);

app.use("/api/clients", clientRoutes);
app.use("/api/billing", billingRoutes);
app.use("/api/services", servicesRoutes);
app.use("/api/medicines", medicinesRoutes);
app.use("/api/lab", labRoutes);
app.use("/api/prescriptions", prescriptionsRoutes);
app.use("/api/revenue", revenueRoutes);

// Optional: 404 handler for unknown /api routes
app.use("/api", (req, res) => {
  res.status(404).json({ error: "API route not found" });
});

// Root route (for quick manual check)
app.get("/", (req, res) => {
  res.send("Okhati clone backend running");
});

// ---------- Start server *after* DB is OK ----------
async function start() {
  try {
    console.log("🔌 Connecting to database...");
    await sequelize.authenticate();
    console.log("✅ DB connection OK");

    // Sync all defined models (use { alter: true } only when needed)
    await sequelize.sync();
    console.log("✅ DB synced");

    app.listen(PORT, () => {
      console.log(`🚀 Backend server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server", err);
    process.exit(1);
  }
}

start();
