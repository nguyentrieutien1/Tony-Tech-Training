import { products } from "../data/products.js";
import { toInt } from "../utils/coverToInt.js";
import { cart } from "../global/state.js";
export const totalPrice = (option) => {
  const id = option?.id ? option?.id : undefined;
  const other_price = option?.other_price ? option?.other_price : [];
  let total__price = 0;
  if (id) {
    const find_product_data = products?.find(
      (product) => toInt(product?.id) == toInt(id)
    );
    const find_product_local = cart?.find(
      (product) => toInt(product?.id) == toInt(id)
    );
    total__price = other_price?.reduce((prevPrice, currentPrice) => {
      prevPrice += currentPrice;
      return prevPrice;
    }, find_product_data?.product_price * find_product_local?.quantity);
  } else {
    total__price = cart?.reduce((prevItem, currentItem) => {
      const find__product = products.find(
        (product) => toInt(product?.id) == toInt(currentItem?.id)
      );
      prevItem += currentItem?.quantity * find__product?.product_price;
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
