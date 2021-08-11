const { Schema, model } = require("mongoose");

const itemSchema = new Schema({
  itemTitle: {
    type: String,
    required: true,
  },
  categoryId: {
    type: Number,
  },
  itemDescription: {
    type: String,
  },
  quantity: {
    type: Number,
    required: true,
  },
  image: [{ fileName: String }],
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

module.exports = Items = model("item", itemSchema);
