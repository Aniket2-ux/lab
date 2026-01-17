module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Supplier", {
    name: { type: DataTypes.STRING, allowNull: false },
    address: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    pan: DataTypes.STRING,
    details: DataTypes.TEXT,
  });
};
