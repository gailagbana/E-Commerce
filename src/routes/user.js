let routes = require("express").Router();

const userController = require("../controllers/user.controller");
const { isAdmin, isAuthenticated } = require("../middleware/auth");

routes
  .post("/signup", userController.userSignUp)
  .post("/login", userController.userLogin)
  .post("/email", userController.resetEmail)
  .post("/changePassword", userController.changePassword)
  .post("/forgotPassword", userController.forgotPassword)
  .post("/confirmation/:token", userController.verifyAccount)
  .post("/resend", userController.resendToken)
  .get("/:userId", isAuthenticated, isAdmin, userController.getUser)
  .put("/:userId", isAuthenticated, isAdmin, userController.updateUser)
  .delete("/:userId", isAuthenticated, isAdmin, userController.deleteUser);

module.exports = routes;
