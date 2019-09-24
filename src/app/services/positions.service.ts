import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {MainService} from './main.service';
import {PositionInterface} from '../interfaces';

@Injectable({
  providedIn: 'root'
})

export class PositionsService extends MainService {
  getData(path: string): Observable<PositionInterface[]> {
    return super.getData(path);
  }
}
