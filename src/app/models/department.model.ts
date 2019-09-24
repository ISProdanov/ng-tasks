import {DepartmentInterface} from '../interfaces/department.interface';

export class DepartmentModel implements DepartmentInterface {
  public id: number;
  public name: string;

  constructor(data: DepartmentInterface) {
    this.id = data.id;
    this.name = data.name;
  }
}
