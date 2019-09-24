import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';

import {forkJoin, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {UsersService} from './users.service';
import {PositionsService} from './positions.service';
import {DepartmentsService} from './departments.service';
import {DepartmentInterface, PositionInterface, UserInterface} from '../interfaces';
import {DepartmentModel, PositionModel} from '../models';

@Injectable({
  providedIn: 'root'
})

export class UsersResolver implements Resolve<Array<UserInterface[] | PositionInterface[] | DepartmentInterface[]>> {
  constructor(
    private usersService: UsersService,
    private positionsService: PositionsService,
    private departmentsService: DepartmentsService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
    Observable<Array<UserInterface[] | PositionModel[] | DepartmentModel[]>> {
    return forkJoin(
      this.usersService.getUsers(),
      this.positionsService.getPositions().pipe(
        map((positions: PositionInterface[]) => {
          return positions.map((position: PositionInterface) => {
            return new PositionModel(position);
          });
        })
      ),
      this.departmentsService.getDepartments().pipe(
        map((departments: DepartmentInterface[]) => {
          return departments.map((department: DepartmentInterface) => {
            return new PositionModel(department);
          });
        })
      )
    );
  }
}
