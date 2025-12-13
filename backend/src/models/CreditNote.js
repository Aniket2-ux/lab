// backend/src/models/CreditNote.js
const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const CreditNote = sequelize.define("CreditNote", {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  creditNumber: { type: DataTypes.STRING, allowNull: false, unique: true },
  originalBillId: { type: DataTypes.STRING, allowNull: true }, // id of original bill (string|number)
  clientName: { type: DataTypes.STRING, allowNull: true },
  issueDate: { type: DataTypes.DATEONLY, allowNull: true },
  totalAmount: { type: DataTypes.DECIMAL(12, 2), allowNull: false, defaultValue: 0 },
  note: { type: DataTypes.TEXT, allowNull: true },
}, {
  tableName: "credit_notes",
  timestamps: true,
});

const CreditNoteItem = sequelize.define("CreditNoteItem", {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  creditNoteId: { type: DataTypes.BIGINT, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: true },
  dept: { type: DataTypes.STRING, allowNull: true },
  qty: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
  unit: { type: DataTypes.STRING, allowNull: true },
  rate: { type: DataTypes.DECIMAL(12, 2), allowNull: false, defaultValue: 0 },
  amount: { type: DataTypes.DECIMAL(12, 2), allowNull: false, defaultValue: 0 },
}, {
  tableName: "credit_note_items",
  timestamps: false,
});

// associations (will be available after require)
CreditNote.CreditNoteItem = CreditNote.hasMany(CreditNoteItem, { foreignKey: "creditNoteId", as: "items" });
CreditNoteItem.belongsTo(CreditNote, { foreignKey: "creditNoteId", as: "creditNote" });

module.exports = { CreditNote, CreditNoteItem };
