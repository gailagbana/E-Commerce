const { model, Schema } = require("mongoose");

const tokenSchema = new Schema({
  userId: {
    type: String,
    required: true,
    ref: "User",
  },
  token: {
    type: String,
    required: true,
  },
});

module.exports = Token = model("token", tokenSchema);
