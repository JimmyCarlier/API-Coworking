const express = require("express");
const router = express.Router();
const commentaryController = require("../controllers/commentaryController");
const authController = require("../controllers/authController");
const { comment } = require("../dataBase/sequelize");

router
  .route("/")
  .get(
    authController.protect,
    authController.restrictTo("admin"),
    commentaryController.showAllComment
  );

router
  .route("/:id")
  .delete(
    authController.protect,
    // authController.restrictTo("admin"),
    authController.restrictToOwnUser(comment),
    commentaryController.deleteComment
  )
  .post(authController.protect, commentaryController.createComment);

module.exports = router;
