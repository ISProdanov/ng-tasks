import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class MainService {
  apiUrl = 'https://aluric.firebaseio.com';

  constructor( private http: HttpClient ) {}

  getData(controler: string): Observable<any[]> {
    return this.http.get(`${this.apiUrl}/${controler}.json`).pipe(
      catchError( err => {
        return of(err)
      })
    ) as Observable<any[]>;
  }
}
