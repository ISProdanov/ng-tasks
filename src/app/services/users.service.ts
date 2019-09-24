import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {UserInterface} from '../interfaces';
import {MainService} from './main.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends MainService {

 getData(path: string): Observable<UserInterface[]> {
   return super.getData(path);
 }
}
