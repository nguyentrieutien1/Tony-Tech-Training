import { Response } from "express";
import { IGetUserAuthInfoRequest } from "../../types/custom.type";
import { CartProductsService } from "./cart-products.service";
import { Ok, Success } from "../../core/success.response";
import { errorHandler } from "../../middlewares/error.middleware";
import { Types } from "mongoose";
import { CartProductsDTO } from "../../types/cart-products.type";
import { HelpError } from "../../helpers/helpError.helper";

class CartProductsController {
  static create = async (req: IGetUserAuthInfoRequest, res: Response) => {
    try {
      const { productId, quantity } = req.body;
      const cartId = req.cartId!;
      const cartItem: CartProductsController = await CartProductsService.create(
        {
          product: productId,
          quantity,
          cart: cartId,
        }
      );
      return new Success<CartProductsController>({
        message: "Cart item has been created !",
        data: cartItem,
      }).send(res);
    } catch (error) {
      HelpError(error, res);
    }
  };
  static findByIdAndUpdate = async (
    req: IGetUserAuthInfoRequest,
    res: Response
  ) => {
    try {
      const { id } = req.params;
      const { quantity } = req.body;
      const product: CartProductsController =
        await CartProductsService.findByIdAndUpdate({
          quantity,
          cart: new Types.ObjectId(id),
        });
      return new Ok<CartProductsController>({ data: product }).send(res);
    } catch (error) {
      HelpError(error, res);
    }
  };
  static findByIdAndDelete = async (
    req: IGetUserAuthInfoRequest,
    res: Response
  ) => {
    try {
      const { id } = req.params;
      const result: CartProductsDTO =
        await CartProductsService.findOneAndDelete(new Types.ObjectId(id));
      return new Ok<CartProductsDTO>({ data: result }).send(res);
    } catch (error) {
      HelpError(error, res);
    }
  };
}
export { CartProductsController };
