const { errorResponse } = require("../utils/responses");

module.exports = (err, req, res, next) => {
  console.error("ERROR:", err);

  return errorResponse(res, err.message || "Internal Server Error", [], 500);
};
