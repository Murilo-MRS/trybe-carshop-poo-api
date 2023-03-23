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
}

export default CarController;
