const { processError, processSuccess } = require("../helpers/processResponse");
const processEmail = require("../helpers/email/processEmail");
let mailTypeToSend;

async function onSuccessful(request, response) {
  try {
    mailTypeToSend = "paymentSuccessful";
    await processEmail(mailTypeToSend);
    return processSuccess(response);
  } catch (e) {
    return await processError(response, e.message);
  }
}

async function onFailure(request, response) {
  try {
    mailTypeToSend = "paymentnotSuccessful";
    await processEmail(mailTypeToSend);
    return processSuccess(response);
  } catch (e) {
    return await processError(response, e.message);
  }
}
module.exports = { onSuccessful, onFailure };
