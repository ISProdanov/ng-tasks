import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import {DataInterface} from '../interfaces';
import {DataModel} from '../models';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  constructor(private http: HttpClient) {
  }

  protected getData(path: string): Observable<DataModel> {
    return this.http.get(`https://alaric.firebaseio.com/${path}.json`).pipe(
      map((responseData: DataInterface) => {
          return new DataModel({
            status: 200,
            data: responseData
          });
        }
      ),
      catchError(this.handleError)
    ) as Observable<DataModel>;
  }

  private handleError(error: HttpErrorResponse) {
    const model = new DataModel({
      status: error.status,
      data: error.statusText
    });

    return of(model);
  }
}
