import { BaseService } from "../../types/base-service.type";
import { ProductDTO } from "../../types/products.type";
class ProductService extends BaseService<ProductDTO> {
  findAllProduct = async (): Promise<ProductDTO[]> => {
    const products: ProductDTO[] = await this.find({});
    return products;
  };
}
export { ProductService };
