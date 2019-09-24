import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  apiUrl = 'https://aluric.firebaseio.com';

  constructor( private http: HttpClient ) {}

  getData(path: string): Observable<any[]> {
    return this.http.get(`${this.apiUrl}/${path}.json`).pipe(
      catchError( err => {
        return of(err);
      })
    ) as Observable<any[]>;
  }
}
