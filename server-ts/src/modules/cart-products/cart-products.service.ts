import { Types } from "mongoose";
import { BadRequestError, NotFound } from "../../core/error.response";
import { CartProductsDTO } from "../../types/cart-products.type";
import { CartProducts } from "./cart-products.model";

class CartProductsService {
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
    cartItem,
  }: {
    quantity: number;
    cartItem: Types.ObjectId;
  }): Promise<CartProductsDTO> => {
    const product = await CartProducts.findById(cartItem);
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
