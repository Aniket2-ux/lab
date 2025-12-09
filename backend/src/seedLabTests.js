// backend/src/seedLabTests.js
require("dotenv").config();
const sequelize = require("./db");
const LabTest = require("./models/LabTest");

async function seed() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });

    await LabTest.bulkCreate(
      [
        {
          id: 2867740,
          clientName: "BLOCK",
          testName: "Tissue Processing, Tissue S",
          orderedOn: "07/12/2025",
          status: "Ordered",
          tat: "3 hrs",
        },
        {
          id: 2867455,
          clientName: "MR.MD KALAM ANSARI",
          testName: "histopathology , Bone Mar",
          orderedOn: "06/12/2025",
          status: "Ordered",
          tat: "23 hrs",
        },
        {
          id: 2867454,
          clientName: "MR.MD KALAM ANSARI",
          testName: "Fluid Cytology",
          orderedOn: "06/12/2025",
          status: "Ordered",
          tat: "23 hrs",
        },
        {
          id: 2866855,
          clientName: "MRS.KALAWATI DEVI",
          testName: "histopathology",
          orderedOn: "05/12/2025",
          status: "Ordered",
          tat: "2 day 0 hrs",
        },
      ],
      { ignoreDuplicates: true }
    );

    console.log("✅ Seeded lab tests");
    process.exit(0);
  } catch (err) {
    console.error("❌ Failed to seed lab tests", err);
    process.exit(1);
  }
}

seed();
