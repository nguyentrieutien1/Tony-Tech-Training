import { Types } from "mongoose";

type CartDTO = {
  _id: Types.ObjectId;
  user: Types.ObjectId;
};
export { CartDTO };
