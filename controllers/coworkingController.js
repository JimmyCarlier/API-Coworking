const { ValidationError } = require("sequelize");
const { coworking } = require("../dataBase/sequelize");

exports.findAllCoworkingByPK = (req, res) => {
  // const criterium = req.query.criterium || "superficy";
  // const orderBy = req.query.orderBy || "ASC";
  // const mokCowork = [...coworkings];
  // const noSort = req.query.nosort;

  // if (
  //   !noSort &&
  //   (orderBy === "ASC" || orderBy === "DESC") &&
  //   (criterium === "superficy" || criterium === "capacity")
  // ) {
  //   mokCowork.sort((a, b) => {
  //     return orderBy === "DESC"
  //       ? b[criterium] - a[criterium]
  //       : a[criterium] - b[criterium];
  //   });
  // }

  // console.log(criterium, orderBy);
  // res.json(mokCowork);

  const orderBy = req.query.orderBy || "capacity";
  const test = req.query.test || "ASC";

  coworking
    .findAll({
      order: [[orderBy, test]],
    })
    .then((coworkings) => {
      res.json(coworkings);
    })
    .catch((error) => {
      res.json(`Une erreur à était rencontré ${error}`);
    });
};

exports.createCoworking = (req, res) => {
  // const idForobject = coworkings[coworkings.length - 1].id + 1;
  // const idForNewObj = {
  //   id: idForobject,
  //   ...req.body,
  // };
  // coworkings.push(idForNewObj);
  // return res.json({
  //   message: `Un nouveau coworking à était créée son id est le ${idForobject}`,
  //   data: idForNewObj,
  // });
  coworking
    .create({
      name: req.body.name,
      price: req.body.price,
      address: req.body.address,
      superficy: req.body.superficy,
      capacity: req.body.capacity,
      created: req.body.created,
    })
    .then(() => {
      res.status(201).json({
        message: "La ligne à bien était créée",
      });
    })
    .catch((error) => {
      if(error instanceof ValidationError){
        return res.status(400).json({message : error.message})
      }
      res.status(400).json({
        message: `La ligne n'a pas pu être créée car l'erreur est : ${error}`,
      });
    });
};

exports.getNameById = (req, res) => {
  // const result = coworkings.find(
  //   (element) => element.id === parseInt(req.params.id)
  // );
  // if (result) {
  //   res.json({ result: `Nom du coworking : ${result.name}` });
  // } else {
  //   res.json({ message: `L'élement demander n'existe pas` });
  // }
  coworking
    .findByPk(req.params.id)
    .then((data) => {
      if (data === null) {
        throw new Error("ID not found");
      }
      res.json({ message: data.name });
    })
    .catch((error) => {
      res.status(400).json({ message: `Erreur ! ${error}` });
    });
};

exports.updateById = (req, res) => {
  // const id = req.params.id;

  // const indexArray = coworkings.findIndex((element) => {
  //   return element.id === parseInt(id);
  // });

  // coworkings[indexArray]
  //   ? (updatedCoworking = { ...coworkings[indexArray], ...req.body })
  //   : res.json({
  //       message: `L'élément n'éxiste pas, veuillez réssayer avec un autre identifiant`,
  //     });

  // coworkings[indexArray] = updatedCoworking;

  // return res.json({
  //   message: `Le coworking ${updatedCoworking.name} à était modifiée avec succès`,
  // });

  coworking
    .update(req.body, { where: { id: req.params.id } })
    .then((result) => {
      if (result[0] === 0) {
        throw new Error(`L'id n'existe pas`);
      }
      res.json(result);
    })
    .catch((error) => {
      res.status(400).json({ message: `Erreur ! Erreur ! Erreur ! ${error}` });
    });
};

exports.deleteById = (req, res) => {
  // id = req.params.id;

  // const findTheIndex = coworkings.findIndex((element) => {
  //   return element.id === parseInt(id);
  // });
  // if (!coworkings[findTheIndex]) {
  //   res.json({ message: `L'élément ${id} à déjà était supprimé` });
  //   return;
  // } else {
  //   const result = coworkings.splice(findTheIndex, 1);
  // }

  // res.json({
  //   message: `Vous avez supprimé l element numéro ${findTheIndex}`,
  //   data: coworkings[findTheIndex],
  // });

  coworking
    .destroy({
      where: {
        id: req.params.id,
      },
    })
    .then((result) => {
      res.json({
        message: `L'objet ayant l'id ${req.params.id} à bien était supprimé`,
        data: result,
      });
    })
    .catch((error) => {
      res.status(400).json({ message: `Erreur ! Erreur ! Erreur ! ${error}` });
    });
};


