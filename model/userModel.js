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
    },
    {
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    }
  );
};
