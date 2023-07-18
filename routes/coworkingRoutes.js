const express = require("express");
const router = express.Router();
const coworkings = require("../dataBase/mock-coworkings");
const coworkinkController = require("../controllers/coworkingController");

router
  .route("/")
  .get(coworkinkController.findAllCoworkingByPK)
  .post(coworkinkController.createCoworking);

router
  .route("/:id")
  .get(coworkinkController.getNameById)
  .put(coworkinkController.updateById)
  .delete(coworkinkController.deleteById);

module.exports = router;
