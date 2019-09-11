import {UserInterface} from "../interfaces/user.interface";

export class User implements UserInterface {
  public id: number;
  public firstName: string;
  public lastName: string;
  public positionId: number;
  public departmentId: number;

  constructor(data: UserInterface) {
    this.id = data.id;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.positionId = data.positionId;
    this.departmentId = data.departmentId;
  }
}
