import { Router, Request, Response, NextFunction } from 'express';
import CarController from '../../Controllers/CarController';
import CarODM from '../../Models/CarODM';
import CarService from '../../Services/CarService';

const routes = Router();

const carModel = new CarODM();
const carService = new CarService(carModel);
const carController = new CarController(carService);

routes.post(
  '/',
  (req: Request, res: Response, next: NextFunction) => carController.createCar(req, res, next),
);

routes.get(
  '/',
  (req: Request, res: Response, next: NextFunction) => carController.getAllCars(req, res, next),
);

routes.get(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => carController.getCarById(req, res, next),
);

routes.put(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => carController.updateCar(req, res, next),
);

routes.delete(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => carController.deleteCar(req, res, next),
);

export default routes;
