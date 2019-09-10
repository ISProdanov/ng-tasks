import { UserInterface } from "../interfaces/user.interface";
import { PositionEnum } from "src/app/shared/enums/positions.enum";

export class User implements UserInterface {
  constructor(
    public id: number,

    public firstName: string,

    public lastName: string,

    public position_id: number,

    public position_name: string,

    public department_id: number
  ) {
    switch (position_id) {
      case 1:
        position_name = PositionEnum.Position1;
        break;

      case 2:
        position_name = PositionEnum.Position2;
        break;

      default:
        break;
    }
  }
}
