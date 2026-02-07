module.exports = (sequelize, DataTypes) => {
  const Doctor = sequelize.define("Doctor", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    qualification: {
      type: DataTypes.STRING,
    },
    clinic: {
      type: DataTypes.STRING,
    },
  });

  return Doctor;
};
