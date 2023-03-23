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
  
  public createDomain() {
    return {
      id: this.id,
      model: this.model,
      year: this.year,
      color: this.color,
      status: this.status,
      buyValue: this.buyValue,
      category: this._category,
      engineCapacity: this._engineCapacity,
    };
  }
}

export default Motorcycle;
