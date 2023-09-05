import { CartProductsDTO } from "./cart.type";
import { ProductsDTO } from "./products.type";

type CartProductsContextType = {
  isToggleCart: boolean;
  setIsToggleCart: React.Dispatch<React.SetStateAction<boolean>>;
  // updateCartItem: (_id: string, payload: CartProductsDTO) => Promise<void>;
  // removeCartItem: (_id: string) => Promise<void>;
  // setProducts: React.Dispatch<React.SetStateAction<ProductsDTO[]>>;
  // setCart: React.Dispatch<React.SetStateAction<CartProductsDTO[]>>;
};
export type { CartProductsContextType };
