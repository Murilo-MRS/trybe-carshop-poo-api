import Chai from 'chai';
import Sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import CarService from '../../../src/Services/CarService';
import CarController from '../../../src/Controllers/CarController';
import CarModel from '../../../src/Models/CarODM';
import { carsArray } from '../Mocks/cars.mock';

Chai.use(sinonChai);

const { expect } = Chai;

describe('CAMADA CONTROLLER - cars', function () {
  const baseModel = new CarModel();
  const baseService = new CarService(baseModel);
  const baseController = new CarController(baseService);

  const messageError = 'Error enviado pelo next';

  const error = new Error(messageError);

  it('Testando create', async function () {
    const body = { 
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.99,
      doorsQty: 4,
      seatsQty: 5, 
    };

    const res: Partial<Response> = {};
    const req: Partial<Request> = { body };
    res.status = Sinon.stub().returns(res);
    res.json = Sinon.stub().returns({});
    const next = () => {};

    const responseService = {
      id: '641c68c9549f6f09505e08a6',
      ...body,
    };

    Sinon.stub(baseService, 'createCar').resolves(responseService);

    await baseController.createCar(req as Request, res as Response, next);

    expect(res.status).to.be.calledWith(201);
    expect(res.json).to.be.calledWith(responseService);
  });

  it('Testando getCarById', async function () {
    const params = { 
      id: '641c68c9549f6f09505e08a6',
    };

    const res: Partial<Response> = {};
    const req: Partial<Request> = { params };
    res.status = Sinon.stub().returns(res);
    res.json = Sinon.stub().returns({});
    const next = () => {};

    const responseService = {
      id: '641c68c9549f6f09505e08a6',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.99,
      doorsQty: 4,
      seatsQty: 5, 
    };

    Sinon.stub(baseService, 'findById').resolves(responseService);

    await baseController.getCarById(req as Request, res as Response, next);

    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.calledWith(responseService);
  });

  it('Testando getAllCars', async function () {    
    const res: Partial<Response> = {};
    const req: Partial<Request> = {};
    res.status = Sinon.stub().returns(res);
    res.json = Sinon.stub().returns({});
    const next = () => {};

    Sinon.stub(baseService, 'getAllCars').resolves(carsArray);

    await baseController.getAllCars(req as Request, res as Response, next);

    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.calledWith(carsArray);
  });

  it('Testando updateCar', async function () {    
    const params = { id: '641c68c9549f6f09505e08a6' };
    const body = { 
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.99,
      doorsQty: 4,
      seatsQty: 5, 
    };
    const res: Partial<Response> = { };
    const req: Partial<Request> = { params, body };
    res.status = Sinon.stub().returns(res);
    res.json = Sinon.stub().returns({});
    const next = () => {};

    Sinon.stub(baseService, 'update').resolves({ id: params.id, ...body });

    await baseController.updateCar(req as Request, res as Response, next);

    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.calledWith({ id: params.id, ...body });
  });

  it('Testando deleteCar', async function () {    
    const params = { id: '641c68c9549f6f09505e08a6' };
    const res: Partial<Response> = { };
    const req: Partial<Request> = { params };
    res.status = Sinon.stub().returns(res);
    res.end = Sinon.stub().returns({});
    const next = () => {};

    Sinon.stub(baseService, 'delete').resolves();

    await baseController.deleteCar(req as Request, res as Response, next);

    expect(res.status).to.be.calledWith(204);
    expect(res.end).to.callCount(1);
  });

  it('Testando execeção do createCar', async function () {  
    const body = { 
      model: 'Honda Cb 800f Hornet',
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    };  
    const res: Partial<Response> = {};
    const req: Partial<Request> = { body };
    res.status = Sinon.stub().returns(res);
    res.json = Sinon.stub().returns({});
    const next = Sinon.stub().returns(undefined);

    Sinon.stub(baseService, 'createCar').throws(error);

    await baseController.createCar(req as Request, res as Response, next);

    expect(next).to.be.calledWith(error);
  });

  it('Testando execeção do getCarById', async function () {    
    const res: Partial<Response> = {};
    const req: Partial<Request> = { params: { id: '641c68c9549f6f09505e08a6' } };
    res.status = Sinon.stub().returns(res);
    res.json = Sinon.stub().returns({});
    const next = Sinon.stub().returns(undefined);

    Sinon.stub(baseService, 'findById').throws(error);

    await baseController.getCarById(req as Request, res as Response, next);

    expect(next).to.be.calledWith(error);
  });

  it('Testando exceção getAllCars', async function () {    
    const res: Partial<Response> = {};
    const req: Partial<Request> = {};
    res.status = Sinon.stub().returns(res);
    res.json = Sinon.stub().returns({});
    const next = Sinon.stub().returns(undefined);

    Sinon.stub(baseService, 'getAllCars').throws(error);

    await baseController.getAllCars(req as Request, res as Response, next);

    expect(next).to.be.calledWith(error);
  });

  it('Testando exceção updateCar', async function () {    
    const params = { id: '641c68c9549f6f09505e08a6' };
    const body = { 
      model: 'Honda Cb 600f Hornet',
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600, 
    };
    const res: Partial<Response> = { };
    const req: Partial<Request> = { params, body };
    res.status = Sinon.stub().returns(res);
    res.json = Sinon.stub().returns({});
    const next = Sinon.stub().returns(undefined);

    Sinon.stub(baseService, 'update').throws(error);

    await baseController.updateCar(req as Request, res as Response, next);

    expect(next).to.be.calledWith(error);
  });

  it('Testando exceção deleteCar', async function () {    
    const params = { id: '641c68c9549f6f09505e08a6' };
    const res: Partial<Response> = { };
    const req: Partial<Request> = { params };
    res.status = Sinon.stub().returns(res);
    res.end = Sinon.stub().returns({});
    const next = Sinon.stub().returns(undefined);

    Sinon.stub(baseService, 'delete').throws(error);

    await baseController.deleteCar(req as Request, res as Response, next);

    expect(next).to.be.calledWith(error);
  });

  afterEach(function () {
    Sinon.restore();
  });
});