let routes = require("express").Router();

const {
  getCategories,
  getCategoryById,
  createCategory,
  editCategoryById,
  deleteCategoryById,
} = require("../controllers/category.controller");
const { isAuthenticated, isAdmin } = require("../middleware/auth");

routes
  .get("/getCategory", isAuthenticated, getCategories)
  .get("/get/:id", isAuthenticated, getCategoryById)
  .post("/create", isAuthenticated, isAdmin, createCategory)
  .put("/edit/:_id", isAuthenticated, isAdmin, editCategoryById)
  .delete("/delete/:id", isAuthenticated, isAdmin, deleteCategoryById);

module.exports = routes;
