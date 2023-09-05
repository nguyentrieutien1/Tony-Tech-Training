import { apiClient } from "@/config/axios.config";
import { CartProductsDTO } from "@/types/cart.type";
import { ProductsDTO } from "@/types/products.type";

class CartProductsApi {
  static getAll = async (): Promise<CartProductsDTO[]> => {
    const res = await apiClient.get("/cart/my_cart");
    const { data }: { data: CartProductsDTO[] } = res.data;
    return data;
  };
  static create = async (item: CartProductsDTO): Promise<CartProductsDTO> => {
    const res = await apiClient.post("/cart-products", item);
    const { data }: { data: CartProductsDTO } = res.data;
    return data;
  };
  static update = async (
    _id: string,
    payload: CartProductsDTO
  ): Promise<void> => {
    await apiClient.put(`/cart-products/${_id}`, payload);
  };
  static remove = async (_id: string): Promise<void> => {
    await apiClient.delete(`/cart-products/${_id}`);
  };
}
export { CartProductsApi };
