import { Router } from 'express';
import carRoutes from './cars/CarsRoutes';
import motorcyclesRoutes from './motorcycles/MotoCyclesRoutes';

const routes = Router();

routes.use('/motorcycles', motorcyclesRoutes);
routes.use('/cars', carRoutes);

export default routes;
