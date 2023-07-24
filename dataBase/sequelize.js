const { Sequelize, DataTypes } = require("sequelize");
const mockCoworking = require("./mock-coworkings");
const modelCoworking = require("../model/modelCoworking");
const modelCity = require("../model/modelCity");
const userModel = require("../model/userModel");
const roleModel = require("../model/modelRole");
const roleApi = require("../dataBase/role.json");
const bcrypt = require("bcrypt");

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

role.hasMany(user, {
  foreignKey: "roles",
});
user.belongsTo(role, {
  foreignKey: "roles",
});

user.hasMany(coworking, {
  foreignKey: "userID",
});
coworking.belongsTo(user, {
  foreignKey: "userID",
});

const initDataBase = () => {
  sequelize.sync({ force: true }).then(() => {
    roleApi.map((element) => {
      return role.create({
        role: element.role,
      });
    });
    let userTable = [];
    userTable.push(
      bcrypt.hash("coucou", 10).then((hash) => {
        user.create({
          name: "Jimmy",
          password: hash,
          roles: 1,
        });
        for (let index = 0; index < 3; index++) {
          user.create({
            name: `edit${index}`,
            password: hash,
            roles: 3,
          });
        }
      })
    );
    Promise.all(userTable).then(() => {
      mockCoworking.map((element) => {
        coworking.create({
          name: element.name,
          price: element.price,
          address: element.address,
          superficy: element.superficy,
          capacity: element.capacity,
          created: element.created,
          userID: Math.round(Math.random() * 3) + 1,
        });
      });
    });
  });
};

module.exports = {
  initDataBase,
  coworking,
  user,
  role,
};
