import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from '../models/user.model';

@Injectable({
  providedIn: "root"
})
export class UserService {
  users: User[] = []

  apiUrl: string = 'https://aluric.firebaseio.com/users.json'

  constructor (
    private http: HttpClient
  ) {}

  getUsers() {
    return this.http.get(this.apiUrl)
  }
}
