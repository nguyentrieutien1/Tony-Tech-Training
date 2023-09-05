import { Types } from "mongoose";

type CartProductsDTO = {
  _id?: any;
  cart?: Types.ObjectId;
  product?: Types.ObjectId;
  quantity?: number;
};
export { CartProductsDTO };
