import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

import { DepartmentInterface } from '../interfaces';

@Injectable({
  providedIn: 'root'
})

export class DepartmentsService {
  apiUrl = 'https://aluric.firebaseio.com/departments.json';

  constructor(private http: HttpClient) {}

  getDepartments(): Observable<DepartmentInterface[]> {
    return this.http.get(this.apiUrl) as Observable<DepartmentInterface[]>;
  }
}
