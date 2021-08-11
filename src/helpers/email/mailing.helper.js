const nodemailer = require("nodemailer");

async function sendEmail({ email, token }) {
  const transporter = nodemailer.createTransport(config.smtpOptions)({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: "agbana.oluwatunmise@lmu.edu.ng",
      pass: "process.env.EMAIL_PASS",
    },
  });

  var mailOptions;
  let sender = "Gail Agbana";
  mailOptions = {
    from: sender,
    to: email,
    Subject: "Email Confirmation",
    html: `Tap this link : <a href=http://localhost:2000/confirmation/${token}></a> to confirm email. Thank You.`,
  };

  await transporter.sendMail(mailOptions, function (error, response) {
    if (error) return console.log(error);
    console.log("Message sent");
  });
}

module.exports = sendEmail;
