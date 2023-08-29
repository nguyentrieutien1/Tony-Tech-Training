import { Request, Response } from "express";
import { Ok } from "../../core/success.response";
import { ProductService } from "./products.service";
import { ProductDTO } from "../../types/products.type";
import { HelpError } from "../../helpers/helpError.helper";

class ProductController {
  static findAll = async (req: Request, res: Response) => {
    try {
      const products: ProductDTO[] = await ProductService.findAll();
      return new Ok({
        data: products,
        message: "Get all product successful !",
      }).send(res);
    } catch (error) {
      HelpError(error, res);
    }
  };
}
export { ProductController };
