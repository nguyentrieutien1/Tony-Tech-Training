import { combineReducers } from "redux";
import { productReducer } from "./products.reducer";
import { cartProductsReducer } from "./cart-products.reducer";
const rootReducer = combineReducers({
  productReducer,
  cartProductsReducer,
});

export default rootReducer;
