import { Router } from 'express';
import carRoutes from './cars/CarsRoutes';
// import motorcyclesRoutes from './motorcycles/MotoCyclesRoutes';

const routes = Router();

routes.use('/cars', carRoutes);
// routes.use('/motorcycles', motorcyclesRoutes);

export default routes;
