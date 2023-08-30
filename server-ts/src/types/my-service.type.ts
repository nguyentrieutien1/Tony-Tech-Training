import { Types } from "mongoose";

interface MyService<T> {
  create(item: T): Promise<T>;
  findOne(_id: Types.ObjectId): Promise<T[]>;
  findAll(): Promise<T[]>;
  findByIdAndUpdate(_id: Types.ObjectId, data: T): Promise<T>;
  findOneAndDelete(_id: Types.ObjectId): Promise<void>;
}
export { MyService };
