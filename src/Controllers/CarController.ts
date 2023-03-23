import { Request, Response, NextFunction } from 'express';
import CarService from '../Services/CarService';

class CarController {
  private _service: CarService;

  constructor(service: CarService) {
    this._service = service;
  }

  public async createCar(req: Request, res: Response, next: NextFunction) {
    try {
      const newCar = await this._service.createCar(req.body);
      return res.status(201).json(newCar);
    } catch (error) {
      next(error);
    }
  }
  public async getAllCars(req: Request, res: Response, next: NextFunction) {
    try {
      const allCars = await this._service.getAllCars();
      return res.status(200).json(allCars);
    } catch (error) {
      next(error);
    }   
  }

  public async getCarById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      const car = await this._service.findById(id);
      return res.status(200).json(car);
    } catch (error) {
      next(error);
    }
  }

  public async updateCar(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      const updatedCar = await this._service.update(id, req.body);
      return res.status(200).json(updatedCar);
    } catch (error) {
      next(error);
    }
  }

  public async deleteCar(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      await this._service.delete(id);
      return res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
}

export default CarController;
