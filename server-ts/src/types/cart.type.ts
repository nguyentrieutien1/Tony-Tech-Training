import { Types } from "mongoose";

type CartProductsDTO = {
  _id: Types.ObjectId;
  user: Types.ObjectId;
};
export { CartProductsDTO };
