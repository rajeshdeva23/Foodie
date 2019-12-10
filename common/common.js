const success = function sendSuccessResponse(res, data) {
  res.status(200).json({
    status: true,
    data,
  })
}

const failure = function sendFailureResponse(res, error, statusCode) {
  res.status(statusCode).json({
    status: false,
    mongoerror: error,
  })
}

const validation = function validationError(res, error, statusCode) {
  res.status(statusCode).json({
    status: false,
    errors: error,
  })
}

module.exports.sendSuccessResponse = success
module.exports.sendFailureResponse = failure
module.exports.validationError = validation
