const Token = require("../models/token.model");

async function createToken(request, response) {
  try {
    const { tokenDetails } = request;
    if (!tokenDetails) throw new Error("Token details required.");

    const result = new Token({ ...tokenDetails });
    await result.save();
    return result;
  } catch (e) {
    return e.message;
  }
}

async function readToken(request, response) {
  try {
    const { userId } = request;
    if (!userId) throw new Error("user Id is required");

    const fetchToken = await Token.findOne({ userId });
    return fetchToken;
  } catch (e) {
    return e.message;
  }
}

async function deleteToken(request, response) {
  try {
    const { userId } = request;
    if (!userId) throw new Error("User Id required to delete token");

    const findToken = await Token.findOneAndDelete({ userId });

    return findToken;
  } catch (e) {
    return e.message;
  }
}

module.exports = { createToken, readToken, deleteToken };
