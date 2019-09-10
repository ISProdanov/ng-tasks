import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Position } from '../models/position.model';

@Injectable({
  providedIn: "root"
})

export class PositionsService {
  positions: Position[] = [];
  
  apiUrl: string = 'https://aluric.firebaseio.com/positions.json'

  constructor(private http: HttpClient) {}

  getPositions() {
    this.http.get(this.apiUrl)
  }
}
