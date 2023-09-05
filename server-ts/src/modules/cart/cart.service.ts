import { BadRequestError, NotFound } from "../../core/error.response";
import { Types } from "mongoose";
import { CartProductsDTO } from "../../types/cart-products.type";
import { BaseService } from "../../core/base-service.repository";
import { CartProductsService } from "../cart-products/cart-products.service";
import { Cart } from "./cart.model";
class CartService extends BaseService<CartProductsDTO> {
  static _instance = new BaseService(Cart);
  static findOne = async ({
    userId,
  }: {
    userId: Types.ObjectId;
  }): Promise<CartProductsDTO[]> => {
    if (!userId) throw new BadRequestError("Missing user id");
    const cartUser: CartProductsDTO | null = await this._instance.findOne({
      user: userId,
    });
    if (!cartUser) {
      return [];
    }
    const order: CartProductsDTO[] = await CartProductsService.findOneCart({
      cart: cartUser._id,
    });
    return order;
  };
}
export { CartService };
