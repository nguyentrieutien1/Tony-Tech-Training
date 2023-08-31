import { Request, Response } from "express";
import { UserService } from "./user.service";
import { Ok, Success } from "../../core/success.response";
import { UserDTO } from "../../types/user.type";
import { HelpError } from "../../helpers/helpError.helper";
import { IGetUserAuthInfoRequest } from "../../types/custom.type";
import { Types } from "mongoose";
class UserController {
  static signUp = async (req: IGetUserAuthInfoRequest, res: Response) => {
    const { email, password } = req.body;
    try {
      const userInfo: UserDTO = await UserService.signUp({
        email,
        password,
      });
      return new Success({
        data: userInfo,
        message: "User has been created !",
      }).send(res);
    } catch (error) {
      HelpError(error, res);
    }
  };
  static signIn = async (req: IGetUserAuthInfoRequest, res: Response) => {
    const { email, password } = req.body;
    try {
      const accessToken: { accessToken: string } = await UserService.signIn({
        email,
        password,
      });
      return new Success({
        data: accessToken,
        message: "Login successful !",
      }).send(res);
    } catch (error) {
      HelpError(error, res);
    }
  };
  static getById = async (req: IGetUserAuthInfoRequest, res: Response) => {
    try {
      const _id = req.user?._id;
      const user: UserDTO = await UserService.getById(new Types.ObjectId(_id));
      return new Ok({ data: user });
    } catch (error) {
      HelpError(error, res);
    }
  };
}
export { UserController };
