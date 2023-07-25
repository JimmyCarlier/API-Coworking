const { ValidationError } = require("sequelize");
const { comment } = require("../dataBase/sequelize");
const { coworking } = require("../dataBase/sequelize");
const { user } = require("../dataBase/sequelize");

exports.showAllComment = (req, res) => {
  comment
    .findAll({})
    .then((result) => {
      res.json({ message: "Voici tout les commentaires", data: result });
    })
    .catch((error) => {
      res.json({ message: "Erreur", data: error.message });
    });
};

exports.createComment = (req, res) => {
  console.log(req.username);
  user
    .findOne({
      where: {
        name: req.username,
      },
    })
    .then((user) => {
      coworking.findByPk(req.params.id).then((result) => {
        comment
          .create({
            content: req.body.content,
            rating: req.body.rating,
            coworkingID: result.id,
            userID: user.id,
          })
          .then((result) => {
            res.json({
              message: `Vous avez créée l'élément : ${req.body.content}}`,
              data: result,
            });
          });
      });
    })
    .catch((error) => {
      res.json({ message: `Erreur`, data: error.message });
    });
};

exports.deleteComment = (req, res) => {
  comment
    .destroy({
      where: {
        id: req.params.id,
      },
    })
    .then((result) => {
      res.json({
        message: `Vous avez supprimer l'élément ${req.params.id}}`,
        data: result,
      });
    })
    .catch((error) => {
      res.json({ message: `Erreur`, data: error.message });
    });
};
