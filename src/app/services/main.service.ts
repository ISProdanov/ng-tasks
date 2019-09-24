import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  constructor( private http: HttpClient ) {}

  protected getData(path: string): Observable<any[]> {
    return this.http.get(`https://aluric.firebaseio.com/${path}.json`).pipe(
      catchError( err => {
        return of(err);
      })
    ) as Observable<any[]>;
  }
}
