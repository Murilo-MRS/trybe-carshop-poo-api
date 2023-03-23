import { Router, Request, Response, NextFunction } from 'express';
import MotorcycleController from '../../Controllers/MotorcycleController';
import MotorcycleODM from '../../Models/MotorcycleODM';
import MotorcycleService from '../../Services/MotorcycleService';

const routes = Router();

const motorcycleModel = new MotorcycleODM();
const motorcycleService = new MotorcycleService(motorcycleModel);
const motoController = new MotorcycleController(motorcycleService);

routes.post(
  '/',
  (req: Request, res: Response, next: NextFunction) => motoController
    .createMotorcycle(req, res, next),
);

routes.get(
  '/',
  (req: Request, res: Response, next: NextFunction) => motoController
    .getAllMotorcycles(req, res, next),
);

routes.get(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => motoController
    .getMotorcycleById(req, res, next),
);

routes.put(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => motoController
    .updateMotorcycle(req, res, next),
);

routes.delete(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => motoController
    .deleteMotorcycle(req, res, next),
);

export default routes;
