const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

router.route("/").get(userController.getAllUser);

router.route("/signup").post(authController.signup);

router.route("/login").post(authController.login);

router
  .route("/:id")
  .delete(
    authController.protect,
    authController.restrictTo("edit"),
    userController.destroyUser
  )
  .put(
    authController.protect,
    authController.restrict,
    userController.updateUser
  )
  .get(userController.getUserbyId);

module.exports = router;
