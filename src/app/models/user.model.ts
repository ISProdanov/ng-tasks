import {UserInterface} from '../interfaces';

export class UserModel implements UserInterface {
  public id: number;
  public firstName: string;
  public lastName: string;
  public positionId: number;
  public positionName?: string;
  public departmentId: number;
  public departmentName?: string;

  constructor(data: UserInterface) {
    this.id = data.id;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.positionId = data.positionId;
    this.positionName = data.positionName;
    this.departmentId = data.departmentId;
    this.departmentName = data.departmentName;
  }
}
