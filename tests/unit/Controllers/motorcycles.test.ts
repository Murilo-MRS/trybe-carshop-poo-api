import Chai from 'chai';
import Sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import MotorcycleService from '../../../src/Services/MotorcycleService';
import MotorcycleController from '../../../src/Controllers/MotorcycleController';
import MotorcycleModel from '../../../src/Models/MotorcycleODM';
import { motorcyclesArray } from '../Mocks/motorcycles.mock';

Chai.use(sinonChai);

const { expect } = Chai;

describe('CAMADA CONTROLLER - motorcycles', function () {
  const baseModel = new MotorcycleModel();
  const baseService = new MotorcycleService(baseModel);
  const baseController = new MotorcycleController(baseService);

  const messageError = 'Error enviado pelo next';

  const error = new Error(messageError);

  it('Testando createMotorcycle', async function () {
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
    const next = () => {};

    const responseService = {
      id: '641c68c9549f6f09505e08a6',
      ...body,
    };

    Sinon.stub(baseService, 'createMotorcycle').resolves(responseService);

    await baseController.createMotorcycle(req as Request, res as Response, next);

    expect(res.status).to.be.calledWith(201);
    expect(res.json).to.be.calledWith(responseService);
  });

  it('Testando getMotorcycleById', async function () {
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
      model: 'Honda Cb 900f Hornet',
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    };

    Sinon.stub(baseService, 'findById').resolves(responseService);

    await baseController.getMotorcycleById(req as Request, res as Response, next);

    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.calledWith(responseService);
  });

  it('Testando getAllMotorcycles', async function () {    
    const res: Partial<Response> = {};
    const req: Partial<Request> = {};
    res.status = Sinon.stub().returns(res);
    res.json = Sinon.stub().returns({});
    const next = () => {};

    Sinon.stub(baseService, 'getAllMotorcycles').resolves(motorcyclesArray);

    await baseController.getAllMotorcycles(req as Request, res as Response, next);

    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.calledWith(motorcyclesArray);
  });

  it('Testando updateMotorcycle', async function () {    
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
    const next = () => {};

    Sinon.stub(baseService, 'update').resolves({ id: params.id, ...body });

    await baseController.updateMotorcycle(req as Request, res as Response, next);

    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.calledWith({ id: params.id, ...body });
  });

  it('Testando deleteMotorcycle', async function () {    
    const params = { id: '641c68c9549f6f09505e08a6' };
    const res: Partial<Response> = { };
    const req: Partial<Request> = { params };
    res.status = Sinon.stub().returns(res);
    res.end = Sinon.stub().returns({});
    const next = () => {};

    Sinon.stub(baseService, 'delete').resolves();

    await baseController.deleteMotorcycle(req as Request, res as Response, next);

    expect(res.status).to.be.calledWith(204);
    expect(res.end).to.callCount(1);
  });

  it('Testando execeção do createMotorcycle', async function () {  
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

    Sinon.stub(baseService, 'createMotorcycle').throws(error);

    await baseController.createMotorcycle(req as Request, res as Response, next);

    expect(next).to.be.calledWith(error);
  });

  it('Testando execeção do getMotorcycleById', async function () {    
    const res: Partial<Response> = {};
    const req: Partial<Request> = { params: { id: '641c68c9549f6f09505e08a6' } };
    res.status = Sinon.stub().returns(res);
    res.json = Sinon.stub().returns({});
    const next = Sinon.stub().returns(undefined);

    Sinon.stub(baseService, 'findById').throws(error);

    await baseController.getMotorcycleById(req as Request, res as Response, next);

    expect(next).to.be.calledWith(error);
  });

  it('Testando exceção getAllMotorcycles', async function () {    
    const res: Partial<Response> = {};
    const req: Partial<Request> = {};
    res.status = Sinon.stub().returns(res);
    res.json = Sinon.stub().returns({});
    const next = Sinon.stub().returns(undefined);

    Sinon.stub(baseService, 'getAllMotorcycles').throws(error);

    await baseController.getAllMotorcycles(req as Request, res as Response, next);

    expect(next).to.be.calledWith(error);
  });

  it('Testando exceção updateMotorcycle', async function () {    
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

    await baseController.updateMotorcycle(req as Request, res as Response, next);

    expect(next).to.be.calledWith(error);
  });

  it('Testando exceção deleteMotorcycle', async function () {    
    const params = { id: '641c68c9549f6f09505e08a6' };
    const res: Partial<Response> = { };
    const req: Partial<Request> = { params };
    res.status = Sinon.stub().returns(res);
    res.end = Sinon.stub().returns({});
    const next = Sinon.stub().returns(undefined);

    Sinon.stub(baseService, 'delete').throws(error);

    await baseController.deleteMotorcycle(req as Request, res as Response, next);

    expect(next).to.be.calledWith(error);
  });

  afterEach(function () {
    Sinon.restore();
  });
});