const Category = require("../models/category.model");

async function processError(response, error) {
  return response.status(404).json({ payload: null, error, success: false });
}

async function processSuccess(response, success) {
  return response
    .status(200)
    .json({ payload: { ...success }, error: null, success: true });
}

async function createCategory(request, response) {
  try {
    const { categoryTitle, categoryDescription } = request.body;

    if (!categoryTitle)
      throw new Error("Enter the title of category to be created");
    if (!categoryDescription) throw new Error("Describe the category.");

    const existingCategory = await Category.find({ categoryTitle });

    if (existingCategory.length) throw new Error("Category already exists.");

    const category = await Category.create({
      categoryTitle,
      categoryDescription,
    });
    return await processSuccess(response, category);
  } catch (e) {
    return await processError(response, e.message);
  }
}

async function editCategoryById(request, response) {
  try {
    const update = request.body;
    const { _id } = request.params._id;

    if (!_id) throw new Error("Category Id required to edit category.");
    if (!update) throw new Error("update details required to edit category.");

    const findAndEditCategory = await Category.findByIdAndUpdate(_id, {
      update,
    });
    if (findAndEditCategory == null) throw new Error("Category not found");
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
    const { categoryId } = request.params;
    if (!categoryId) throw new Error("Category Id required");

    const getCategoryById = await Category.findOne({ categoryId });
    if (getCategoryById == null) throw new Error("Category does not exists.");
    return await processSuccess(response, getCategoryById);
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
    const { _id } = request.params._id;
    if (!_id) throw new Error("Category Id required");

    const deleteCategory = await Category.findByIdAndDelete(_id);
    if (deleteCategory == null)
      throw new Error("Could not find Category and delete");

    let message = "Category deleted successfully";
    return await processSuccess(response, { message, deleteCategory });
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
