import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {Observable} from 'rxjs';
import {UserInterface} from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  apiUrl = 'https://aluric.firebaseio.com/users.json';

  constructor(
    private http: HttpClient
  ) {}

  getUsers(): Observable<UserInterface[]> {
    return this.http.get(this.apiUrl) as Observable<UserInterface[]>;
  }
}
