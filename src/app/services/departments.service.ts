import { Injectable } from '@angular/core';
import {Observable} from "rxjs";

import {MainService} from "./main.service";
import {DepartmentInterface} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService extends MainService{
  getData(controler: string): Observable<DepartmentInterface[]> {
    return super.getData(controler);
  }

}
