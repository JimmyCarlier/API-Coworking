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

exports.showCommentPerCoworking = (req, res) => {
  comment
    .findAll({
      where: { coworkingId: req.params.id },
      include: user,
    })
    .then((coworking) => {
      res.status(200).json({ data: coworking });
    })
    .catch((error) => {
      res.status(400).json({ message: error });
    });
};

exports.createComment = (req, res) => {
  user
    .findOne({
      where: {
        name: req.username,
      },
    })
    .then((user) => {
      console.log(user);
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
