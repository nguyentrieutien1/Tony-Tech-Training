import { BadRequestError, NotFound } from "../../core/error.response";
import { CartProducts } from "./../cart-products/cart-products.model";
import { Model, Types } from "mongoose";
import { CartDTO } from "../../types/cart.type";
import { CartProductsDTO } from "../../types/cart-products.type";
import { BaseService } from "../../types/base-service.type";
import { CartProductsService } from "../cart-products/cart-products.service";
class CartService extends BaseService<CartDTO> {
  findOneCart = async ({
    userId,
  }: {
    userId: Types.ObjectId;
  }): Promise<CartProductsDTO[]> => {
    if (!userId) throw new BadRequestError("Missing user id");
    const cartUser: CartDTO | null = await this.findOne({ user: userId });
    if (!cartUser) {
      return [];
    }
    const cartProductsService = new CartProductsService(CartProducts);
    const order: CartProductsDTO[] = await cartProductsService.findOneCart({
      cart: cartUser._id,
    });
    return order;
  };
}
export { CartService };
