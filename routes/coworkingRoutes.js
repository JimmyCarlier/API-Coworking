const express = require("express");
const router = express.Router();
const coworkinkController = require("../controllers/coworkingController");
const authController = require("../controllers/authController");

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
    coworkinkController.updateById
  )
  .delete(coworkinkController.deleteById);

module.exports = router;
