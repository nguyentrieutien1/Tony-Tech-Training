import { Request, Response } from "express";
import { UserService } from "./user.service";
import { Success } from "../../core/success.response";
import { UserDTO } from "../../types/user.type";
import { HelpError } from "../../helpers/helpError.helper";
import { BadRequestError } from "../../core/error.response";

class UserController {
  static signUp = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      const userInfo: UserDTO = await UserService.signUp({ email, password });
      return new Success({
        data: userInfo,
        message: "User has been created !",
      }).send(res);
    } catch (error) {
      HelpError(error, res);
    }
  };
  static signIn = async (req: Request, res: Response) => {
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
}
export { UserController };
