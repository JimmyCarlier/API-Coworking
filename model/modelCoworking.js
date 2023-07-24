module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "coworking",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      price: {
        type: DataTypes.JSON,
        validate: {
          customValidator(value) {
            let letPass = false;
            if (
              value.hasOwnProperty("hour") &&
              value.hasOwnProperty("day") &&
              value.hasOwnProperty("month")
            ) {
              for (const key in value) {
                if (value[key] !== null) {
                  letPass = true;
                  break;
                }
              }
              if (!letPass) {
                throw new Error("Au moins un des prix doit être renseigné");
              }
            } else {
              throw new Error("Vérifier la syntaxe de la donnée");
            }
          },
        },
      },
      address: DataTypes.JSON,
      superficy: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: { msg: `Cela doit être un nombre` } },
      },
      capacity: {
        type: DataTypes.INTEGER,
        validate: { isInt: { msg: `Cela doit être un nombre` } },
      },
      created: DataTypes.DATE,
    },
    {
      timestamps: false,
    }
  );
};
