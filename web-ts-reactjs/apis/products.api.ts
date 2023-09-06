import { ProductsDTO } from "@/types/products.type";
import { apiClient } from "./../config/axios.config";
class ProductsApi {
  static getAll = async () => {
    const res = await apiClient.get("/products");
    const { data }: { data: ProductsDTO[] } = res.data;
    return data;
  };
}
export { ProductsApi };
