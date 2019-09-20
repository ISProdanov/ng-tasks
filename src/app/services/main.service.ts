import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class MainService {
  apiUrl: string = 'https://aluric.firebaseio.com';

  constructor ( private http: HttpClient ) {}

  getData(controler: string): Observable<any[]> {
    return this.http.get(`${this.apiUrl}/${controler}.json`).pipe(
      catchError(this.handleError)
    ) as Observable<any[]>
  }

  handleError(error: HttpErrorResponse) {
    return throwError(`Error: ${error.error.message}` || `Error Code: ${error.status}\nMessage: ${error.message}`)
  }
}
