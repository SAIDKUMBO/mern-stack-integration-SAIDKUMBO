// Central error handler (you already have one in server.js; you can require this instead)
exports.errorHandler = (err, req, res, next) => {
  console.error(err);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Server Error'
  });
};
