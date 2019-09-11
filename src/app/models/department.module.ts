import { DepartmentInterface } from '../interfaces';

export class DepartmentModule implements DepartmentInterface {
  public id: number;
  public name: string;

  constructor(data: DepartmentInterface) {
    this.id = data.id;
    this.name = data.name;
  }
}
