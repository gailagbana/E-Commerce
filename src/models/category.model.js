const { model, Schema } = require("mongoose");

const categorySchema = new Schema({
  categoryTitle: {
    type: String,
    unique: true,
    required: true,
  },
  categoryDescription: {
    type: String,
    required: true,
  },
});

module.exports = Category = model("category", categorySchema);
