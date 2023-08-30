import { Types } from "mongoose";
import { MyService } from "./my-service.type";

abstract class BaseService<T> implements MyService<T> {
  create(item: T): Promise<T> {
    return Promise.resolve(item);
  }
  findOne(_id: Types.ObjectId): Promise<T[]> {
    return Promise.resolve([]);
  }

  findAll(): Promise<T[]> {
    return Promise.resolve([]);
  }

  findByIdAndUpdate(_id: Types.ObjectId, data: T): Promise<T> {
    return Promise.resolve(data);
  }

  findOneAndDelete(_id: Types.ObjectId): Promise<void> {
    return Promise.resolve();
  }
}
export { BaseService };