import { Request, Errback, Response, NextFunction } from "express";
import { ErrorResponse } from "../core/error.response";

function errorHandler(err: Errback, req: Request, res: Response) {
  let statusCode = 500;
  let message = "Internal Server Error";

  if (err instanceof ErrorResponse) {
    message = err.message || message;
    statusCode = err.status || statusCode;
  }

  res.status(statusCode).json({ message, statusCode });
}
export { errorHandler };
