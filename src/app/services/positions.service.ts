import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

import {MainService} from './main.service';
import {PositionInterface} from '../interfaces';

@Injectable({
  providedIn: 'root'
})

export class PositionsService extends MainService {
  constructor(http: HttpClient) {
    super(http);
  }
  getPositions(): Observable<PositionInterface[]> {
    return super.getData('positions');
  }
}
