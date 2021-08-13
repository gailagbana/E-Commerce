let routes = require("express").Router();
const { isAuthenticated } = require("../middleware/auth");
const {
  getAllCart,
  getCart,
  addToCart,
} = require("../controllers/cart.controllers");

routes
  .get("/", isAuthenticated, getAllCart)
  .get("/:id", isAuthenticated, getCart)
  .post("/", isAuthenticated, addToCart);

module.exports = routes;
