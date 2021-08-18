require("dotenv").config;

const { sendEmail } = require("./mailing.helper");
const { APP_NAME } = process.env;

async function processEmail(mailTypeToSend, userDetails, encryption = null) {
  let toEmail;
  let mailTitle;
  let payload;
  let templateLink;

  switch (mailTypeToSend) {
    case "registrationSuccessful": {
      toEmail = userDetails.email;
      mailTitle = "Registration Successful.";
      payload = {
        name: userDetails.name,
        siteName: APP_NAME,
        link: `https://FRONTENDURL/${encryption}/${userDetails._id}`,
      };
      templateLink = "./templates/registrationSuccessful.handlebars";
      message = "Sorry, we could not mail registration success to you.";
      break;
    }
    case "verifiedSuccessfully": {
      toEmail = userDetails[0].email;
      mailTitle = "Account verification successful.";
      payload = { name: userDetails[0].name, siteName: APP_NAME };
      templateLink = "./templates/successfulllyVerifiedAccount.handlebars";
      message = "Sorry, we could not mail vrification success email to you.";
      break;
    }
    case "forgotPassword": {
      toEmail = userDetails[0].email;
      mailTitle = "Password Reset Request";
      payload = {
        name: userDetails[0].name,
        link: ``,
        siteName: APP_NAME,
      };
      templateLink =
        "../helpers/email/templates/requestResetPassword.handlebars";
      message = "Sorry, we could not mail your password reset link to you.";
      break;
    }
    case "resetPassword": {
      toEmail = userDetails[0].email;
      mailTitle = "Password Reset Successful";
      payload = { name: userDetails[0].name, siteName: APP_NAME };
      templateLink =
        "../helpers/email/templates/successfulResetPassword.handlebars";
      message = "Sorry, we could not mail reset success email to you.";
      break;
    }
    case "paymentSuccessful": {
      toEmail = userDetails[0].email;
      mailTitle = "Payment Successful";
      payload = { name: userDetails[0].name, siteName: APP_NAME };
      templateLink = "../helpers/email/templates/paymentSuccessful.handlebars";
      message = "Sorry, we could not mail payment success to you.";
      break;
    }
    default: {
      break;
    }
  }
  const mailing = await sendEmail(toEmail, mailTitle, payload, templateLink);
  if (mailing.rejected.length) return "Could not send email";
}

module.exports = { processEmail };
