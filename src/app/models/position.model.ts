import {PositionInterface} from '../interfaces';

export class PositionModel implements PositionInterface {
  public id: number;
  public name: string;

  constructor(data: PositionInterface) {
    this.id = data.id;
    this.name = data.name;
  }
}
