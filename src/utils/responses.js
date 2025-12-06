exports.successResponse = (res, message, data = null, extra = {}) => {
  return res.json({
    success: true,
    message,
    data,
    ...extra,
  });
};

exports.errorResponse = (res, message, errors = [], status = 400) => {
  return res.status(status).json({
    success: false,
    message,
    errors,
  });
};
