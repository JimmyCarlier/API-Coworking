const coworkings = require("../dataBase/mock-coworkings");

exports.findAllCoworkingByPK = (req, res) => {
  const criterium = req.query.criterium || "superficy";
  const orderBy = req.query.orderBy || "ASC";
  const mokCowork = [...coworkings];
  const noSort = req.query.nosort;

  if (
    !noSort &&
    (orderBy === "ASC" || orderBy === "DESC") &&
    (criterium === "superficy" || criterium === "capacity")
  ) {
    mokCowork.sort((a, b) => {
      return orderBy === "DESC"
        ? b[criterium] - a[criterium]
        : a[criterium] - b[criterium];
    });
  }

  console.log(criterium, orderBy);
  res.json(mokCowork);
};

exports.createCoworking = (req, res) => {
  const idForobject = coworkings[coworkings.length - 1].id + 1;
  const idForNewObj = {
    id: idForobject,
    ...req.body,
  };
  coworkings.push(idForNewObj);
  return res.json({
    message: `Un nouveau coworking à était créée son id est le ${idForobject}`,
    data: idForNewObj,
  });
};

exports.getNameById = (req, res) => {
  const result = coworkings.find(
    (element) => element.id === parseInt(req.params.id)
  );
  if (result) {
    res.json({ result: `Nom du coworking : ${result.name}` });
  } else {
    res.json({ message: `L'élement demander n'existe pas` });
  }
};

exports.updateById = (req, res) => {
  const id = req.params.id;

  const indexArray = coworkings.findIndex((element) => {
    return element.id === parseInt(id);
  });

  coworkings[indexArray]
    ? (updatedCoworking = { ...coworkings[indexArray], ...req.body })
    : res.json({
        message: `L'élément n'éxiste pas, veuillez réssayer avec un autre identifiant`,
      });

  coworkings[indexArray] = updatedCoworking;

  return res.json({
    message: `Le coworking ${updatedCoworking.name} à était modifiée avec succès`,
  });
};

exports.deleteById = (req, res) => {
  id = req.params.id;

  const findTheIndex = coworkings.findIndex((element) => {
    return element.id === parseInt(id);
  });
  if (!coworkings[findTheIndex]) {
    res.json({ message: `L'élément ${id} à déjà était supprimé` });
    return;
  } else {
    const result = coworkings.splice(findTheIndex, 1);
  }

  res.json({
    message: `Vous avez supprimé l element numéro ${findTheIndex}`,
    data: coworkings[findTheIndex],
  });
};
