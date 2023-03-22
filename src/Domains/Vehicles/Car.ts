import ICar from '../../Interfaces/ICar';

class Car {
  private car: ICar;

  constructor(car: ICar) {
    this.car = car;
  }

  public getCar() {
    return this.car;
  }

  public setCar(value: ICar) {
    this.car = value;
  }
}

export default Car;
