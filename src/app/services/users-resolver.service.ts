import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';

import {Observable} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

import {DepartmentInterface, PositionInterface, UserInterface} from '../interfaces';
import {UsersService} from './users.service';
import {PositionsService} from './positions.service';
import {DepartmentsService} from './departments.service';
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
    Observable<Array<UserModel[] | PositionModel[] | DepartmentModel []>> {
    return this.positionsService.getPositions().pipe(
      switchMap((positions: PositionInterface[]) => {
        return this.departmentsService.getDepartments().pipe(
          switchMap((departments: DepartmentInterface[]) => {
            return this.usersService.getUsers().pipe(
              map((users: UserInterface[]) => {
                const usersModel = users.map((user: UserInterface) => {
                  user.positionName = '';
                  user.departmentName = '';

                  const filteredPosition = positions.filter((position: PositionModel) => {
                    return user.positionId === position.id;
                  });

                  if (filteredPosition.length > 0) {
                    user.positionName = filteredPosition[0].name;
                  }

                  const filteredDepartment = departments.filter((department: DepartmentModel) => {
                    return user.departmentId === department.id;
                  });

                  if (filteredDepartment.length > 0) {
                    user.departmentName = filteredDepartment[0].name;
                  }

                  return new UserModel(user);
                });
                const positionModels = positions.map( (position: PositionInterface) => {
                  return new PositionModel(position);
                });
                const departmentsModels = departments.map( (department: DepartmentInterface) => {
                  return new DepartmentModel(department);
                });

                return [usersModel, positionModels, departmentsModels];
              })
            );
          })
        );
      })
    );
  }
}
