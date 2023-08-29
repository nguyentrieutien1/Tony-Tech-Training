import { NextFunction, Response } from "express";
import { ErrorResponse, Unauthorized } from "../core/error.response";
import { CartProducts } from "../modules/cart-products/cart-products.model";
import { Cart } from "../modules/cart/cart.model";
import { IGetUserAuthInfoRequest } from "../types/custom.type";
import { HelpError } from "../helpers/helpError.helper";
const checkCartPermission = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const _id = req.user?._id;
    const { id } = req.params;
    const cart = await Cart.findOne({ user: _id });
    if (!cart) throw new Unauthorized();
    const cartItem = await CartProducts.findOne({ _id: id, cart: cart._id });
    if (!cartItem) throw new Unauthorized();
    return next();
  } catch (error) {}
};
export { checkCartPermission };
