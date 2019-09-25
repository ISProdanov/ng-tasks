import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

import {MainService} from './main.service';
import {DepartmentInterface} from '../interfaces';

@Injectable({
  providedIn: 'root'
})

export class DepartmentsService extends MainService {
  constructor(http: HttpClient) {
    super(http);
  }
  getDepartments(): Observable<DepartmentInterface[]> {
    return super.getData('departments') as Observable<DepartmentInterface[]>;
  }
}
