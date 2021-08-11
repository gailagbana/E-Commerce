require("dotenv").config();
const jwt = require("jsonwebtoken");

const { processError } = require("../helpers/response");

async function isAuthenticated(request, response, next) {
  const token = request.header("Authorization");
  if (!token)
    return processError(response, "Access denied. No token provided.");
  try {
    const verifyToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    request.User = verifyToken;
    return next();
  } catch (error) {
    return processError(response, error.message);
  }
}

async function isAdmin(request, response, next) {
  try {
    const { email, password } = request.body;

    const findrole = await User.findOne({ email });
    if (findrole.role !== "admin")
      return response
        .status(401)
        .json("You don't have enough permission to perform this action");
    return next();
  } catch (error) {
    return processError(response, error.message);
  }
}

module.exports = { isAuthenticated, isAdmin };
