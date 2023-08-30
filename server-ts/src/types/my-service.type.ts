import { Types } from "mongoose";

interface IRepository<T> {
  create(item: T): Promise<T>;
  findOne(query: Partial<T>): Promise<T | null>;
  findByIdAndUpdate(_id: Types.ObjectId, data: T): Promise<T | null>;
  findOneAndDelete(_id: Types.ObjectId): Promise<void>;
  find(query: Partial<T>): Promise<T[]>;
}
export { IRepository };
