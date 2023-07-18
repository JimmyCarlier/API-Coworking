// Mise en relation avec la BDD

// npm install sequelize
const { Sequelize, DataTypes } = require("sequelize");
const mockCoworking = require("./mock-coworkings");
const modelCoworking = require("../model/modelCoworking");
const modelCity = require("../model/modelCity");

const sequelize = new Sequelize("coworkings", "root", "", {
  host: "localhost",
  dialect: "mariadb",
  logging: false,
});

const User = sequelize.define("User", {
  username: DataTypes.STRING,
  birthday: DataTypes.DATE,
});

const coworking = modelCoworking(sequelize, DataTypes);
const city = modelCity(sequelize, DataTypes);

sequelize
  .authenticate()
  .then(() => {
    console.log("la connexion à la base de donnée à bien était établis");
  })
  .catch((error) =>
    console.log(`Impossible de se connecter à la BDD ${error}`)
  );

const initDataBase = () => {
  sequelize.sync({ force: true }).then(() => {
    mockCoworking.map((element) => {
      coworking.create({
        name: element.name,
        price: element.price,
        address: element.address,
        superficy: element.superficy,
        capacity: element.capacity,
        created: element.created,
      });
      city.create({
        city: element.address.city,
        code_postal: element.address.postCode,
      });
    });
  });
};
/////////////////

module.exports = {
  initDataBase,
};
