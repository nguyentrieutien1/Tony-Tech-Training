import { cartState, productState } from "../global/state.js";
import { toInt } from "./covertToInt.js";
export const totalPrice = async (option) => {
  const id = option?._id ? option?._id : undefined;
  const other_price = option?.other_price ? option?.other_price : [];
  let total__price = 0;
  if (id) {
    const find_product_data = productState?.find(
      (product) => toInt(product?._id) == toInt(id)
    );
    const find_product_local = cartState?.find(
      (product) => toInt(product?._id) == toInt(id)
    );
    total__price = other_price?.reduce((prevPrice, currentPrice) => {
      prevPrice += currentPrice;
      return prevPrice;
    }, find_product_data?.product_price * find_product_local?.quantity);
  } else {
    total__price = cartState?.reduce((prevItem, currentItem) => {
      prevItem +=
        toInt(currentItem?.quantity) *
        toInt(currentItem?.product?.product_price);
      return prevItem;
    }, 0);
    if (option?.total__price?.length > 0) {
      total__price = other_price.reduce((prevPrice, currentPrice) => {
        prevPrice += currentPrice;
        return prevPrice;
      }, total__price);
    }
    return total__price?.toFixed(2) || 0;
  }
  return total__price?.toFixed(2) || 0;
};
