import { CartDTO } from "./cart.type";
import { ProductDTO } from "./products.type";

type CartProductsContextType = {
  products: ProductDTO[];
  cart: CartDTO[];
  isToggleCart: boolean;
  create: (item: CartDTO) => Promise<CartDTO>;
  update: (_id: string, payload: CartDTO) => Promise<void>;
  remove: (_id: string) => Promise<void>;
  setIsToggleCart: React.Dispatch<React.SetStateAction<boolean>>;
  setProducts: React.Dispatch<React.SetStateAction<ProductDTO[]>>;
  setCart: React.Dispatch<React.SetStateAction<CartDTO[]>>;
};
export type { CartProductsContextType };
