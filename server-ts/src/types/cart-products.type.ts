import { Types } from "mongoose";

type CartProductsDTO = {
  cart?: Types.ObjectId;
  product?: Types.ObjectId;
  quantity: number;
};
export { CartProductsDTO };
