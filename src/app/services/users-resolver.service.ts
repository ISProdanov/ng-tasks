import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';

import {Observable, zip} from 'rxjs';
import {map} from 'rxjs/operators';

import {UsersService} from './users.service';
import {PositionsService} from './positions.service';
import {DepartmentsService} from './departments.service';
import {DepartmentInterface, PositionInterface, UserInterface, DataInterface} from '../interfaces';
import {DataModel, DepartmentModel, PositionModel, UserModel} from '../models';

@Injectable({
  providedIn: 'root'
})

export class UsersResolver implements Resolve<DataModel[]> {
  constructor(
    private usersService: UsersService,
    private positionsService: PositionsService,
    private departmentsService: DepartmentsService,
    private router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
    Observable<DataModel[]> {
    return zip(
      this.usersService.getUsers().pipe(
        map((response: DataInterface) => {
          if (response.status === 200) {
            response.data.map((user: UserInterface) => new UserModel(user));
            return response;
          } else {
            this.router.navigate(['/404']);
          }
        })
      ),
      this.positionsService.getPositions().pipe(
        map((response: DataInterface) => {
          if (response.status === 200) {
            response.data.map((position: PositionInterface) => new PositionModel(position));
            return response;
          } else {
            this.router.navigate(['/404']);
          }
        })
      ),
      this.departmentsService.getDepartments().pipe(
        map((response: DataInterface) => {
          if (response.status === 200) {
            response.data.map((department: DepartmentInterface) => new DepartmentModel(department));
            return response;
          } else {
            this.router.navigate(['/404']);
          }
        })
      )
    );
  }
}
