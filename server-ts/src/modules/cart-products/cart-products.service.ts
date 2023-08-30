import { Types } from "mongoose";
import { BadRequestError } from "../../core/error.response";
import { CartProductsDTO } from "../../types/cart-products.type";
import { BaseService } from "../../types/base-service.type";

class CartProductsService extends BaseService<CartProductsDTO> {
  addToCart = async ({ product, quantity, cart }: CartProductsDTO) => {
    if (!product || !quantity) {
      throw new BadRequestError("Dont't have payload");
    }
    const cartProduct: CartProductsDTO = await this.create({
      cart,
      product,
      quantity,
    });
    return cartProduct;
  };
  updateCartProduct = async (
    _id: Types.ObjectId,
    quantity: Partial<CartProductsDTO>
  ): Promise<CartProductsDTO> => {
    const product = await this.findByIdAndUpdate(_id, quantity);
    return product!;
  };
  deleteCartProduct = async (cartItemId: Types.ObjectId): Promise<void> => {
    await this.findOneAndDelete(cartItemId);
  };
  findOneCart = async (
    query: Partial<CartProductsDTO>
  ): Promise<CartProductsDTO[]> => {
    return await this.find(query, "product");
  };
}
export { CartProductsService };
