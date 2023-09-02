import { ProductsDTO } from "./products.type";

type CartProductsDTO = {
  _id?: string;
  quantity: number;
  productId?: string;
  product?: ProductsDTO;
};
export type { CartProductsDTO };
