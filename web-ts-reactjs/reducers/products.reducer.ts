import { GET_ALL_PRODUCTS } from "@/types/action.type";
import { ProductsDTO } from "@/types/products.type";

const initialState: ProductsDTO[] = [];

const productReducer = (
  state: ProductsDTO[] = initialState,
  action: { type: string; payload: ProductsDTO[] }
) => {
  const { type, payload } = action;
  switch (type) {


    case GET_ALL_PRODUCTS:
      state = [...payload];
      return [...state];
    
    
    default:
      return [...state];
  }
};
export { productReducer };
