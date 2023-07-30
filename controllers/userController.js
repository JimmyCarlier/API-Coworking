const { user } = require("../dataBase/sequelize");
const bcrypt = require("bcrypt");

exports.getAllUser = (req, res) => {
  user
    .scope("hiddenPassword")
    .findAll()
    .then((user) => {
      res.json({
        message: `Voici la liste de tout les utilisateur`,
        data: user,
      });
    })
    .catch((error) => {
      res.status(400).json({ message: error });
    });
};

exports.createUser = (req, res) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const dataUser = { ...req.body, password: hash };
      return user.create(dataUser).then((data) => {
        res.status(500).json({ message: "coucou", data: data });
      });
    })
    .catch((error) => {
      res.status(404).json({ message: error.message });
    });
};

exports.destroyUser = (req, res) => {
  user
    .destroy({
      where: { id: req.params.id },
    })
    .then((user) => {
      res.json({ message: `Vous avez supprimé l'élément`, data: user });
    })
    .catch((error) => {
      res.json({ message: `La suppression n'a pu être effectué ${error}` });
    });
};

exports.updateUser = (req, res) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const dataUpdateUser = { ...req.body, password: hash };
      return user
        .update(dataUpdateUser, { where: { id: req.params.id } })
        .then((user) => {
          res.json({ message: `L'utilisateur à était modifiée`, data: user });
        });
    })
    .catch((error) => {
      res.json({ message: `Error : ${error}` });
    });
};

exports.getUserbyId = (req, res) => {
  user
    .findByPk(req.params.id)
    .then((user) => {
      res.json({ message: `Voici lutilisateur${req.params.id}`, data: user });
    })
    .catch((error) => {
      res.satus(500).json({
        message: `Nous n'avons pu récupérer les donnéess -> Voici les erreurs ${error}`,
      });
    });
};
