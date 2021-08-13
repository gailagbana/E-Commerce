let routes = require("express").Router();

const {
  userSignUp,
  userLogin,
  resetEmail,
  changePassword,
  forgotPassword,
  verifyAccount,
  resendToken,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");
const { isAdmin, isAuthenticated } = require("../middleware/auth");

routes
  .post("/signup", userSignUp)
  .post("/login", userLogin)
  .post("/email", isAuthenticated, resetEmail)
  .post("/changePassword", isAuthenticated, changePassword)
  .post("/forgotPassword", forgotPassword)
  .post("/confirmation/:token", verifyAccount)
  .post("/resend", resendToken)
  .get("/get/:id", isAuthenticated, isAdmin, getUserById)
  .get("/getUsers", isAuthenticated, isAdmin, getAllUsers)
  .put("update/:id", isAuthenticated, isAdmin, updateUser)
  .delete("delete/:id", isAuthenticated, isAdmin, deleteUser);

module.exports = routes;
