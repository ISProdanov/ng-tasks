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
  public errorMessage: string;
  constructor(private http: HttpClient) {}

  protected getData(path: string): Observable<DataModel> {
    return this.http.get(`https://aluric.firebaseio.com/${path}.json`).pipe(
      map((responseData: DataInterface) => {
          const {status, ...restData} = responseData;
          responseData.status = 200;
          responseData.data = Object.values(restData);
          return new DataModel(responseData);
        }
      ),
      catchError(this.handleError)
    ) as Observable<DataModel>;
  }

  private handleError(error: HttpErrorResponse) {
    return of((responseData: DataInterface) => {
      responseData.status = error.status;
      responseData.data = null;
      console.log(responseData.status);
      return new DataModel(responseData);
    });
  }
}
