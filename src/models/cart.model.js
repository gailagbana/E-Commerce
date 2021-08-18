const { model, Schema } = require("mongoose");

const cartSchema = new Schema({
  userId: {
    type: String,
    required: true,
    ref: "User",
  },
  product: {
    type: Array,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}); 

module.exports = Cart = model("cart", cartSchema);
