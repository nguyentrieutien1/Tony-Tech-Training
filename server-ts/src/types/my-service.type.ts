import { Types } from "mongoose";

interface IRepository<T> {
  create(item: T): Promise<T>;
  findOne(query: Partial<T>, populateOptions: string): Promise<T | null>;
  findById(_id: Types.ObjectId): Promise<T | null>;
  findByIdAndUpdate(_id: Types.ObjectId, data: T): Promise<T | null>;
  findByIdAndDelete(_id: Types.ObjectId): Promise<void>;
  find(query: Partial<T>): Promise<T[]>;
}
export { IRepository };
