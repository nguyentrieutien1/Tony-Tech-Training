import { Types } from "mongoose";
import { BadRequestError } from "../../core/error.response";
import { CartProductsDTO } from "../../types/cart-products.type";
import { BaseService } from "../../core/base-service.repository";
import { CartProducts } from "./cart-products.model";

class CartProductsService extends BaseService<CartProductsDTO> {
  static _instance = new BaseService(CartProducts);
  static create = async ({ product, quantity, cart }: CartProductsDTO) => {
    if (!product || !quantity) {
      throw new BadRequestError("Dont't have payload");
    }
    const cartProduct: CartProductsDTO = await this._instance.create({
      cart,
      product,
      quantity,
    });
    return cartProduct;
  };
  static findByIdAndUpdate = async (
    _id: Types.ObjectId,
    quantity: Partial<CartProductsDTO>
  ): Promise<CartProductsDTO> => {
    const product = await this._instance.findByIdAndUpdate(_id, quantity);
    return product!;
  };
  static findByIdAndDelete = async (
    cartItemId: Types.ObjectId
  ): Promise<void> => {
    await this._instance.findByIdAndDelete(cartItemId);
  };
  static findOneCart = async (
    query: Partial<CartProductsDTO>
  ): Promise<CartProductsDTO[]> => {
    return await this._instance.find(query, "product");
  };
}
export { CartProductsService };
