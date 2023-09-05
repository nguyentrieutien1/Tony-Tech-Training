import { ProductsApi } from "@/apis/products.api";
import { GET_ALL_PRODUCTS } from "@/types/action.type";
import { ProductsDTO } from "@/types/products.type";

class ProductsAction {
  static getAllProducts = () => {
    return async (dispatch: any) => {
      try {
        const products: ProductsDTO[] = await ProductsApi.getAll();
        dispatch({ type: GET_ALL_PRODUCTS, payload: products });
      } catch (error) {}
    };
  };
}
export { ProductsAction };
