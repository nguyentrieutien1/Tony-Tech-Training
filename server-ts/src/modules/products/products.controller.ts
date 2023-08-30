import { Request, Response } from "express";
import { Ok } from "../../core/success.response";
import { ProductService } from "./products.service";
import { ProductDTO } from "../../types/products.type";
import { HelpError } from "../../helpers/helpError.helper";
import { Product } from "./products.model";

const productService = new ProductService(Product);
class ProductController {
  static findAll = async (req: Request, res: Response) => {
    try {
      const products: ProductDTO[] = await productService.findAllProduct();
      return new Ok<ProductDTO[]>({
        data: products,
        message: "Get all product successful !",
      }).send(res);
    } catch (error) {
      HelpError(error, res);
    }
  };
}
export { ProductController };
