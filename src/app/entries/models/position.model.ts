import { PositionsInterface } from '../interfaces/positions.interface';

export class Position implements PositionsInterface {
  constructor (
    public id: number,

    public name: string
  ) {}
}
