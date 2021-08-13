const Cart = require("../models/cart.model");
const { processError, processSuccess } = require("../helpers/response");

async function getAllCart(request, response) {
  try {
    const cart = await Cart.find({});
    return processSuccess(response, cart);
  } catch (e) {
    return processError(response, e.message);
  }
}

async function getCart(request, response) {
  try {
    const { id } = request.params;
    const findCart = await Cart.find({ userId: id });

    return processSuccess(response, findCart);
  } catch (e) {
    return processError(response, e.message);
  }
}

async function addToCart(request, response) {
  try {
    const { product, userId } = request.body;
    if (!userId) throw new Error("User ID is required.");
    if (!product) throw new Error("Product required.");

    const result = await Cart.updateOne(
      { userId: userId },
      { ...product },
      { upsert: true }
    );

    return processSuccess(response, result);
  } catch (e) {
    return processError(response, e.message);
  }
}

module.exports = { getAllCart, getCart, addToCart };
