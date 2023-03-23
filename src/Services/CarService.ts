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

  private createCarDomain(car: ICar): Car {
    return new Car(car);
  }

  public async createCar(data: ICar) {
    const newCar = await this._model.create(data);
    return this.createCarDomain(newCar);
  }

  public async getAllCars() {
    const allCars = await this._model.findAll();
    
    const carsArray = allCars.map((car) =>
      this.createCarDomain(car));
    
    return carsArray; 
  }

  public async findById(id: string) {
    const car = await this._model.findById(id);
    if (!car) {
      throw new AppError(404, ErrorTypes.carNotFound);
    }
    return this.createCarDomain(car);
  }

  public async update(id: string, carProperty: ICar) {
    const car = await this._model.findById(id);
    if (!car) {
      throw new AppError(404, ErrorTypes.carNotFound);
    }

    return this._model.update(id, carProperty);
  }

  public async delete(id: string) {
    const car = await this._model.findById(id);
    if (!car) {
      throw new AppError(404, ErrorTypes.carNotFound);
    }
    
    return this._model.delete(id);
  }
}

export default CarService;
