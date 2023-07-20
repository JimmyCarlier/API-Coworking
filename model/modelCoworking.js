module.exports = (sequelize, DataTypes) => {
  return sequelize.define("coworking", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    price: DataTypes.JSON,
    address: DataTypes.JSON,
    superficy: DataTypes.INTEGER,
    capacity: DataTypes.INTEGER,
    created: DataTypes.DATE,
  });
};
