module.exports = (sequelize, DataTypes) => {
  const TestCategory = sequelize.define(
    "TestCategory",
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
      tableName: "test_categories",
      timestamps: true,
    }
  );

  return TestCategory;
};
