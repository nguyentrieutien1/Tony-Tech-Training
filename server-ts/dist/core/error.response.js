"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Unauthorized = exports.Conflict = exports.ErrorResponse = exports.NotFound = exports.BadRequestError = void 0;
const statusCode = {
    BADREQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOTFOUND: 404,
    CONFLICT: 409,
};
const reasonStatusCode = {
    BADREQUEST: "Bad Request !",
    FORBIDDEN: "Forbidden !",
    NOTFOUND: "Not found !",
    CONFLICT: "Conflict !",
    UNAUTHORIZED: "Unauthorized !",
};
class ErrorResponse extends Error {
    constructor(message, errors, status) {
        super(message);
        this.status = status;
        this.errors = errors;
    }
}
exports.ErrorResponse = ErrorResponse;
class BadRequestError extends ErrorResponse {
    constructor(message = reasonStatusCode.BADREQUEST, errors = {}, status = statusCode.BADREQUEST) {
        super(message, errors, status);
    }
}
exports.BadRequestError = BadRequestError;
class NotFound extends ErrorResponse {
    constructor(message = reasonStatusCode.NOTFOUND, errors = {}, status = statusCode.NOTFOUND) {
        super(message, errors, status);
    }
}
exports.NotFound = NotFound;
class Conflict extends ErrorResponse {
    constructor(message = reasonStatusCode.CONFLICT, errors = {}, status = statusCode.CONFLICT) {
        super(message, errors, status);
    }
}
exports.Conflict = Conflict;
class Unauthorized extends ErrorResponse {
    constructor(message = reasonStatusCode.UNAUTHORIZED, errors = {}, status = statusCode.UNAUTHORIZED) {
        super(message, errors, status);
    }
}
exports.Unauthorized = Unauthorized;
