import { isValidObjectId } from 'mongoose';
import Car from '../Domains/Car';
import AppError from '../errors/AppError';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';
import ErrorTypes from '../utils/ErrorTypes';

class CarService {
  private _model: CarODM;
  constructor(model: CarODM) {
    this._model = model;
  }

  public async createCar(data: ICar) {
    const newCar = await this._model.create(data);
    return new Car(newCar).createDomain();
  }

  public async getAllCars() {
    const allCars = await this._model.findAll();
    
    const carsArray = allCars.map((car) =>
      new Car(car).createDomain());
    
    return carsArray; 
  }

  public async findById(id: string) {
    if (!isValidObjectId(id)) throw new AppError(422, ErrorTypes.invalidMongoId);

    const car = await this._model.findById(id);
    if (!car) {
      throw new AppError(404, ErrorTypes.carNotFound);
    }
    return new Car(car).createDomain();
  }

  public async update(id: string, carProperty: ICar) {
    if (!isValidObjectId(id)) throw new AppError(422, ErrorTypes.invalidMongoId);

    const car = await this._model.findById(id);
    if (!car) {
      throw new AppError(404, ErrorTypes.carNotFound);
    }
    const updatedCar = await this._model.update(id, carProperty);
    return new Car(updatedCar as ICar).createDomain();
  }

  public async delete(id: string) {
    if (!isValidObjectId(id)) throw new AppError(422, ErrorTypes.invalidMongoId);

    const car = await this._model.findById(id);
    if (!car) {
      throw new AppError(404, ErrorTypes.carNotFound);
    }
    
    return this._model.delete(id);
  }
}

export default CarService;
