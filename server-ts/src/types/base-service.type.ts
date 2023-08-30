import { Types } from "mongoose";
import { MyService } from "./my-service.type";

abstract class BaseService<T> implements MyService<T> {
  create(item: T): Promise<T> {
    throw new Error("Method not implemented.");
  }
  findOne(_id: Types.ObjectId): Promise<T[]> {
    throw new Error("Method not implemented.");
  }
  findAll(): Promise<T[]> {
    throw new Error("Method not implemented.");
  }
  findByIdAndUpdate(item: T): Promise<T> {
    throw new Error("Method not implemented.");
  }
  findOneAndDelete(_id: Types.ObjectId): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
export { BaseService };
