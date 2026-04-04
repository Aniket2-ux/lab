const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Client = require("./Client");
const Visit = require("./Visit");
const PrescriptionItem = require("./PrescriptionItem"); // ✅ REQUIRED

const Prescription = sequelize.define(
  "Prescription",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    visitId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    serviceProvider: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    department: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    status: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    investigation: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    diagnosis: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    followUpDays: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    followUpDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },

    followUpRemarks: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    followUpDone: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: "prescriptions",
  }
);

// =====================
// ✅ RELATIONS
// =====================

// Client relation
Client.hasMany(Prescription, { foreignKey: "clientId" });
Prescription.belongsTo(Client, { foreignKey: "clientId" });

// Visit relation (OPD backbone)
Visit.hasOne(Prescription, { foreignKey: "visitId" });
Prescription.belongsTo(Visit, { foreignKey: "visitId" });

// ✅ MOST IMPORTANT: Items relation
Prescription.hasMany(PrescriptionItem, {
  foreignKey: "prescriptionId",
  onDelete: "CASCADE",
});

PrescriptionItem.belongsTo(Prescription, {
  foreignKey: "prescriptionId",
});

module.exports = Prescription;