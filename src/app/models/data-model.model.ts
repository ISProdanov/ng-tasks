import {DataInterface} from '../interfaces';

export class DataModel {
  public status;
  public data;

  constructor( data: DataInterface) {
    this.status = data.status;
    this.data = data.data;
  }
}
