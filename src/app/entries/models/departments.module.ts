import { DepartmentsInterface } from '../interfaces/departments.interface';

export class DepartmentsModule implements DepartmentsInterface {
  constructor (
    public id: number,

    public name: string
  ) {}
}
