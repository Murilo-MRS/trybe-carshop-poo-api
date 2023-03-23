import ICar from '../Interfaces/ICar';

class Car {
  protected id: string | undefined;
  protected model: string;
  protected year: number;
  protected color: string;
  protected status: boolean | undefined;
  protected buyValue: number;
  private doorsQty: number;
  private seatsQty: number;
  
  constructor({ id, model, year, color, status, buyValue, doorsQty, seatsQty }: ICar) {
    this.id = id;
    this.model = model;
    this.year = year;
    this.color = color;
    this.status = status || false;
    this.buyValue = buyValue;
    this.doorsQty = doorsQty;
    this.seatsQty = seatsQty;
  }

  public setId(id: string) {
    this.id = id;
  }

  public getId() {
    return this.id;
  }

  public getCarModel() {
    return this.model;
  }

  public setCarModel(value: string) {
    this.model = value;
  }

  public getCarYear() {
    return this.year;
  }

  public setCarYear(value: number) {
    this.year = value;
  }

  public getCarColor() {
    return this.color;
  }

  public setCarColor(value: string) {
    this.color = value;
  }

  public getCarStatus() {
    return this.status;
  }

  public setCarStatus(value: boolean) {
    this.status = value;
  }

  public getCarBuyValue() {
    return this.buyValue;
  }

  public setCarBuyValue(value: number) {
    this.buyValue = value;
  }

  public getCarDoorsQty() {
    return this.doorsQty;
  }

  public setCarDoorsQty(value: number) {
    this.doorsQty = value;
  }

  public getCarSeatsQty() {
    return this.seatsQty;
  }

  public setCarSeatsQty(value: number) {
    this.seatsQty = value;
  }
}

export default Car;
