import { CartProductsDTO } from "./cart.type";
import { ProductsDTO } from "./products.type";

type CartProductsContextType = {
  products: ProductsDTO[];
  cart: CartProductsDTO[];
  isToggleCart: boolean;
  create: (item: CartProductsDTO) => Promise<void>;
  update: (
    _id: string,
    type: number,
    payload: CartProductsDTO
  ) => Promise<void>;
  remove: (_id: string) => Promise<void>;
  setIsToggleCart: React.Dispatch<React.SetStateAction<boolean>>;
  setProducts: React.Dispatch<React.SetStateAction<ProductsDTO[]>>;
  setCart: React.Dispatch<React.SetStateAction<CartProductsDTO[]>>;
};
export type { CartProductsContextType };
