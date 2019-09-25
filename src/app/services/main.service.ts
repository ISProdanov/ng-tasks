import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  constructor( private http: HttpClient ) {}

  protected getData(path: string): Observable<any[]> {
    return this.http.get(`https://aluric.firebaseio.com/${path}.json`) as Observable<any[]>;
  }

}
