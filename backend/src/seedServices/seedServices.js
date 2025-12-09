// backend/src/seedServices.js
require("dotenv").config();
const sequelize = require("./db");
const Service = require("./models/Service");

async function seed() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    await Service.bulkCreate(
      [
        {
          name: "Bone Marrow Aspiration",
          serviceCode: "BMA001",
          type: "labTest",
          department: "Pathology",
          price: 6000,
        },
        {
          name: "OPD",
          serviceCode: "OPD001",
          type: "consultation",
          department: "General",
          price: 1500,
        },
        {
          name: "X-Ray Chest PA view",
          serviceCode: "XRCH01",
          type: "labTest",
          department: "Radiology",
          price: 500,
        },
        {
          name: "Cannabies",
          serviceCode: "LAB-CAN",
          type: "labTest",
          department: "Pathology",
          price: 2000,
        },
        {
          name: "Opiates",
          serviceCode: "LAB-OPI",
          type: "labTest",
          department: "Pathology",
          price: 2000,
        },
        {
          name: "Medical Checkup For Japan",
          serviceCode: "PKG-JPN",
          type: "package",
          department: "Checkup",
          price: 14850,
        },
      ],
      { ignoreDuplicates: true }
    );

    console.log("✅ Seeded services");
    process.exit(0);
  } catch (err) {
    console.error("❌ Failed to seed services", err);
    process.exit(1);
  }
}

seed();
