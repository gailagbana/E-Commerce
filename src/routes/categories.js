let routes = require("express").Router();

const {
  getCategories,
  getCategoryById,
  createCategory,
  editCategoryById,
  deleteCategoryById,
} = require("../controllers/category.controller");

routes
  .get("/getCategory", getCategories)
  .get("/get/:id", getCategoryById)
  .post("/create", createCategory)
  .put("/edit/:id", editCategoryById)
  .delete("/delete/:id", deleteCategoryById);

module.exports = routes;
