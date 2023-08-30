import { Types } from "mongoose";
import { BadRequestError, NotFound } from "../../core/error.response";
import { CartProductsDTO } from "../../types/cart-products.type";
import { CartProducts } from "./cart-products.model";
import { BaseService } from "../../types/base-service.type";

class CartProductsService extends BaseService<CartProductsDTO> {
  static create = async ({ product, quantity, cart }: CartProductsDTO) => {
    if (!product || !quantity) {
      throw new BadRequestError("Dont't have payload");
    }
    const cartProduct: CartProductsDTO = await CartProducts.create({
      cart,
      product,
      quantity,
    });
    return cartProduct;
  };
  static findByIdAndUpdate = async ({
    quantity,
    cart,
  }: CartProductsDTO): Promise<CartProductsDTO> => {
    const product = await CartProducts.findById(cart);
    if (product) {
      product.quantity = quantity;
      return await product.save();
    }
    return product!;
  };
  static findOneAndDelete = async (
    cartItemId: Types.ObjectId
  ): Promise<CartProductsDTO> => {
    const product: CartProductsDTO | null =
      await CartProducts.findByIdAndDelete(cartItemId);
    if (!product) throw new NotFound("Cart item not found in your cart !");
    return product;
  };
}
export { CartProductsService };
