const { Sequelize, DataTypes } = require("sequelize");
const modelCoworking = require("../model/modelCoworking");
const modelCity = require("../model/modelCity");
const userModel = require("../model/userModel");
const roleModel = require("../model/modelRole");
const bcrypt = require("bcrypt");
const commentary = require("../model/commentModel");
const setDataSample = require("../dataBase/setDataSample");

const sequelize = new Sequelize("coworkings", "root", "", {
  host: "localhost",
  dialect: "mariadb",
  logging: false,
});

sequelize
  .authenticate()
  .then((data) => {
    console.log(`la connexion à la base de donnée à bien été établi`);
  })
  .catch((error) =>
    console.log(`Impossible de se connecter à la BDD ${error}`)
  );

const coworking = modelCoworking(sequelize, DataTypes);
const city = modelCity(sequelize, DataTypes);
const user = userModel(sequelize, DataTypes);
const role = roleModel(sequelize, DataTypes);
const comment = commentary(sequelize, DataTypes);

role.hasMany(user, {
  foreignKey: "roles",
});
user.belongsTo(role, {
  foreignKey: "roles",
});

user.hasMany(coworking, {
  foreignKey: { name: "userID", allowNull: false },
});
coworking.belongsTo(user, {
  foreignKey: "userID",
});
// ---------------------------
user.hasMany(comment, {
  foreignKey: "userID",
});
comment.belongsTo(user, {
  foreignKey: "userID",
});
coworking.hasMany(comment, {
  foreignKey: { name: "coworkingID", allowNull: false },
});
comment.belongsTo(coworking, {
  foreignKey: "coworkingID",
});

const initDataBase = () => {
  sequelize.sync({ force: true }).then(() => {
    setDataSample(user, role, coworking);
  });
};

module.exports = {
  initDataBase,
  coworking,
  user,
  role,
  comment,
};
