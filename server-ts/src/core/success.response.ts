import { Response } from "express";

const statusCode = {
  OK: 200,
  CREATED: 201,
};
const reasonStatusCode = {
  OK: "OK !",
  CREATED: "Created !",
};
class SuccessResponse {
  data: any;
  message: string;
  status: number;
  constructor({
    message = reasonStatusCode.OK,
    data = [],
    status = statusCode.OK,
  }) {
    this.data = data;
    this.message = message ? message : "OK";
    this.status = status;
  }
  send = (res: Response) => {
    return res.status(this.status).json(this);
  };
}
class Ok extends SuccessResponse {
  constructor({ data, message }: { data: any; message?: string }) {
    super({ message, data });
  }
}
class Success extends SuccessResponse {
  constructor({
    message = reasonStatusCode.OK,
    data,
    status = statusCode.CREATED,
  }: {
    message: string;
    data: any;
    status?: number;
  }) {
    super({ message, status, data });
  }
}
export { Ok, Success };
