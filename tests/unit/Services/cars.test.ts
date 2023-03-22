import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import ICar from '../../../src/Interfaces/ICar';
import CarsService from '../../../src/Services/CarService';
import Car from '../../../src/Domains/Vehicles/Car';

describe('Testes rota car', function () {
  it('Deveria cadastar um carro com SUCESSO', async function () {
    // Arrange
    const carInput: ICar = {
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    };
    const carOutput: Car = new Car({
      id: '6348513f34c397abcad040b2',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    });
    sinon.stub(Model, 'create').resolves(carOutput);

    // Act
    const service = new CarsService();
    const result = await service.createCar(carInput);

    // Assert
    expect(result).to.be.deep.equal(carOutput);
    sinon.restore();
  });
  
  // afterEach(function () {
  //   sinon.restore();
  // });
});