import { BadRequestError } from "../../core/error.response";
import { Cart } from "./cart.model";
import { CartProducts } from "./../cart-products/cart-products.model";
import { Types } from "mongoose";
import { CartDTO } from "../../types/cart.type";
import { CartProductsDTO } from "../../types/cart-products.type";
import { BaseService } from "../../types/base-service.type";
class CartService extends BaseService<CartProductsDTO> {
  static findOne = async ({
    userId,
  }: {
    userId: Types.ObjectId;
  }): Promise<CartProductsDTO[]> => {
    if (!userId) throw new BadRequestError("Missing user id");
    const cartUser: CartDTO | null = await Cart.findOne({ user: userId });
    if (!cartUser) {
      return [];
    }
    const order: CartProductsDTO[] = await CartProducts.find({
      cart: cartUser._id,
    }).populate({
      path: "product",
    });
    return order;
  };
}
export { CartService };
