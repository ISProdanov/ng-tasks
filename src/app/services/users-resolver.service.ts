import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";

import {Observable} from "rxjs";
import {map, switchMap} from "rxjs/operators";

import {DepartmentInterface, PositionInterface, UserInterface} from "../interfaces";
import {UsersService} from "./users.service";
import {PositionsService} from "./positions.service";
import {DepartmentsService} from "./departments.service";


@Injectable({
  providedIn: "root"
})

export class UsersResolver implements Resolve<Array<UserInterface[] | PositionInterface[] | DepartmentInterface[]>> {
  public response: any[] = [];

  constructor(
    private usersService: UsersService,
    private positionsService: PositionsService,
    private departmentsService: DepartmentsService
  ) {
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
    Observable<Array<UserInterface[] | PositionInterface[] | DepartmentInterface []>> {
    return this.positionsService.getPositions().pipe(
      switchMap((positions: PositionInterface[]) => {
        return this.departmentsService.getDepartments().pipe(
          switchMap((departments: DepartmentInterface[]) => {
            return this.usersService.getUsers().pipe(
              map((users: UserInterface[]) => {
                users.map((user: UserInterface) => {

                  const filteredPosition = positions.filter((position: PositionInterface) => {
                    if (user.positionId == position.id) {
                      user.positionName = position.name
                    }
                  });

                  if (filteredPosition.length > 0) {
                    return filteredPosition
                  }

                  const filteredDepartment = departments.filter((department: DepartmentInterface) => {
                    if (user.departmentId == department.id) {
                      user.departmentName = department.name
                    }
                  });

                  if (filteredDepartment.length > 0) {
                    return filteredDepartment
                  }

                  return user
                });

                this.response.push(users, positions, departments);

                return this.response
              })
            )
          })
        )
      })
    )
  }
}
