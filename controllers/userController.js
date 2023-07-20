const { user } = require("../dataBase/sequelize");

exports.getAllUser = (req, res) => {
  user
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
  user
    .create({
      name: req.body.name,
      password: req.body.password,
    })
    .then((user) => {
      res.json({
        message: `Voici l'utilisateur que vous avez créée`,
        data: user,
      });
    })
    .catch((error) => {
      res.json({ message: `Erreur ${error}` });
    });
};

exports.destroyUser = (req, res) => {
  user
    .destroy({
      where: {id : req.params.id},
    })
    .then((user) => {
      res.json({ message: `Vous avez supprimé l'élément`, data: user });
    })
    .catch((error) => {
      res.json({ message: `La suppression n'a pu être effectué ${error}` });
    });
};

exports.updateUser = (req,res) =>{
  user
  .update(req.body,{
    where : {
      id : req.params.id
    }
  })
  .then((user)=>{
    res.json({message : `L'utilisateur à était modifiée`, data:user})
  })
  .catch((error)=>{
    res.json({message : `Error : ${error}`})
  })
}
