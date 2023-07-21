const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

router.route("/").get(userController.getAllUser);

router.route("/signup").post(authController.signup);

router.route("/login").post(authController.login);

router
  .route("/:id")
  .delete(authController.protect, userController.destroyUser)
  .put(userController.updateUser)
  .get(userController.getUserbyId);

module.exports = router;
