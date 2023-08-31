import { BaseService } from "../../core/base-service.repository";
import { ProductDTO } from "../../types/products.type";
import { Product } from "./products.model";
class ProductService extends BaseService<ProductDTO> {
  static _instance = new BaseService(Product);
  static find = async (): Promise<ProductDTO[]> => {
    const products: ProductDTO[] = await this._instance.find({});
    return products;
  };
}
export { ProductService };
