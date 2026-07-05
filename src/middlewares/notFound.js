const APIResponse = require("../utils/APIResponse");

function notFound(req, res) {
  return APIResponse.error(
    res,
    `API endpoint not found: ${req.method} ${req.originalUrl}`,
    404
  );
}

module.exports = notFound;
