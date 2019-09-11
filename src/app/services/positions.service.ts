import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import {Observable} from "rxjs";

import {PositionInterface} from "../interfaces";

@Injectable({
  providedIn: "root"
})

export class PositionsService {

  apiUrl: string = 'https://aluric.firebaseio.com/positions.json'

  constructor(private http: HttpClient) {}

  getPositions(): Observable<PositionInterface> {
   return this.http.get(this.apiUrl) as Observable<PositionInterface>
  }
}
