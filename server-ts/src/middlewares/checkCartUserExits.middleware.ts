import { NextFunction, Request, Response } from "express";
import { Cart } from "../modules/cart/cart.model";
import { IGetUserAuthInfoRequest } from "../types/custom.type";
import { CartProductsDTO } from "../types/cart.type";
import { HelpError } from "../helpers/helpError.helper";
const checkCartUserExits = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const _id = req.user?._id;
    const findCartUser: CartProductsDTO | null = await Cart.findOne({
      user: _id,
    });
    if (!findCartUser) {
      const cartUser = new Cart({ user: _id });
      await cartUser.save();
      req.cartId = cartUser._id;
    } else {
      req.cartId = findCartUser?._id;
    }
    next();
  } catch (error) {
    HelpError(error, res);
  }
};

export { checkCartUserExits };
