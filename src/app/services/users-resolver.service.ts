import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';

import {Observable, of, zip} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import {UsersService} from './users.service';
import {PositionsService} from './positions.service';
import {DepartmentsService} from './departments.service';
import {DepartmentInterface, PositionInterface, UserInterface} from '../interfaces';
import {DepartmentModel, PositionModel, UserModel} from '../models';

@Injectable({
  providedIn: 'root'
})

export class UsersResolver implements Resolve<Array<UserModel[] | PositionModel[] | DepartmentModel[]>> {
  constructor(
    private usersService: UsersService,
    private positionsService: PositionsService,
    private departmentsService: DepartmentsService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
    Observable<Array<UserModel[] | PositionModel[] | DepartmentModel[]>>
    | Observable<Array<UserModel[] | PositionModel[] | DepartmentModel[]>>{
    return zip(
      this.usersService.getData('users').pipe(
        map((users: UserInterface[]) => {
            return users.map((user: UserInterface) => new UserModel(user));
          }
        )
      ),
      this.positionsService.getData('positions').pipe(
        map((positions: PositionInterface[]) => {
            return positions.map((position: PositionInterface) => new PositionModel(position));
          }
        )
      ),
      this.departmentsService.getData('departments').pipe(
        map((departments: DepartmentInterface[]) => {
            return departments.map((department: DepartmentInterface) => new DepartmentModel(department));
          }
        )
      )
    ).pipe(
      catchError( err => of(err))
    );
  }
}
