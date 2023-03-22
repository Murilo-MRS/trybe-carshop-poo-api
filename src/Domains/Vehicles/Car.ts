import ICar from '../../Interfaces/ICar';

class Car {
  private car: ICar;

  constructor(car: ICar) {
    this.car = car;
  }

  public getCarModel() {
    return this.car.model;
  }

  public setCarModel(value: string) {
    this.car.model = value;
  }

  public getCarYear() {
    return this.car.year;
  }

  public setCarYear(value: number) {
    this.car.year = value;
  }

  public getCarColor() {
    return this.car.color;
  }

  public setCarColor(value: string) {
    this.car.color = value;
  }

  public getCarStatus() {
    return this.car.status;
  }

  public setCarStatus(value: boolean) {
    this.car.status = value;
  }

  public getCarBuyValue() {
    return this.car.buyValue;
  }

  public setCarBuyValue(value: number) {
    this.car.buyValue = value;
  }
}

export default Car;
