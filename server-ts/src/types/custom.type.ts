import { Request } from "express";
import { Types } from "mongoose";
interface IGetUserAuthInfoRequest extends Request {
  user?: {
    _id: Types.ObjectId;
  }; // or any other type
  cartId?: Types.ObjectId;
}
export { IGetUserAuthInfoRequest };
