"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const error_response_1 = require("../core/error.response");
function errorHandler(err, req, res, next) {
    let statusCode = 500;
    let message = "Internal Server Error";
    if (err instanceof error_response_1.ErrorResponse) {
        message = err.message || message;
        statusCode = err.status || statusCode;
    }
    res.status(statusCode).json({ message, statusCode });
}
exports.errorHandler = errorHandler;
