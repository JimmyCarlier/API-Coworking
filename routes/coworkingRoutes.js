const express = require("express");
const router = express.Router();
const coworkinkController = require("../controllers/coworkingController");
const authController = require("../controllers/authController");
const { coworking } = require("../dataBase/sequelize");

router.route("/Sql").get(coworkinkController.findAllCoworkingSQL);

router
  .route("/")
  .get(coworkinkController.findAllCoworkingByPK)
  .post(coworkinkController.createCoworking);

router
  .route("/:id")
  .get(coworkinkController.getNameById)
  .put(
    authController.protect,
    authController.restrictTo("edit"),
    authController.restrictToOwnUser(coworking),
    coworkinkController.updateById
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    authController.restrictToOwnUser(coworking),
    coworkinkController.deleteById
  );

module.exports = router;
