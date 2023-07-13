const { log } = require("console");
const mokCoworkings = require("./mock-coworkings");
const express = require("express");
const coworkings = require("./mock-coworkings");
const app = express();
const port = 3000;

app.get("/api/coworkings", (req, res) => {
  const criterium = req.query.criterium || "superficy";
  const orderBy = req.query.orderBy || "ASC";

  if (
    (orderBy === "ASC" || orderBy === "DESC") &&
    (criterium === "superficy" || criterium === "capacity")
  ) {
    coworkings.sort((a, b) => {
      orderBy === "DESC"
        ? b[criterium] - a[criterium]
        : a[criterium] - b[criterium];
    });
  }

  console.log(criterium, orderBy);
  res.json(coworkings);
});

app.get("/api/coworkings/length", (req, res) => {
  const arraySort = coworkings.sort((a, b) => a.superficy - b.superficy);
  res.json({ result: arraySort });
});

app.get("/api/coworkings/:id", (req, res) => {
  // récupérer le nom de l'objet par rapport à l'id qui est passé en parametre.

  const result = coworkings.find(
    (element) => element.id === parseInt(req.params.id)
  );
  console.log(result.name);

  let resultOfEach = "";
  coworkings.forEach((element) => {
    if (element.id === parseInt(req.params.id)) {
      resultOfEach = element.name;
    }
  });
  ///////////////////
  console.log(resultOfEach);

  res.json({ result: `Nom du coworking : ${resultOfEach}` });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
