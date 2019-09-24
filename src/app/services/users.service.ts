import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

import {UserInterface} from '../interfaces';
import {MainService} from './main.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends MainService {

  constructor( http: HttpClient) {
    super(http);
  }

 getUsers(): Observable<UserInterface[]> {
   return super.getData('users');
 }
}
