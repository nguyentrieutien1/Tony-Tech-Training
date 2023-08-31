import { ProductDTO } from "./products.type";

type CartDTO = {
  _id: string;
  quantity: number;
  product: ProductDTO;
};
export type { CartDTO };
