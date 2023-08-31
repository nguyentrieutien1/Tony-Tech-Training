import { Model, Types } from "mongoose";
import { IRepository } from "../types/my-service.type";
import { NotFound } from "./error.response";
class BaseService<T> implements IRepository<T> {
  protected model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }
  async create(item: Partial<T>): Promise<T> {
    return await this.model.create(item);
  }
  async find(query: Partial<T>, populateOptions?: string): Promise<T[]> {
    if (populateOptions) {
      return await this.model.find(query).populate(populateOptions);
    }
    return await this.model.find(query).exec();
  }

  async findOne(query: Partial<T>): Promise<T | null> {
    return await this.model.findOne(query).exec();
  }

  async findById(_id: Types.ObjectId): Promise<T | null> {
    return await this.model.findById(_id).exec();
  }
  async findByIdAndUpdate(
    _id: Types.ObjectId,
    item: Partial<T>
  ): Promise<T | null> {
    return (await this.model
      .findByIdAndUpdate(_id, item, { new: true })
      .exec()) as unknown as T | null;
  }

  async findByIdAndDelete(_id: Types.ObjectId): Promise<void> {
    const result = await this.model.findByIdAndDelete(_id).exec();
    if (!result) throw new NotFound();
  }
}
export { BaseService };
