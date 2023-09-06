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
  status: number;
  errors: Object;
  constructor(message: string, errors: Object, status: number) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
}
class BadRequestError extends ErrorResponse {
  constructor(
    message = reasonStatusCode.BADREQUEST,
    errors = {},
    status = statusCode.BADREQUEST
  ) {
    super(message, errors, status);
  }
}
class NotFound extends ErrorResponse {
  constructor(
    message = reasonStatusCode.NOTFOUND,
    errors = {},
    status = statusCode.NOTFOUND
  ) {
    super(message, errors, status);
  }
}
class Conflict extends ErrorResponse {
  constructor(
    message = reasonStatusCode.CONFLICT,
    errors = {},
    status = statusCode.CONFLICT
  ) {
    super(message, errors, status);
  }
}
class Unauthorized extends ErrorResponse {
  constructor(
    message = reasonStatusCode.UNAUTHORIZED,
    errors = {},
    status = statusCode.UNAUTHORIZED
  ) {
    super(message, errors, status);
  }
}
export { BadRequestError, NotFound, ErrorResponse, Conflict, Unauthorized };
