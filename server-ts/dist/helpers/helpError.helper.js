"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelpError = void 0;
const error_response_1 = require("../core/error.response");
function HelpError(err, res) {
    console.log(err);
    let message = "Server is wrong, please access later !";
    let statusCode = 500;
    let errors = {};
    if (err instanceof error_response_1.ErrorResponse) {
        message = err.message || message;
        statusCode = err.status || statusCode;
        errors = err.errors || errors;
    }
    res.status(statusCode).json({ message, statusCode, errors });
}
exports.HelpError = HelpError;
