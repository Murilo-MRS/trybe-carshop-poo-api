import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import MotorcycleService from '../../../src/Services/MotorcycleService';
import Motorcycle from '../../../src/Domains/Motorcycle';
import MotorcycleODM from '../../../src/Models/MotorcycleODM';
import AppError from '../../../src/errors/AppError';
import ErrorTypes from '../../../src/utils/ErrorTypes';

describe('CAMADA SERVICE - motorcycles:', function () {
  const modelMotorcycle = 'Honda Cb 600f Hornet';
  describe('Caminho com Sucesso', function () {
    it('Deveria cadastar um moto com SUCESSO', async function () {
    // Arrange
      const motorcycleInput: IMotorcycle = {
        model: modelMotorcycle,
        year: 2005,
        color: 'Yellow',
        status: true,
        buyValue: 30.000,
        category: 'Street',
        engineCapacity: 600,
      };
      const motorcycleOutput: IMotorcycle = new Motorcycle({
        id: '6348513f34c397abcad040b2',
        model: modelMotorcycle,
        year: 2005,
        color: 'Yellow',
        status: true,
        buyValue: 30.000,
        category: 'Street',
        engineCapacity: 600,
      }).createDomain();
      sinon.stub(Model, 'create').resolves(motorcycleOutput);
      // Act
      const service = new MotorcycleService(new MotorcycleODM());
      const result = await service.createMotorcycle(motorcycleInput);
      // Assert
      expect(result).to.be.deep.equal(motorcycleOutput);
    });

    it('Deveria listar todas as motos com SUCESSO', async function () {
    // Arrange
      const inputMotorcycleArray = [{
        id: '6348513f34c397abcad040b2',
        model: modelMotorcycle,
        year: 2005,
        color: 'Yellow',
        status: true,
        buyValue: 30.000,
        category: 'Street',
        engineCapacity: 600,
      }];
      const outputMotorcycleArray = inputMotorcycleArray
        .map((car) => new Motorcycle(car).createDomain());
      sinon.stub(Model, 'find').resolves(outputMotorcycleArray);
      // Act
      const service = new MotorcycleService(new MotorcycleODM());
      const result = await service.getAllMotorcycles();
      // Assert
      expect(result).to.be.deep.equal(outputMotorcycleArray);
    });
    it('Deveria listar moto por id com SUCESSO', async function () {
      // Arrange
      const outputMotorcycleArray = new Motorcycle({
        id: '6348513f34c397abcad040b2',
        model: modelMotorcycle,
        year: 2005,
        color: 'Yellow',
        status: true,
        buyValue: 30.000,
        category: 'Street',
        engineCapacity: 600,
      }).createDomain();
      sinon.stub(Model, 'findById').resolves(outputMotorcycleArray);
      // Act
      const service = new MotorcycleService(new MotorcycleODM());
      const result = await service.findById('6348513f34c397abcad040b2');
      // Assert
      expect(result).to.be.deep.equal(outputMotorcycleArray);
    });
    it('Deveria atualizar os valores de moto por id com SUCESSO', async function () {
      // Arrange
      const inputMotorcycle: IMotorcycle = {
        model: modelMotorcycle,
        year: 2005,
        color: 'Yellow',
        status: true,
        buyValue: 30.000,
        category: 'Street',
        engineCapacity: 600,
      };
      const outputMotorcycleArray = new Motorcycle({
        id: '6348513f34c397abcad040b2',
        model: modelMotorcycle,
        year: 2005,
        color: 'Yellow',
        status: true,
        buyValue: 30.000,
        category: 'Street',
        engineCapacity: 600,
      }).createDomain();
      sinon.stub(Model, 'findById').resolves(outputMotorcycleArray);
      sinon.stub(Model, 'findByIdAndUpdate').resolves(outputMotorcycleArray);
      // Act
      const service = new MotorcycleService(new MotorcycleODM());
      const result = await service.update('6348513f34c397abcad040b2', inputMotorcycle);
      // Assert
      expect(result).to.be.deep.equal(outputMotorcycleArray);
    });
    it('Deveria deleta moto por id com SUCESSO', async function () {
      // Arrange
      const outputMotorcycleArray = new Motorcycle({
        id: '6348513f34c397abcad040b2',
        model: modelMotorcycle,
        year: 2005,
        color: 'Yellow',
        status: true,
        buyValue: 30.000,
        category: 'Street',
        engineCapacity: 600,
      }).createDomain();
      sinon.stub(Model, 'findById').resolves(outputMotorcycleArray);
      sinon.stub(Model, 'findByIdAndDelete').resolves({ n: 1, deletedCount: 1, ok: 1 });
      // Act
      const service = new MotorcycleService(new MotorcycleODM());
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
        const service = new MotorcycleService(new MotorcycleODM());
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
        const service = new MotorcycleService(new MotorcycleODM());
        await service.findById('6348513f34c397abcad040b2');
      } catch (error) {
        // Assert
        expect((error as AppError).message).to.equal(ErrorTypes.motorcyclesNotFound);
      }
    });
    afterEach(function () {
      sinon.restore();
    });
  });
  describe('update', function () {
    const inputMotorcycle = {
      id: '6348513f34c397abcad040b2',
      model: modelMotorcycle,
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    };
    it('update - Lançar excessão com Mongo Id inválido', async function () {
      // Arrange
      sinon.stub(Model, 'findByIdAndUpdate').resolves(null);
      // Act
      try {
        const service = new MotorcycleService(new MotorcycleODM());
        await service.update('Inválido', inputMotorcycle);
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
        const service = new MotorcycleService(new MotorcycleODM());
        await service.update('6348513f34c397abcad040b2', inputMotorcycle);
      } catch (error) {
        // Assert
        expect((error as AppError).message).to.equal(ErrorTypes.motorcyclesNotFound);
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
        const service = new MotorcycleService(new MotorcycleODM());
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
        const service = new MotorcycleService(new MotorcycleODM());
        await service.delete('6348513f34c397abcad040b2');
      } catch (error) {
        // Assert
        expect((error as AppError).message).to.equal(ErrorTypes.motorcyclesNotFound);
      }
    });
    afterEach(function () {
      sinon.restore();
    });
  });
});
