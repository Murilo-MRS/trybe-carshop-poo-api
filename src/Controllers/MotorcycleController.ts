import { Request, Response, NextFunction } from 'express';
import MotorcycleService from '../Services/MotorcycleService';

class MotorcycleController {
  private _service: MotorcycleService;

  constructor(service: MotorcycleService) {
    this._service = service;
  }

  public async createMotorcycle(req: Request, res: Response, next: NextFunction) {
    try {
      const newMotorcycle = await this._service.createMotorcycle(req.body);
      return res.status(201).json(newMotorcycle);
    } catch (error) {
      next(error);
    }
  }
  public async getAllMotorcycles(req: Request, res: Response, next: NextFunction) {
    try {
      const allMotorcycles = await this._service.getAllMotorcycles();
      return res.status(200).json(allMotorcycles);
    } catch (error) {
      next(error);
    }   
  }

  public async getMotorcycleById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      const motorcycle = await this._service.findById(id);
      return res.status(200).json(motorcycle);
    } catch (error) {
      next(error);
    }
  }

  public async updateMotorcycle(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      const updatedMotorcycle = await this._service.update(id, req.body);
      return res.status(200).json(updatedMotorcycle);
    } catch (error) {
      next(error);
    }
  }

  public async deleteMotorcycle(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      await this._service.delete(id);
      return res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
}

export default MotorcycleController;
