async function processError(response, error) {
  return response.status(404).json({ payload: null, error, success: false });
}

async function processSuccess(response, success) {
  return response
    .status(200)
    .json({ payload: { ...success }, error: null, success: true });
}

module.exports = {
  processError,
  processSuccess,
};
