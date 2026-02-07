module.exports = (sequelize, DataTypes) => {
  const SampleType = sequelize.define(
    "SampleType",
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
      tableName: "sample_types",
      timestamps: true,
    }
  );

  return SampleType;
};
