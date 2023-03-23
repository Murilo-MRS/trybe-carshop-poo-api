import IMotorcycle from '../Interfaces/IMotorcycle';

class Motorcycle {
  private Motorcycle: IMotorcycle;

  constructor(motorcycle: IMotorcycle) {
    this.Motorcycle = motorcycle;
  }

  public getMotorcycle() {
    return this.Motorcycle;
  }

  public setMotorcycle(value: IMotorcycle) {
    this.Motorcycle = value;
  }
}

export default Motorcycle;