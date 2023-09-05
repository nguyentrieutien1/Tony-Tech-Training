import { Response } from "express";
import { ErrorResponse } from "../core/error.response";

function HelpError(err: unknown, res: Response) {
  console.log(err);
  
  let message = "Server is wrong, please access later !";
  let statusCode = 500;
  let errors = {};
  if (err instanceof ErrorResponse) {
    message = err.message || message;
    statusCode = err.status || statusCode;
    errors = err.errors || errors;
  }
  res!.status(statusCode).json({ message, statusCode, errors });
}
export { HelpError };
