module.exports = (sequelize, DataTypes) => {
  const Supplier = sequelize.define("Supplier", {
    name: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING },
    landline: { type: DataTypes.STRING },
    pan: { type: DataTypes.STRING },
    details: { type: DataTypes.TEXT },
    openingBalance: { type: DataTypes.FLOAT, defaultValue: 0 },
    type: { type: DataTypes.STRING, defaultValue: "Credit" },
    agingDays: { type: DataTypes.INTEGER, defaultValue: 0 },
    bankName: { type: DataTypes.STRING },
    bankBranch: { type: DataTypes.STRING },
    accountNumber: { type: DataTypes.STRING },
    accountType: { type: DataTypes.STRING },
    ifscCode: { type: DataTypes.STRING },
    swiftCode: { type: DataTypes.STRING }
  });

  return Supplier;
};
