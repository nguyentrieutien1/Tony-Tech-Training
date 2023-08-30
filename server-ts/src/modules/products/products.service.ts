import { BaseService } from "../../types/base-service.type";
import { ProductDTO } from "../../types/products.type";
import { Product } from "./products.model";

class ProductService extends BaseService<ProductDTO> {
  static findAll = async (): Promise<ProductDTO[]> => {
    const products: ProductDTO[] = await Product.find();
    return products;
  };
}
export { ProductService };
