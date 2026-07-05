const APIResponse = require("../utils/APIResponse");

function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return APIResponse.error(res, "Invalid JSON body", 400);
  }

  const statusCode = err.statusCode || 500;
  const message =
    statusCode === 500 ? "Internal server error" : err.message || "Error";

  return APIResponse.error(res, message, statusCode);
}

module.exports = errorHandler;
