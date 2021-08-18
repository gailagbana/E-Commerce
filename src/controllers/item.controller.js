const { processError, processSuccess } = require("../helpers/processResponse");
const Items = require("../models/item.model");
const Category = require("../models/category.model");

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

    if (existingItem !== null) throw new Error("Item already exists.");

    const item = new Items({
      itemTitle,
      itemDescription,
      categoryId,
      quantity,
      price,
    });
    await item.save();

    const result = item;
    return await processSuccess(response, result);
  } catch (e) {
    return await processError(response, e.message);
  }
}

async function updateItemById(request, response, next) {
  try {
    const { id } = request.params;
    const { body } = request;

    if (!body.length) throw new Error("Update required.");

    const item = await Items.updateOne({ _id: id }, { ...body }, { new: true });
    if (!item) throw new Error("could not update item");

    const result = {
      data: item,
      message: "items has been updated",
    };
    return await processSuccess(response, result);
  } catch (e) {
    return await processError(response, e.message);
  }
}

async function getItemsByCategoryId(request, response, next) {
  try {
    const { id } = request.params;
    if (!id) throw new Error("Category id is required");

    const items = await Items.find({ categoryId: id });

    return await processSuccess(response, items);
  } catch (e) {
    return await processError(response, e.message);
  }
}

async function getItemById(request, response, next) {
  try {
    const { id } = request.params;

    const item = await Items.find({ _id: id });
    // if (item == null) throw new Error("Item does not exist");

    return await processSuccess(response, item);
  } catch (e) {
    return await processError(response, e.message);
  }
}

async function deleteItemById(request, response, next) {
  try {
    const { id } = request.params;

    const result = await Items.findByIdAndDelete({ _id: id });
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
