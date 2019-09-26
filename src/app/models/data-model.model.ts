import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DataInterface} from "../interfaces/data.interface";



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})

export class DataModel implements DataInterface {
  public status;
  public data;

  constructor( data: DataInterface) {
    this.status = data.status;
    this.data = data.data;
  }
}
