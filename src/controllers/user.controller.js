const bcrypt = require("bcrypt");

const User = require("../models/user.model");
const {
  generateAuthToken,
  hashObject,
  generateEncryption,
} = require("../helpers/encryption.helper");
const {
  createToken,
  readToken,
  deleteToken,
} = require("../controllers/token.controller");
const { processEmail } = require("../helpers/email/processEmail");
const { processError, processSuccess } = require("../helpers/processResponse");

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

    const existingUser = await User.findOne({ email, phoneNumber });
    if (existingUser) {
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

    const encryption = await generateEncryption();
    const verficationToken = await hashObject(encryption);
    request.tokenDetails = { token: verficationToken, userId: user._id };
    await createToken(request, response);

    await processEmail("registrationSuccessful", user, encryption);

    return processSuccess(response, data);
  } catch (e) {
    return processError(response, e.message);
  }
}

async function verifyAccount(request, response) {
  try {
    const { token } = request.params;
    const user = await TokenController({ token: token });

    if (!user) throw new Error("User not found.");

    user.is_verified = true;
    await user.save();
    result = {
      message: "User is verified.",
      user,
    };

    await processEmail("verifiedSuccessfully", user, encryption);

    return processSuccess(response, result);
  } catch (e) {
    return await processError(response, e.message);
  }
}

// async function resendToken(request, response) {
//   try {
//     const { email } = request.body;
//     if (!email) throw new Error("Email address required.");

//     const existingUser = await findOne({ email });
//     if (existingUser == null) throw new Error("Email does not exist.");

//     const token = await generateAuthToken({ existingUser });
//     const mailTypeToSend = "";
//     await processEmail();
//     return await processSuccess(response, token);
//   } catch (e) {
//     return await processError(response, e.message);
//   }
// }

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

async function getUserById(request, response, next) {
  try {
    const _id = request.params;

    const user = await User.findById(_id);
    if (!user) throw new Error("User does not exist");
    return await processSuccess(response, user, { message: "User deleted" });
  } catch (e) {
    return await processError(response, e.message);
  }
}

async function getAllUsers(request, response, next) {
  try {
    const users = await User.find();
    if (!users) throw new Error("There is no user");

    return await processSuccess(response, users);
  } catch (e) {
    return await processError(response, e.message);
  }
}

async function updateUser(request, response, next) {
  try {
    const { _id } = request.params;
    const { body } = request;

    if (!body) throw new Error("Enter details to be updated");

    const findAndEditUser = await User.findByIdAndUpdate(
      _id,
      { ...body },
      { new: true }
    );

    if (!findAndEditUser) throw new Error("Could not find and update user");

    const result = {
      findAndEditUser,
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

async function forgotPassword(request, response) {
  try {
    const { email } = request.body;
    if (!email) throw new Error("Please enter an email");

    const existingUser = await User.findOne({ email });
    if (existingUser == null) throw new Error("Account is not registered");

    const encryption = await generateEncryption();
    const token = await hashObject(encryption);

    const mailTypeToSend = "forgotPassword";
    await processEmail(mailTypeToSend, existingUser, encryption);
    return await processSuccess(response, result);
  } catch (e) {
    return await processError(response, e.message);
  }
}

async function changePassword(request, response) {
  try {
    const { _id } = request.params;
    const password = request.body;

    if (![password]) throw new Error("Enter new password");

    let encryptedPassword = await hashObject(password);

    const changePassword = await User.findByIdAndUpdate(
      _id,
      { encryptedPassword },
      { new: true }
    );

    if (!changePassword)
      throw new Error("Could not find user and update user password");

    const result = {
      changePassword,
      message: "User has been updated",
    };

    const mailTypeToSend = "resetPassword";
    await processEmail();

    return await processSuccess(response, result);
  } catch (e) {
    return await processError(response, e.message);
  }
}

module.exports = {
  userSignUp,
  userLogin,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
  verifyAccount,
  forgotPassword,
  changePassword,
};
