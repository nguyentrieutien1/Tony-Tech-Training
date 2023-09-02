import { BaseService } from "../../core/base-service.repository";
import { ProductsDTO } from "../../types/products.type";
import { Product } from "./products.model";
class ProductService extends BaseService<ProductsDTO> {
  static _instance = new BaseService(Product);
  static find = async (): Promise<ProductsDTO[]> => {
    const products: ProductsDTO[] = await this._instance.find({});
    return products;
  };
}
export { ProductService };
