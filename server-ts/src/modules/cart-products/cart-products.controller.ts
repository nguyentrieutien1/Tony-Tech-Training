import { Response } from "express";
import { IGetUserAuthInfoRequest } from "../../types/custom.type";
import { CartProductsService } from "./cart-products.service";
import { Ok, Success } from "../../core/success.response";
import { Types } from "mongoose";
import { HelpError } from "../../helpers/helpError.helper";
import { CartProducts } from "./cart-products.model";

const cartProductsService = new CartProductsService(CartProducts);
class CartProductsController {
  static create = async (req: IGetUserAuthInfoRequest, res: Response) => {
    try {
      const { productId, quantity } = req.body;
      const cartId = req.cartId!;
      const cartItem: CartProductsController =
        await cartProductsService.addToCart({
          product: productId,
          quantity,
          cart: cartId,
        });
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
        await cartProductsService.updateCartProduct(new Types.ObjectId(id), {
          quantity,
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
      await cartProductsService.deleteCartProduct(new Types.ObjectId(id));
      return new Ok<unknown>({ data: null }).send(res);
    } catch (error) {
      HelpError(error, res);
    }
  };
}
export { CartProductsController };
