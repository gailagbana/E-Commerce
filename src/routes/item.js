let routes = require("express").Router();

const {
  createItem,
  updateItemById,
  getItemById,
  getItemsByCategoryId,
  deleteItemById,
} = require("../controllers/item.controller");
const { isAuthenticated, isAdmin } = require("../middleware/auth");

routes
  .post("/create", isAuthenticated, isAdmin, createItem)
  .put("/update/:id", isAuthenticated, isAdmin, updateItemById)
  .get("/get/:id", isAuthenticated, getItemById)
  .get("/filter/:id", isAuthenticated, getItemsByCategoryId)
  .delete("/delete/:id", isAuthenticated, isAdmin, deleteItemById);

module.exports = routes;
