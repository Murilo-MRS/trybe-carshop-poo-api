import express from 'express';
// import HandleGlobalError from './Middlewares/HandleGlobalError';
// import routes from './Routes';

const app = express();
app.use(express.json());
// app.use(routes);
// app.use(HandleGlobalError.handleError);

export default app;
