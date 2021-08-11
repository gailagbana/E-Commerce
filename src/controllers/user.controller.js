const bcrypt = require("bcrypt");
const User = require("../models/user.model");

const {
  generateAuthToken,
  hashObject,
} = require("../helpers/encryption.helper");
const mailhelper = require("../helpers/email/mailing.helper");
const { processError, processSuccess } = require("../helpers/response");

async function userSignUp(request, response) {
  try {
    const { body } = request;
    if (!body) throw new Error("Body is required.");

    const { name, email, phoneNumber, password, confirmPassword, role } = body;

    if (!name) throw new Error("name is required.");
    if (!email) throw new Error("Email is required");
    if (!phoneNumber) throw new Error("Phone Number is required");
    if (!password) throw new Error("Password is required");
    if (!confirmPassword) throw new Error("Confirm Password is required");

    if (password !== confirmPassword)
      throw new Error("Passwords do not match.");

    const existingUser = await User.findOne({ email, name });
    if (existingUser !== null) {
      throw new Error("User already exists. Proceed to login");
    }

    let encryptedPassword = await hashObject(password);
    const user = new User({
      name,
      email,
      phoneNumber,
      password: encryptedPassword,
      role,
    });
    await user.save();
    const token = await generateAuthToken({ user });
    const data = {
      token,
      user,
    };
    return processSuccess(response, data);
  } catch (e) {
    return processError(response, e.message);
  }
}

async function verifyAccount(request, response) {
  try {
    const { token } = request.params;
    const user = await User.findOne({ token: token });
    if (user) {
      user.is_verified = true;
      await user.save();
      message = "User is verified.";
    } else {
      message = "User not found.";
    }
    return processSuccess(response, user);
  } catch (e) {
    return await processError(response, e.message);
  }
}

async function resendToken(request, response) {
  try {
    const { email } = request.body;
  } catch (e) {
    return await processError(response, e.message);
  }
}

async function userLogin(request, response) {
  try {
    const { email, password } = request.body;

    if (!email) throw new Error("Please Input email");
    if (!password) throw new Error("Please input password");

    const iam = await User.findOne({ email });
    if (iam == null)
      throw new Error("User does not exist, proceed to sign up.");

    const isPasswordCorrect = await bcrypt.compare(password, iam.password);
    if (isPasswordCorrect == false) throw new Error("Invalid password.");

    const token = await generateAuthToken({ iam });
    let message = "Account logged in successfully";
    return await processSuccess(response, { user: iam, message, token });
  } catch (e) {
    return await processError(response, e.message);
  }
}

async function getUser(request, response, next) {
  try {
    const _id = request.params._id;
    const user = await User.findById(_id);
    if (!user) throw new Error("User does not exist");
    return await processSuccess(response, user, { message: "User deleted" });
  } catch (e) {
    return await processError(response, e.message);
  }
}

async function updateUser(request, response, next) {
  try {
    const update = request.body;
    const _id = request.params._id;
    await User.findByIdAndUpdate(_id, update);
    const user = await User.findById(_id);
    const result = {
      data: user,
      message: "User has been updated",
    };
    return await processSuccess(response, result);
  } catch (e) {
    return await processError(response, e.message);
  }
}

async function deleteUser(request, response, next) {
  try {
    const _id = request.params._id;
    await User.findByIdAndDelete(_id);
    const result = {
      data: null,
      message: "User has been deleted",
    };
    return await processSuccess(response, result);
  } catch (e) {
    return await processError(response, e.message);
  }
}

async function resetEmail(request, response) {
  try {
    const { email } = request.body;
    if (!email) throw new Error();
  } catch (e) {
    return await processError(response, e.message);
  }
}

async function forgotPassword(request, response) {
  try {
    const { email } = request.body;
  } catch (e) {
    return await processError(response, e.message);
  }
}

async function changePassword(request, response) {
  try {
    const { email } = request.body;
  } catch (e) {
    return await processError(response, e.message);
  }
}

module.exports = {
  userSignUp,
  verifyAccount,
  resendToken,
  userLogin,
  getUser,
  updateUser,
  deleteUser,
  resetEmail,
  forgotPassword,
  changePassword,
};
