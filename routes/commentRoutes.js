const express = require("express");
const router = express.Router();
const commentaryController = require("../controllers/commentaryController");
const authController = require("../controllers/authController");

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
    authController.restrictTo("admin"),
    commentaryController.deleteComment
  )
  .post(
    authController.protect,
    authController.restrictTo("edit"),
    commentaryController.createComment
  );

module.exports = router;
