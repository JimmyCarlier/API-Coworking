const { user } = require("../dataBase/sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "ma_cle_secrete";
const { role } = require("../dataBase/sequelize");

const roleHierarchy = {
  user: ["user"],
  edit: ["user", "edit"],
  admin: ["user", "edit", "admin"],
};
exports.signup = (req, res) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const dataUser = { ...req.body, password: hash };
      return user.create(dataUser).then((data) => {
        res.status(200).json({ message: "coucou", data: data });
      });
    })
    .catch((error) => {
      res.status(404).json({ message: error.message });
    });
};

exports.login = (req, res) => {
  user
    .findOne({ where: { name: req.body.name } })
    .then((user) => {
      bcrypt.compare(req.body.password, user.password).then((isValid) => {
        if (isValid) {
          const token = jwt.sign(
            {
              data: req.body.name,
            },
            SECRET_KEY,
            { expiresIn: 60 * 60 }
          );
          res.json({ message: "successfull", data: token });
        } else {
          return res
            .status(400)
            .json({ message: "Username / password is incorrect" });
        }
      });
    })
    .catch(() => {
      res.status(400).json({ message: "Username / password is incorrect" });
    });
};

exports.protect = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(400).json({ message: `Vous n'êtes pas authentifier` });
  }
  const token = req.headers.authorization.split(" ")[1];
  if (token) {
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      req.username = decoded.data;
      // res.json({ message: "Vous avez supprimé l'élément", data: decoded });
      next();
    } catch (error) {
      res.json({ message: "Token invalid" });
    }
  }
};

exports.restrict = (req, res, next) => {
  user
    .findOne({ where: { name: req.username } })
    .then((user) => {
      if (req.username === user.name) {
        next();
      } else {
        return res.json({
          message: "Vous ne pouvez pas modifier cet utilisateur",
        });
      }
    })
    .catch((error) => {
      return res.json({ message: "coucou fdsdfsdf", data: req.username });
    });
};

exports.restrictTo = (roleparam) => {
  return (req, res, next) => {
    user
      .findOne({ where: { name: req.username } })
      .then((user) => {
        role.findByPk(user.roles).then((userRole) => {
          if (roleHierarchy[userRole.role].includes(roleparam)) {
            next();
          } else {
            res.json({
              message: "Vous n'avez pas les droits nécéssaire",
            });
          }
        });
      })
      .catch((error) => {
        res.json({
          message: `Vous n'avez pas les droits nécéssaire`,
          data: error.message,
        });
      });
  };
};