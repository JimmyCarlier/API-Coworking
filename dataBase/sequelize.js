// Mise en relation avec la BDD

// npm install sequelize
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
    console.log(`la connexion à la base de donnée à bien était établis`);
  })
  .catch((error) =>
    console.log(`Impossible de se connecter à la BDD ${error}`)
  );

const coworking = modelCoworking(sequelize, DataTypes);
const city = modelCity(sequelize, DataTypes);
const user = userModel(sequelize, DataTypes);
const role = roleModel(sequelize, DataTypes);

role.hasOne(user, {
  foreignKey: "roles",
});
user.belongsTo(role, {
  foreignKey: "roles",
});

const initDataBase = () => {
  sequelize.sync({ force: true }).then(() => {
    mockCoworking.map((element) => {
      // coworking.create({
      //   name: element.name,
      //   price: element.price,
      //   address: element.address,
      //   superficy: element.superficy,
      //   capacity: element.capacity,
      //   created: element.created,
      // });
      // city.create({
      //   city: element.address.city,
      //   code_postal: element.address.postCode,
      // });
    });
    roleApi.map((element) => {
      role.create({
        role: element.role,
      });
    });
    bcrypt.hash("coucou", 10).then((hash) => {
      return user.create({
        name: "Jimmy",
        password: hash,
        roles: 1,
      });
    });
    // user.create({
    //   name: "Jimmy",
    //   password: "toto",
    //   roles: 3,
    // });
  });
};

/////////////////

module.exports = {
  initDataBase,
  coworking,
  user,
};
