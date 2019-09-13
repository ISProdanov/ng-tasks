import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";

import {Observable} from "rxjs";

import {UserInterface} from "../interfaces";
import {UsersService} from "./users.service";

@Injectable({
  providedIn: "root"
})

export class UsersResolver implements Resolve<UserInterface[]>{
  constructor(private usersService: UsersService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserInterface[]> | Promise<UserInterface[]> | UserInterface[] {
    return this.usersService.getUsers()
  }
}
