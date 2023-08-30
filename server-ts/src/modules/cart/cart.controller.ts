import { Response } from "express";
import { Ok } from "../../core/success.response";
import { CartService } from "./cart.service";
import { IGetUserAuthInfoRequest } from "../../types/custom.type";
import { CartProductsDTO } from "../../types/cart-products.type";
import { HelpError } from "../../helpers/helpError.helper";
import { Cart } from "./cart.model";

const cartService = new CartService(Cart);
class CartController {
  static findOne = async (req: IGetUserAuthInfoRequest, res: Response) => {
    try {
      const _id = req.user?._id!;
      const product: CartProductsDTO[] = await cartService.findOneCart({
        userId: _id,
      });
      return new Ok<CartProductsDTO[]>({
        data: product,
        message: "Get product successful !",
      }).send(res);
    } catch (error) {
      HelpError(error, res);
    }
  };
}
export { CartController };
