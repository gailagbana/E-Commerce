require("dotenv").config();
const jwt = require("jsonwebtoken");

const { processError } = require("../helpers/response");

async function isAuthenticated(request, response, next) {
  try {
    const token = request.header("Authorization");
    if (!token) throw new Error("Access denied. No token provided.");
    const verifyToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    request.User = verifyToken;
    return next();
  } catch (error) {
    return processError(response, error.message);
  }
}

async function isAdmin(request, response, next) {
  try {
    if (request.User.user.role !== "admin")
      throw new Error(
        "You don't have enough permission to perform this action"
      );
    return next();
  } catch (error) {
    return processError(response, error.message);
  }
}

module.exports = { isAuthenticated, isAdmin };
