module.exports = (req, res, next) => {
  const requestId = Date.now().toString(36);
  req.requestId = requestId;
  res.setHeader("X-Request-ID", requestId);
  next();
};
