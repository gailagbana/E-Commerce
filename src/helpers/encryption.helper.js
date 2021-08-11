require("dotenv").config();
const { promisify } = require("util");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signJWT = promisify(jwt.sign);
const verifyJWT = promisify(jwt.verify);
const { JWT_SECRET_KEY, SALT } = process.env;

async function generateAuthToken(user) {
  const token = await signJWT({ ...user }, JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
  return token;
}

async function verifyAuthToken(token) {
  const isValid = await verifyJWT(token, JWT_SECRET_KEY);
  return isValid;
}

async function hashObject(object) {
  const saltRounds = await bcrypt.genSalt(Number(SALT));
  const encryptedPassword = await bcrypt.hash(object, saltRounds);
  return encryptedPassword;
}

module.exports = {
  generateAuthToken,
  verifyAuthToken,
  hashObject,
};
