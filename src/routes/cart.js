let routes = require("express").Router();
const { isAuthenticated, isAdmin } = require("../middleware/auth");
const {
  getAllCart,
  getCart,
  addToCart,
} = require("../controllers/cart.controllers");

routes
  .get("/", isAuthenticated, isAdmin, getAllCart)
  .get("/:id", isAuthenticated, getCart)
  .post("/", isAuthenticated, addToCart);

module.exports = routes;
