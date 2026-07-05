class APIResponse {
  static success(res, message = "Success", data = null, code = 200) {
    return res.status(code).json({
      code,
      message,
      data,
    });
  }

  static error(res, message = "Error", code = 500) {
    return res.status(code).json({
      code,
      message,
    });
  }
}

module.exports = APIResponse;