import { Types } from "mongoose";

type ProductDTO = {
  _id: Types.ObjectId;
  id: number;
  image: string;
  product_name: string;
  product_title: string;
  product_price: string;
};
export { ProductDTO };