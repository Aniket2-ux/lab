module.exports = (sequelize, DataTypes) => {
  const Method = sequelize.define(
    "Method",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      tableName: "methods",
      timestamps: true,
    }
  );

  return Method;
};
