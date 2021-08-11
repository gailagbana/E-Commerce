let routes = require("express").Router();

const itemController = require("../controllers/item.controller");
const { isAuthenticated, isAdmin } = require("../middleware/auth");

routes
  .post("/create", isAuthenticated, isAdmin, itemController.createItem)
  .put("/update/:id", isAuthenticated, isAdmin, itemController.updateItemById)
  .get("getItem/:id", itemController.getItemById)
  .get("/getCategoryItem/:id", itemController.getItemsByCategoryId)
  .delete(
    "/delete/:id",
    isAuthenticated,
    isAdmin,
    itemController.deleteItemById
  );

module.exports = routes;
