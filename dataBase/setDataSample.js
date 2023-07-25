const bcrypt = require("bcrypt");
const roleApi = require("../dataBase/role.json");
const mockCoworking = require("./mock-coworkings");

module.exports = setDataSample = (user, role, coworking) => {
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
};
