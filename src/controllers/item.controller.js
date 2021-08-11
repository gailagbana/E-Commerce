const multer = require("multer");

const { processError, processSuccess } = require("../helpers/response");
const Items = require("../models/item.model");

async function createItem(request, response) {
  try {
    const { itemTitle, itemDescription, categoryId, quantity, price } =
      request.body;

    if (!itemTitle) throw new Error("Title of item required.");
    if (!itemDescription) throw new Error("Discription of item required.");
    if (!categoryId) throw new Error("Category Id of item is required.");
    if (!quantity) throw new Error("Quantity of item required");
    if (!price) throw new Error("Price of Item is required.");

    const existingItem = await Items.findOne({ itemTitle });

    if (existingItem.length) throw new Error("Item already exists.");

    const Item = await Items.create({
      itemTitle,
      itemDescription,
      categoryId,
      quantity,
      price,
    });
    // Item.image = request.image.map((fileName) => ({ fileName: fileName }));

    return await processSuccess(response, Item);
  } catch (e) {
    return await processError(response, e.message);
  }
}

async function updateItemById(request, response, next) {
  try {
    const update = request.body;
    const _id = request.params._id;
    await items.findByIdAndUpdate(_id, update);
    const items = await items.findById(_id);
    const result = {
      data: items,
      message: "items has been updated",
    };
    return await processSuccess(response, result);
  } catch (e) {
    return await processError(response, e.message);
  }
}

async function getItemsByCategoryId(request, response, next) {
  try {
    const categoryId = request.params;
    const verifyCategoryId = await Category.findOne(categoryId);
    if (verifyCategoryId == null) throw new Error("Invalid category Id");

    const items = await Items.findOne(categoryId);
    if (items == null) throw new Error("Could not find Items ");

    return await processSuccess(response, items);
  } catch (e) {
    return await processError(response, e.message);
  }
}

async function getItemById(request, response, next) {
  try {
    const _id = request.params._id;
    const item = await Items.findById(_id);
    if (item == null) throw new Error("Item does not exist");
    return await processSuccess(response, items);
  } catch (e) {
    return await processError(response, e.message);
  }
}

async function deleteItemById(request, response, next) {
  try {
    const _id = request.params._id;
    await items.findByIdAndDelete(_id);
    const result = {
      data: null,
      message: "items has been deleted",
    };
    return await processSuccess(response, result);
  } catch (e) {
    return await processError(response, e.message);
  }
}

module.exports = {
  createItem,
  updateItemById,
  getItemById,
  getItemsByCategoryId,
  deleteItemById,
};
