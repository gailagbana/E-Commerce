const { Schema, model } = require("mongoose");

const itemSchema = new Schema({
  itemTitle: {
    type: String,
    required: true,
  },
  categoryId: {
    type: String,
    required: true,
    ref: "Category",
  },
  itemDescription: {
    type: String,
  },
  quantity: {
    type: Number,
    min: 1,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

module.exports = Items = model("item", itemSchema);
