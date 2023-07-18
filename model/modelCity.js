module.exports = (sequelize, DataTypes) => {
  return sequelize.define("city", {
    city: DataTypes.STRING,
    code_postal: DataTypes.INTEGER,
  });
};
