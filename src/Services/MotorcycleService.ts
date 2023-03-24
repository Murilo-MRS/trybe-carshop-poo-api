import { isValidObjectId } from 'mongoose';
import Motorcycle from '../Domains/Motorcycle';
import AppError from '../errors/AppError';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';
import ErrorTypes from '../utils/ErrorTypes';

class MotorcycleService {
  private _model: MotorcycleODM;
  constructor(model: MotorcycleODM) {
    this._model = model;
  }

  public async createMotorcycle(data: IMotorcycle) {
    const newMotorcycle = await this._model.create(data);
    return new Motorcycle(newMotorcycle).createDomain();
  }

  public async getAllMotorcycles() {
    const allMotorcycles = await this._model.findAll();
    
    const motorcyclesArray = allMotorcycles.map((motorcycles) =>
      new Motorcycle(motorcycles).createDomain());
    
    return motorcyclesArray; 
  }

  public async findById(id: string) {
    if (!isValidObjectId(id)) throw new AppError(422, ErrorTypes.invalidMongoId);
    
    const motorcycle = await this._model.findById(id);
    if (!motorcycle) {
      throw new AppError(404, ErrorTypes.motorcyclesNotFound);
    }
    return new Motorcycle(motorcycle).createDomain();
  }

  public async update(id: string, motorcycleProperty: IMotorcycle) {
    if (!isValidObjectId(id)) throw new AppError(422, ErrorTypes.invalidMongoId);
    
    const motorcycle = await this._model.findById(id);
    if (!motorcycle) {
      throw new AppError(404, ErrorTypes.motorcyclesNotFound);
    }
    const updatedMotorcycles = await this._model.update(id, motorcycleProperty);
    return new Motorcycle(updatedMotorcycles as IMotorcycle).createDomain();
  }

  public async delete(id: string) {
    if (!isValidObjectId(id)) throw new AppError(422, ErrorTypes.invalidMongoId);
    
    const motorcycle = await this._model.findById(id);
    if (!motorcycle) {
      throw new AppError(404, ErrorTypes.motorcyclesNotFound);
    }
    
    return this._model.delete(id);
  }
}

export default MotorcycleService;
