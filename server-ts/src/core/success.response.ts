import { Response } from "express";

const statusCode = {
  OK: 200,
  CREATED: 201,
};

const reasonStatusCode = {
  OK: "OK !",
  CREATED: "Created !",
};

class SuccessResponse<T> {
  data?: T;
  message: string;
  status: number;

  constructor({
    message = reasonStatusCode.OK,
    data,
    status = statusCode.OK,
  }: {
    message?: string;
    data?: T;
    status?: number;
  }) {
    this.data = data;
    this.message = message ? message : "OK";
    this.status = status;
  }

  send = (res: Response) => {
    return res.status(this.status).json(this);
  };
}

class Ok<T> extends SuccessResponse<T> {
  constructor({ data, message }: { data: T; message?: string }) {
    super({ message, data });
  }
}

class Success<T> extends SuccessResponse<T> {
  constructor({
    message = reasonStatusCode.OK,
    data,
    status = statusCode.CREATED,
  }: {
    message: string;
    data: T;
    status?: number;
  }) {
    super({ message, status, data });
  }
}

export { Ok, Success };
