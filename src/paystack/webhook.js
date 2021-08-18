async function webhook(request, response) {
  try {
    return processSuccess(response, result);
  } catch (e) {
    return await processError(response, e.message);
  }
}
