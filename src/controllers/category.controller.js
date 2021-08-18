const Category = require("../models/category.model");
const { processError, processSuccess } = require("../helpers/processResponse");

async function createCategory(request, response) {
  try {
    const { categoryTitle, categoryDescription } = request.body;

    if (!categoryTitle) throw new Error("Category required");
    if (!categoryDescription) throw new Error("Describe the category.");

    const existingCategory = await Category.findOne({ categoryTitle });

    if (existingCategory.length) throw new Error("Category already exists.");

    const category = new Category({
      categoryTitle,
      categoryDescription,
    });
    await category.save();
    const data = {
      category,
    };
    return await processSuccess(response, data);
  } catch (e) {
    return await processError(response, e.message);
  }
}

async function editCategoryById(request, response) {
  try {
    const { _id } = request.params;
    const { body } = request;
    if (!_id) throw new Error("Category Id required to edit category.");
    if (body.length == 0) throw new Error("Body is empty");

    const findAndEditCategory = await Category.updateOne(
      { _id },
      { ...body },
      { upsert: true }
    );

    if (!findAndEditCategory)
      throw new Error("Could not find and update Category");

    const result = {
      data: findAndEditCategory,
      message: "Category has been updated",
    };

    return await processSuccess(response, result);
  } catch (e) {
    return await processError(response, e.message);
  }
}

async function getCategoryById(request, response) {
  try {
    const { id } = request.params;
    if (!id) throw new Error("Category Id required");

    const getCategoryById = await Category.findOne({ _id: id });
    if (getCategoryById == null) throw new Error("Category does not exists.");
    const result = {
      getCategoryById,
    };
    return await processSuccess(response, result);
  } catch (e) {
    return await processError(response, e.message);
  }
}

async function getCategories(request, response) {
  try {
    const getAllCategories = await Category.find();
    if (getAllCategories == null) throw new Error("No Categories Found");
    return await processSuccess(response, getAllCategories);
  } catch (e) {
    return await processError(response, e.message);
  }
}

async function deleteCategoryById(request, response) {
  try {
    const { id } = request.params;
    if (!id) throw new Error("Category Id required");

    const deleteCategory = await Category.findByIdAndDelete({ _id: id });
    if (deleteCategory == null)
      throw new Error("Could not find Category to delete");

    const result = {
      data: null,
      message: "Category deleted successfully",
    };
    return await processSuccess(response, result);
  } catch (e) {
    return await processError(response, e.message);
  }
}

module.exports = {
  createCategory,
  editCategoryById,
  getCategories,
  getCategoryById,
  deleteCategoryById,
};
