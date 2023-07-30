module.exports = (sequelize, datatypes) => {
  return sequelize.define(
    "users",
    {
      id: {
        type: datatypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: { type: datatypes.STRING, unique: true },
      password: datatypes.STRING,
      roles: datatypes.INTEGER,
    },
    {
      timestamps: false,
      scopes: {
        hiddenPassword: {
          attributes: { exclude: ["password"] },
        },
      },
    }
  );
};
