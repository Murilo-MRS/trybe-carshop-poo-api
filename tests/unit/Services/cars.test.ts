import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import ICar from '../../../src/Interfaces/ICar';
import CarService from '../../../src/Services/CarService';
import Car from '../../../src/Domains/Car';
import CarODM from '../../../src/Models/CarODM';
import AppError from '../../../src/errors/AppError';
import ErrorTypes from '../../../src/utils/ErrorTypes';

describe('Testes rota cars:', function () {
  describe('Caminho com Sucesso', function () {
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
      const carOutput = new Car({
        id: '6348513f34c397abcad040b2',
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.990,
        doorsQty: 4,
        seatsQty: 5,
      }).createDomain();
      sinon.stub(Model, 'create').resolves(carOutput);
      // Act
      const service = new CarService(new CarODM());
      const result = await service.createCar(carInput);
      // Assert
      expect(result).to.be.deep.equal(carOutput);
    });

    it('Deveria listar todos os carros com SUCESSO', async function () {
    // Arrange
      const inputCarArray = [{
        id: '6348513f34c397abcad040b2',
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.990,
        doorsQty: 4,
        seatsQty: 5,
      }];
      const outputCarArray = inputCarArray.map((car) => new Car(car).createDomain());
      sinon.stub(Model, 'find').resolves(outputCarArray);
      // Act
      const service = new CarService(new CarODM());
      const result = await service.getAllCars();
      // Assert
      expect(result).to.be.deep.equal(outputCarArray);
    });
    it('Deveria listar carro por id com SUCESSO', async function () {
      // Arrange
      const outputCarArray = new Car({
        id: '6348513f34c397abcad040b2',
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.990,
        doorsQty: 4,
        seatsQty: 5,
      }).createDomain();
      sinon.stub(Model, 'findById').resolves(outputCarArray);
      // Act
      const service = new CarService(new CarODM());
      const result = await service.findById('6348513f34c397abcad040b2');
      // Assert
      expect(result).to.be.deep.equal(outputCarArray);
    });
    it('Deveria atualizar os valores do carro por id com SUCESSO', async function () {
      // Arrange
      const inputCar: ICar = {
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.990,
        doorsQty: 4,
        seatsQty: 5,
      };
      const outputCarArray = new Car({
        id: '6348513f34c397abcad040b2',
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.990,
        doorsQty: 4,
        seatsQty: 5,
      }).createDomain();
      sinon.stub(Model, 'findById').resolves(outputCarArray);
      sinon.stub(Model, 'findByIdAndUpdate').resolves(outputCarArray);
      // Act
      const service = new CarService(new CarODM());
      const result = await service.update('6348513f34c397abcad040b2', inputCar);
      // Assert
      expect(result).to.be.deep.equal(outputCarArray);
    });
    it('Deveria deleta o carro por id com SUCESSO', async function () {
      // Arrange
      const outputCarArray = new Car({
        id: '6348513f34c397abcad040b2',
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.990,
        doorsQty: 4,
        seatsQty: 5,
      }).createDomain();
      sinon.stub(Model, 'findById').resolves(outputCarArray);
      sinon.stub(Model, 'findByIdAndDelete').resolves({ n: 1, deletedCount: 1, ok: 1 });
      // Act
      const service = new CarService(new CarODM());
      const result = await service.delete('6348513f34c397abcad040b2');
      // Assert
      expect(result).to.be.haveOwnProperty('n');
      expect(result).to.be.haveOwnProperty('deletedCount');
    });
    afterEach(function () {
      sinon.restore();
    });
  });
  describe('findById', function () {
    it('findById - Lançar excessão com Mongo Id inválido', async function () {
      // Arrange
      sinon.stub(Model, 'findById').resolves(null);
      // Act
      try {
        const service = new CarService(new CarODM());
        await service.findById('Inválido');
      } catch (error) {
        // Assert
        expect((error as AppError).message).to.equal(ErrorTypes.invalidMongoId);
      }
    });
    it('findById - Lançar excessão com Id inexistente', async function () {
      // Arrange
      sinon.stub(Model, 'findById').resolves(null);
      // Act
      try {
        const service = new CarService(new CarODM());
        await service.findById('6348513f34c397abcad040b2');
      } catch (error) {
        // Assert
        expect((error as AppError).message).to.equal(ErrorTypes.carNotFound);
      }
    });
    afterEach(function () {
      sinon.restore();
    });
  });
  describe('update', function () {
    const inputCar = {
      id: '6348513f34c397abcad040b2',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    };
    it('update - Lançar excessão com Mongo Id inválido', async function () {
      // Arrange
      sinon.stub(Model, 'findByIdAndUpdate').resolves(null);
      // Act
      try {
        const service = new CarService(new CarODM());
        await service.update('Inválido', inputCar);
      } catch (error) {
        // Assert
        expect((error as AppError).message).to.equal(ErrorTypes.invalidMongoId);
      }
    });
    it('update - Lançar excessão com Id inexistente', async function () {
      // Arrange
      sinon.stub(Model, 'findById').resolves(null);
      sinon.stub(Model, 'findByIdAndUpdate').resolves(null);
      // Act
      try {
        const service = new CarService(new CarODM());
        await service.update('6348513f34c397abcad040b2', inputCar);
      } catch (error) {
        // Assert
        expect((error as AppError).message).to.equal(ErrorTypes.carNotFound);
      }
    });
    afterEach(function () {
      sinon.restore();
    });
  });
  describe('delete', function () {
    it('delete - Lançar excessão com Mongo Id inválido', async function () {
      // Arrange
      sinon.stub(Model, 'findByIdAndDelete').resolves(null);
      // Act
      try {
        const service = new CarService(new CarODM());
        await service.delete('Inválido');
      } catch (error) {
        // Assert
        expect((error as AppError).message).to.equal(ErrorTypes.invalidMongoId);
      }
    });
    it('delete - Lançar excessão com Id inexistente', async function () {
      // Arrange
      sinon.stub(Model, 'findById').resolves(null);
      sinon.stub(Model, 'findByIdAndDelete').resolves(null);
      // Act
      try {
        const service = new CarService(new CarODM());
        await service.delete('6348513f34c397abcad040b2');
      } catch (error) {
        // Assert
        expect((error as AppError).message).to.equal(ErrorTypes.carNotFound);
      }
    });
    afterEach(function () {
      sinon.restore();
    });
  });
});
