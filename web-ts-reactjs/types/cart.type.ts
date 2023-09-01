import { ProductDTO } from "./products.type";

type CartDTO = {
  _id?: string;
  quantity: number;
  productId?: string;
  product?: ProductDTO;
};
export type { CartDTO };
