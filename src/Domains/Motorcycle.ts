import IMotorcycle from '../Interfaces/IMotorcycle';
import Vehicle from './Vehicle';

class Motorcycle extends Vehicle {
  private _category: string;
  private _engineCapacity: number;

  constructor({ id, model, year, color, status, buyValue, category, engineCapacity }: IMotorcycle) {
    super({ id, model, year, color, status, buyValue });
    this._category = category;
    this._engineCapacity = engineCapacity;
  }
}

export default Motorcycle;
