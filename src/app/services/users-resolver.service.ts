import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";

import {Observable, zip} from "rxjs";
import {map} from "rxjs/operators";

import {UsersService} from "./users.service";
import {PositionsService} from "./positions.service";
import {DepartmentsService} from "./departments.service";
import {DepartmentInterface, PositionInterface, UserInterface} from "../interfaces";


@Injectable({
  providedIn: "root"
})

export class UsersResolver implements Resolve<Array<UserInterface[] | PositionInterface[] | DepartmentInterface[]>> {
  constructor(
    private usersService: UsersService,
    private positionsService: PositionsService,
    private departmentsService: DepartmentsService
  ) {
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
    Observable<Array<UserInterface[] | PositionInterface[] | DepartmentInterface[]>> {
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
    )
  }
}
