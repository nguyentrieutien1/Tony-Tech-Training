const { logger } = require("../config/logger");
const { ErrorResponse } = require("../core/error.response");

function errorHandler(err, req, res, next) {
  logger.error(err);
  let statusCode = 500;
  let message = "Internal Server Error";

  if (err instanceof ErrorResponse) {
    message = err.message || message;
    statusCode = err.status || statusCode;
  }

  res.status(statusCode).json({ message, statusCode });
}
module.exports = {
  errorHandler,
};
