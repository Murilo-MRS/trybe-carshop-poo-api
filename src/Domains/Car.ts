import ICar from '../Interfaces/ICar';
import Vehicle from './Vehicle';

class Car extends Vehicle {
  private _doorsQty: number;
  private _seatsQty: number;
  
  constructor({ id, model, year, color, status, buyValue, doorsQty, seatsQty }: ICar) {
    super({ id, model, year, color, status, buyValue });
    this._doorsQty = doorsQty;
    this._seatsQty = seatsQty;
  }
}

export default Car;
