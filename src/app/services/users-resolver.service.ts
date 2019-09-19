import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";

import {zip} from "rxjs";
import {map} from "rxjs/operators";

import {DepartmentInterface, PositionInterface, UserInterface} from "../interfaces";
import {UsersService} from "./users.service";
import {PositionsService} from "./positions.service";
import {DepartmentsService} from "./departments.service";


@Injectable({
  providedIn: "root"
})

export class UsersResolver implements Resolve<any> {
  constructor(
    private usersService: UsersService,
    private positionsService: PositionsService,
    private departmentsService: DepartmentsService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
    any {
    return zip(
      this.usersService.getUsers().pipe(
        map((users: UserInterface[]) => users.map((user: UserInterface) => user))
      ),
      this.positionsService.getPositions().pipe(
        map((positions: PositionInterface[]) => positions.map((position: PositionInterface) => position))
      ),
      this.departmentsService.getDepartments().pipe(
        map((departments: DepartmentInterface[]) => departments.map((department: DepartmentInterface) => {
          return department
        }))
      )
    ).pipe(
      map((response: Array<UserInterface[] | PositionInterface [] | DepartmentInterface[]>) => {
          response[0].map((user: UserInterface) => {
              const filteredPosition = response[1].filter((position: PositionInterface) => {
                if (user.positionId == position.id) {
                  user.positionName = position.name
                }
              });

              if (filteredPosition.length > 0) {
                return filteredPosition
              }

              const filteredDepartment = response[2].filter((department: DepartmentInterface) => {
                if (user.departmentId == department.id) {
                  user.departmentName = department.name
                }
              });

              if (filteredDepartment.length > 0) {
                return filteredPosition
              }

              return response[0];
            }
          )
        }
      )
    )
  }
}
