import { isValidObjectId, Model, models, Schema, UpdateQuery, model } from 'mongoose';
import AppError from '../errors/AppError';
import ErrorTypes from '../utils/ErrorTypes';

abstract class ODM<T> {
  protected model: Model<T>;
  protected schema: Schema;
  protected modelName: string;

  constructor(schema: Schema, modelName: string) {
    this.schema = schema;
    this.modelName = modelName;
    this.model = models[this.modelName] || model(this.modelName, this.schema);
  }

  public async create(obj: T): Promise<T> {
    return this.model.create({ ...obj });
  }

  public async findAll() {
    return this.model.find({});
  }
  
  public async findById(id: string) {
    if (!isValidObjectId(id)) throw new AppError(422, ErrorTypes.invalidMongoId);
    return this.model.findById(id);
  }

  public async update(id: string, obj: UpdateQuery<T>): Promise<T | null> {
    if (!isValidObjectId(id)) throw new AppError(422, ErrorTypes.invalidMongoId);

    return this.model.findByIdAndUpdate(
      id,
      obj,
      { new: true },
    );
  }

  public async delete(id: string) {
    if (!isValidObjectId(id)) throw new AppError(422, ErrorTypes.invalidMongoId);
    return this.model.findByIdAndDelete(id);
  }
}

export default ODM;
