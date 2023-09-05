const statusCode = {
  OK: 200,
  CREATED: 201,
};
const reasonStatusCode = {
  OK: "OK !",
  CREATED: "Created !",
};
class SuccessResponse {
  constructor({
    message,
    data = [],
    status = statusCode.OK,
    reasonStatus = reasonStatusCode.OK,
  }) {
    this.data = data;
    this.message = message ? message : "OK";
    this.status = status;
    this.reasonStatus = reasonStatus;
  }
  send = (res) => {
    return res.status(this.status).json(this);
  };
}
class Ok extends SuccessResponse {
  constructor({ data, message }) {
    super({ message, data });
  }
}
class Success extends SuccessResponse {
  constructor({
    message,
    data,
    status = statusCode.CREATED,
    reasonStatus = reasonStatusCode.CREATED,
  }) {
    super({ message, status, reasonStatus, data });
  }
}
module.exports = {
  Ok,
  Success,
};