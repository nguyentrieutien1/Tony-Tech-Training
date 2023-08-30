import { IGetUserAuthInfoRequest } from "../types/custom.type";
import { Unauthorized } from "../core/error.response";
import JWT from "jsonwebtoken";
import { Types } from "mongoose";
import { NextFunction, Response } from "express";
const checkAuth = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const accessToken = req.headers["authorization"]?.split(" ")[1];
    if (!accessToken) {
      throw new Unauthorized("Unauthorized !", { accessToken });
    }
    const decode = JWT.verify(accessToken, process.env.PRIVATE_KEY!) as {
      _id: Types.ObjectId;
    };
    if (!decode) throw new Unauthorized("Unauthorized !");
    req.user = decode;
    next();
  } catch (error) {
    next(error);
  }
};
export { checkAuth };
