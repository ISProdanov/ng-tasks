import {UserInterface} from "../interfaces/user.interface";

export class User implements UserInterface {
  public id: number;
  public firstName: string;
  public lastName: string;
  public position_id: number;
  public department_id: number;

  constructor(data: UserInterface) {
    this.id = data.id;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.position_id = data.id;
    this.department_id = data.id;
  }
}
